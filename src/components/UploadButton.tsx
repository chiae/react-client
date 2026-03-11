interface UploadButtonProps {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const UploadButton = ({onUpload }:UploadButtonProps) => {
  return (
    <input type="file" className="form-control mb-3" onChange={onUpload} />
  );
};

export default UploadButton;
