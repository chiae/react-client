import { jsx as _jsx } from "react/jsx-runtime";
const UploadButton = ({ onUpload }) => {
    return (_jsx("input", { type: "file", className: "form-control mb-3", onChange: onUpload }));
};
export default UploadButton;
