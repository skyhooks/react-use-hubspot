import React, { ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from 'react';

declare global {
    interface Window {
        readonly hbspt?: any;
        readonly hubSpot?: any;
    }

}

interface IHubSpotOptions {
    readonly portalId: string;
    readonly formId: string;
    readonly region?: string;
    readonly target?: string;
    readonly redirectUrl?: string;
    readonly inlineMessage?: string;
    readonly pageId?: string | number;
    readonly cssRequired?: string;
    readonly cssClass?: string;
    readonly css?: string;
    readonly submitText?: string;
    readonly submitButtonClass?: string;
    readonly errorClass?: string;
    readonly errorMessageClass?: string;
    readonly locale?: string;
    readonly translations?: Object;
    readonly manuallyBlockedEmailDomain?: Array<string>;
    readonly formInstanceId?: string;
    readonly sfdcCampaignId?: string;
    readonly goToWebinarWebinarKey?: string;
    readonly onBeforeFormInit?: (ctx: any) => void;
    readonly onFormReady?: ($form: any) => void;
    readonly onFormSubmit?: ($form: any) => void;
    readonly onBeforeFormSubmit?: ($form: any, submissionValues: any) => void;
    readonly onFormSubmitted?: ($form: HTMLFormElement, data: any) => void;
}

interface IuseHubSpot {
    readonly element: any
    readonly formRef: React.Ref<HTMLElement>,
    readonly loaded: boolean
}

interface IElementProps {
    readonly wrapperClass?: string
    readonly loader?: ReactElement<any>
    readonly onReady?: ($form: HTMLFormElement) => void
}

export default function useHubSpot(formOptions: IHubSpotOptions): IuseHubSpot {

    const [options, setOptions] = useState<IHubSpotOptions>(formOptions)
    const [loaded, setLoaded] = useState<boolean>(false)

    const formRef: React.Ref<HTMLDivElement> = useRef(null)

    const createForm = () => {
        if (!window.hbspt) return

        if (!formRef.current) return;

        window.hbspt.forms.create({
            ...options,
            target: options?.target || `#reactHubSpotForm-${options.formId}`,
            onFormReady: ($form: HTMLFormElement) => {
                options.onFormReady && options.onFormReady($form)
                setLoaded(true)
            },
        });
    }

    const loadScript = () => {
        if (window.hbspt) {
            createForm();
            return;
        }

        const script = document.createElement('script')
        script.defer = true
        script.async = true
        script.onload = () => {
            createForm()
        }
        script.src = 'https://js.hsforms.net/forms/embed/v2.js'

        document.head.appendChild(script)
    }

    useEffect(() => {
        loadScript()
    }, [])

    const element = (props: IElementProps) => {

        return useMemo(() => (
            <>
                <div
                    ref={formRef}
                    id={options?.target || `reactHubSpotForm-${options.formId}`}
                    className={props?.wrapperClass}
                    style={{
                        display: loaded ? 'block' : 'none'
                    }}
                />

                {!loaded &&
                    <div>
                        {props?.loader && props.loader}
                        {!props?.loader && <h1>Loading...</h1>}
                    </div>
                }
            </>
        ), [loaded, options])

    }

    return useMemo(() => {
        return {
            element,
            formRef,
            loaded,
        }
    }, [loaded, element, formRef])
}
