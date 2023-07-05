import React, { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        readonly hbspt?: any;
        readonly hubSpot?: any;
    }

}

interface IHubSpotOptions {
    readonly portalId: string;
    readonly formId: string;
    readonly region: string;
}

interface IuseHubSpot {
    element: any
    formRef: React.Ref<HTMLInputElement>
}

const useHubSpot = (formOptions: IHubSpotOptions): IuseHubSpot => {

    const [options, setOptions] = useState<IHubSpotOptions>(formOptions)
    const [loaded, setLoaded] = useState<boolean>(false)

    const formRef: React.Ref<HTMLElement> = useRef(null)

    const createForm = () => {
        if (!window.hbspt) return

        if (!formRef.current) return;

        window.hbspt.forms.create({
            target: `#reactHubSpotForm-${options.formId}`,
            ...options
        });
    }

    const findForm = () => {
        if (loaded) return;
        if (!formRef.current) return

        const _form = formRef.current.querySelector('iframe')

        if (_form) {
            setLoaded(true)
        }

        if (!_form) setTimeout(findForm, 1)

    }

    const loadScript = () => {
        if (window.hbspt) {
            createForm();
            findForm();
            return;
        }

        const script = document.createElement('script')
        script.defer = true
        script.async = true
        script.onload = () => {
            createForm()
            findForm()
        }
        script.src = 'https://js.hsforms.net/forms/embed/v2.js'

        document.head.appendChild(script)
    }

    useEffect(() => {
        loadScript()
    }, [])

    const element = () => {
        return React.createElement('div', {
            ref: formRef,
            id: `reactHubSpotForm-${options.formId}`,
        })
    }

    return {
        element,
        formRef
    }
}

export default useHubSpot;