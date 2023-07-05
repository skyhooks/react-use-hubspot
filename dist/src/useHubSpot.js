"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const useHubSpot = (formOptions) => {
    const [options, setOptions] = (0, react_1.useState)(formOptions);
    const formRef = (0, react_1.useRef)(null);
    const createForm = () => {
        console.log('createForm called');
        if (!window.hbspt)
            return;
        if (!formRef.current)
            return;
        window.hbspt.forms.create(options);
    };
    const findForm = () => {
    };
    const loadScript = () => {
        if (window.hbspt) {
            createForm();
            findForm();
            return;
        }
        const script = document.createElement('script');
        script.defer = true;
        script.onload = () => {
            console.log("onLoad");
            createForm();
            findForm();
        };
        script.src = 'https://js.hsforms.net/forms/embed/v2.js';
    };
    (0, react_1.useEffect)(() => {
        console.log("loadScript called");
        loadScript();
    }, []);
    const element = () => {
        return react_1.default.createElement('div', {
            ref: formRef,
            id: `reactHubSpotForm-${options.formId}`,
        });
    };
    return {
        element,
        formRef
    };
};
exports.default = useHubSpot;
