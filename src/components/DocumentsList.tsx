import { Link } from "react-router-dom";

interface DocumentInfo {
  id: string;
  fileName: string;
}

interface DocumentsListProps {
  documents: DocumentInfo[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function DocumentsList({
  documents,
  selectedId,
  onSelect,
  onDelete,
}: DocumentsListProps) {
  return (
    <ul className="space-y-1">
      {documents.map((doc) => {
        const isActive = selectedId === doc.id;

        return (
          <li
            key={doc.id}
            onClick={() => {
              if (selectedId === doc.id) {
                onSelect(null); // deselect
              } else {
                onSelect(doc.id); // select
              }
            }}
            className={[
              "flex items-center justify-between gap-2 cursor-pointer rounded-md px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-primary text-primary-content"
                : "hover:bg-base-200",
            ].join(" ")}
          >
            {/* LEFT: filename */}
            <span className="flex-1 truncate">{doc.fileName}</span>

            {/* RIGHT: action icons */}
            <div className="flex items-center gap-1">
              {/* Navigate */}
              <Link
                to={`/documents/${doc.id}`}
                onClick={(e) => e.stopPropagation()}
                className="btn btn-ghost btn-xs"
                title="Open document"
              >
                ➜
              </Link>

              {/* Delete */}
              <button
                className="btn btn-ghost btn-xs text-error"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(doc.id);
                }}
                title="Delete document"
              >
                ✕
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
