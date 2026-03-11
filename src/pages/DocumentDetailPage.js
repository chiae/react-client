import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/axios-api";
import QAPanel from "@/components/QAPanel";
export default function DocumentDetailPage() {
    const { id } = useParams();
    const [doc, setDoc] = useState(null);
    // Load the document metadata
    useEffect(() => {
        async function load() {
            try {
                const res = await api.get(`/documents/${id}`);
                setDoc(res.data);
            }
            catch (err) {
                console.error("Failed to load document", err);
            }
        }
        load();
    }, [id]);
    if (!doc) {
        return _jsx("div", { className: "p-6", children: "Loading..." });
    }
    return (_jsxs("div", { className: "p-6 space-y-8 max-w-5xl mx-auto", children: [_jsx(Link, { to: "/documents", className: "btn btn-sm btn-ghost", children: "\u2190 Back to Documents" }), _jsxs("div", { className: "space-y-1", children: [_jsx("h1", { className: "text-3xl font-bold", children: doc.fileName }), doc.uploadedAt && (_jsxs("p", { className: "opacity-60 text-sm", children: ["Uploaded: ", new Date(doc.uploadedAt).toLocaleString()] })), doc.description && (_jsx("p", { className: "opacity-80 text-base mt-2", children: doc.description }))] }), _jsx(QAPanel, { documentId: id })] }));
}
