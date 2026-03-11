import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import api from "@/api/axios-api";
export default function QAPanel({ documentId, onAsk, }) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const handleAsk = async () => {
        if (!question.trim())
            return;
        try {
            setLoading(true);
            const res = await api.post("/ask", {
                documentId, // may be null
                question,
            });
            setAnswer(res.data.answer || "No answer returned.");
            onAsk?.(question);
        }
        catch (err) {
            console.error("Ask failed", err);
            setAnswer("Error asking question.");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold m-0", children: "Ask a Question" }), _jsxs("div", { className: "join w-full mt-2", children: [_jsx("input", { type: "text", placeholder: "Ask anything\u2026", className: "input input-bordered join-item w-full", value: question, onChange: (e) => setQuestion(e.target.value), disabled: loading }), _jsx("button", { type: "button", className: "btn btn-primary join-item", onClick: handleAsk, disabled: !question.trim() || loading, children: loading ? (_jsx("span", { className: "loading loading-spinner loading-sm" })) : ("Ask") })] })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold m-0", children: "Answer" }), _jsx("div", { className: "border border-base-300 rounded-lg bg-base-100 w-full min-h-40 max-h-96 mt-2 p-4 overflow-y-auto", children: _jsx(ReactMarkdown, { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeRaw], className: "prose max-w-none", children: answer || "No answer yet." }) })] })] }));
}
