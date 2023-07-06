"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useHubSpot(formOptions, props) {
    if (props === void 0) { props = {}; }
    var _a = (0, react_1.useState)(formOptions), options = _a[0], setOptions = _a[1];
    var _b = (0, react_1.useState)(false), loaded = _b[0], setLoaded = _b[1];
    // const [key,setKey] = useState
    var formRef = (0, react_1.useRef)(null);
    var createForm = function () {
        if (!window.hbspt)
            return;
        if (!formRef.current)
            return;
        window.hbspt.forms.create(__assign({ target: "#reactHubSpotForm-".concat(options.formId) }, options));
    };
    var findForm = function () {
        var _a;
        if (loaded)
            return;
        var _form = (_a = formRef === null || formRef === void 0 ? void 0 : formRef.current) === null || _a === void 0 ? void 0 : _a.querySelector('iframe');
        if (_form) {
            _form.addEventListener('load', function () {
                setLoaded(true);
            });
        }
        if (!_form || !loaded)
            setTimeout(findForm, 1);
    };
    var loadScript = function () {
        if (window.hbspt) {
            createForm();
            findForm();
            return;
        }
        var script = document.createElement('script');
        script.defer = true;
        script.async = true;
        script.onload = function () {
            createForm();
            findForm();
        };
        script.src = 'https://js.hsforms.net/forms/embed/v2.js';
        document.head.appendChild(script);
    };
    (0, react_1.useEffect)(function () {
        loadScript();
    }, []);
    var element = function () {
        var loading = function () {
            if (!loaded) {
                return react_1.default.createElement('h1', {
                    key: 'loading',
                    children: "Loading...",
                    style: {
                        color: "red",
                        display: loaded ? "none" : "block"
                    }
                });
            }
            return null;
        };
        return react_1.default.createElement('div', {
            className: props === null || props === void 0 ? void 0 : props.wrapperClass,
            children: [
                react_1.default.createElement('div', {
                    ref: formRef,
                    key: 'form',
                    id: "reactHubSpotForm-".concat(options.formId),
                    style: {
                        display: loaded ? 'block' : 'none'
                    }
                }),
                loading()
            ]
        });
    };
    return (0, react_1.useMemo)(function () {
        return {
            element: element,
            formRef: formRef,
            loaded: loaded,
        };
    }, [loaded, element, formRef]);
}
exports.default = useHubSpot;
