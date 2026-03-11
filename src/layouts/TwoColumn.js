import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function TwoColumn({ left, right }) {
    return (_jsxs("div", { className: "flex gap-6 items-start p-4", children: [_jsx("aside", { className: "w-80 shrink-0", children: _jsx("div", { className: "flex flex-col gap-4", children: left }) }), _jsx("section", { className: "flex-1", children: _jsx("div", { className: "flex flex-col gap-4", children: right }) })] }));
}
