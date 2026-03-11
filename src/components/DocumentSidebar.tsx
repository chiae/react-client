import DocumentsList from "@/components/DocumentsList";

interface DocumentInfo {
  id: string;
  fileName: string;
}

interface DocumentSidebarProps {
  documents: DocumentInfo[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (id: string) => void;
  isUploading: boolean;
}

export default function DocumentSidebar({
  documents,
  selectedId,
  onSelect,
  onUpload,
  onDelete,
  isUploading,
}: DocumentSidebarProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold m-0">Documents</h2>

      {/* Upload with spinner */}
      <div className="m-0 p-0 relative">
        <label className="file-input file-input-bordered w-full !m-0 h-10 px-3 flex items-center justify-between cursor-pointer">
          <span className="truncate">
            {isUploading ? "Uploading…" : "Choose file to upload"}
          </span>

          {isUploading && (
            <span className="loading loading-spinner loading-sm mr-2"></span>
          )}

          <input
            type="file"
            onChange={onUpload}
            disabled={isUploading}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>
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
