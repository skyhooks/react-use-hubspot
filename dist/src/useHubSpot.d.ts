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
    readonly region: string;
}
interface IuseHubSpot {
    element: any;
    formRef: React.Ref<HTMLInputElement>;
}
declare const useHubSpot: (formOptions: IHubSpotOptions) => IuseHubSpot;
export default useHubSpot;
