import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/axios-api";
import QAPanel from "@/components/QAPanel";

interface DocumentInfo {
  id: string;
  fileName: string;
  uploadedAt?: string;
  description?: string;
  pageCount?: number;
}

export default function DocumentDetailPage() {
  const { id } = useParams();
  const [doc, setDoc] = useState<DocumentInfo | null>(null);

  // Load the document metadata
  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/documents/${id}`);
        setDoc(res.data);
      } catch (err) {
        console.error("Failed to load document", err);
      }
    }
    load();
  }, [id]);

  if (!doc) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      {/* Back link */}
      <Link to="/documents" className="btn btn-sm btn-ghost">
        ← Back to Documents
      </Link>

      {/* Document Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">{doc.fileName}</h1>
        {doc.uploadedAt && (
          <p className="opacity-60 text-sm">
            Uploaded: {new Date(doc.uploadedAt).toLocaleString()}
          </p>
        )}
        {doc.description && (
          <p className="opacity-80 text-base mt-2">{doc.description}</p>
        )}
      </div>

      <QAPanel documentId={id!} />
    </div>
  );
}
