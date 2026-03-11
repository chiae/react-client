import DocumentsList from "@/components/DocumentsList";

interface DocumentInfo {
  id: string;
  fileName: string;
}

interface DocumentSidebarProps {
  documents: DocumentInfo[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (id: string) => void;
}

export default function DocumentSidebar({
  documents,
  selectedId,
  onSelect,
  onUpload,
  onDelete,
}: DocumentSidebarProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold m-0">Documents</h2>

      <div className="m-0 p-0">
        <input
          type="file"
          onChange={onUpload}
          className="file-input file-input-bordered w-full !m-0 h-10 px-3"
        />
      </div>
      <DocumentsList
        documents={documents}
        selectedId={selectedId}
        onSelect={onSelect}
        onDelete={onDelete}
      />
    </div>
  );
}
