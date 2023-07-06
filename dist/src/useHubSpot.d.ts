import React from 'react';
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
    readonly element: any;
    readonly formRef: React.Ref<HTMLElement>;
    readonly loaded: boolean;
}
export default function useHubSpot(formOptions: IHubSpotOptions): IuseHubSpot;
export {};
