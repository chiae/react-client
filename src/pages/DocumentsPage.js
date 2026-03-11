import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import api from "@/api/axios-api";
import { TwoColumn } from "@/layouts/TwoColumn";
import QAPanel from "@/components/QAPanel";
import DocumentSidebar from "@/components/DocumentSidebar";
import { useNavigate } from "react-router-dom";
export default function DocumentsPage() {
    const [documents, setDocuments] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();
    // Load documents
    const loadDocuments = async () => {
        try {
            const res = await api.get("/documents");
            setDocuments(res.data);
        }
        catch (err) {
            console.error("Failed to load documents", err);
        }
    };
    useEffect(() => {
        loadDocuments();
    }, []);
    // Upload file
    const handleFileUpload = async (e) => {
        if (!e.target.files?.length)
            return;
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        try {
            const res = await api.post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            // Refresh list from backend
            await loadDocuments();
            const newId = res.data.documentId;
            navigate(`/documents/${newId}`);
        }
        catch (err) {
            console.error("Upload failed", err);
        }
    };
    // Delete file
    const handleFileDelete = async (id) => {
        try {
            await api.delete(`/documents/${id}`);
            // Refresh list from backend
            await loadDocuments();
            if (selectedId === id) {
                setSelectedId(null);
            }
        }
        catch (err) {
            console.error("Delete failed", err);
        }
    };
    return (_jsx(TwoColumn, { left: _jsx(DocumentSidebar, { documents: documents, selectedId: selectedId, onSelect: setSelectedId, onUpload: handleFileUpload, onDelete: handleFileDelete }), right: _jsx(QAPanel, { documentId: selectedId }) }));
}
