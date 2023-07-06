import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from 'react';
export default function useHubSpot(formOptions) {
    const [options, setOptions] = useState(formOptions);
    const [loaded, setLoaded] = useState(false);
    const formRef = useRef(null);
    const createForm = () => {
        if (!window.hbspt)
            return;
        if (!formRef.current)
            return;
        window.hbspt.forms.create(Object.assign(Object.assign({}, options), { target: (options === null || options === void 0 ? void 0 : options.target) || `#reactHubSpotForm-${options.formId}`, onFormReady: ($form) => {
                options.onFormReady && options.onFormReady($form);
                setLoaded(true);
            } }));
    };
    const loadScript = () => {
        if (window.hbspt) {
            createForm();
            return;
        }
        const script = document.createElement('script');
        script.defer = true;
        script.async = true;
        script.onload = () => {
            createForm();
        };
        script.src = 'https://js.hsforms.net/forms/embed/v2.js';
        document.head.appendChild(script);
    };
    useEffect(() => {
        loadScript();
    }, []);
    const element = (props) => {
        return useMemo(() => (_jsxs(_Fragment, { children: [_jsx("div", { ref: formRef, id: (options === null || options === void 0 ? void 0 : options.target) || `reactHubSpotForm-${options.formId}`, className: props === null || props === void 0 ? void 0 : props.wrapperClass, style: {
                        display: loaded ? 'block' : 'none'
                    } }), !loaded &&
                    _jsxs("div", { children: [(props === null || props === void 0 ? void 0 : props.loader) && props.loader, !(props === null || props === void 0 ? void 0 : props.loader) && _jsx("h1", { children: "Loading..." })] })] })), [loaded, options]);
    };
    return useMemo(() => {
        return {
            element,
            formRef,
            loaded,
        };
    }, [loaded, element, formRef]);
}
