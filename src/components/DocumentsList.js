import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
export default function DocumentsList({ documents, selectedId, onSelect, onDelete, }) {
    return (_jsx("ul", { className: "space-y-1", children: documents.map((doc) => {
            const isActive = selectedId === doc.id;
            return (_jsxs("li", { onClick: () => {
                    if (selectedId === doc.id) {
                        onSelect(null); // deselect
                    }
                    else {
                        onSelect(doc.id); // select
                    }
                }, className: [
                    "flex items-center justify-between gap-2 cursor-pointer rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                        ? "bg-primary text-primary-content"
                        : "hover:bg-base-200",
                ].join(" "), children: [_jsx("span", { className: "flex-1 truncate", children: doc.fileName }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Link, { to: `/documents/${doc.id}`, onClick: (e) => e.stopPropagation(), className: "btn btn-ghost btn-xs", title: "Open document", children: "\u279C" }), _jsx("button", { className: "btn btn-ghost btn-xs text-error", onClick: (e) => {
                                    e.stopPropagation();
                                    onDelete(doc.id);
                                }, title: "Delete document", children: "\u2715" })] })] }, doc.id));
        }) }));
}
