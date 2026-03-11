import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DocumentsList from "@/components/DocumentsList";
export default function DocumentSidebar({ documents, selectedId, onSelect, onUpload, onDelete, }) {
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-xl font-semibold m-0", children: "Documents" }), _jsx("div", { className: "m-0 p-0", children: _jsx("input", { type: "file", onChange: onUpload, className: "file-input file-input-bordered w-full !m-0 h-10 px-3" }) }), _jsx(DocumentsList, { documents: documents, selectedId: selectedId, onSelect: onSelect, onDelete: onDelete })] }));
}
