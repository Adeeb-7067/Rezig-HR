import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

const ExcelUpload = () => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (selectedFile) => {
    if (
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      selectedFile.type === "application/vnd.ms-excel"
    ) {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid Excel file (.xls or .xlsx)");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Upload Box */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
        className={`w-full max-w-xl cursor-pointer rounded-lg border-2 border-dashed p-10 text-center transition
          ${
            dragActive
              ? "border-purple-500 bg-purple-50"
              : "border-gray-300 bg-white"
          }`}
      >
        <p className="text-sm text-gray-600 mb-3">
          Drag & drop Excel file here or
        </p>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-[#8629DF] px-5 py-2 text-xs font-medium text-white hover:bg-purple-700"
        >
          <UploadCloud className="h-4 w-4" />
          Upload File
        </button>

        <input
          ref={inputRef}
          type="file"
          accept=".xls,.xlsx"
          className="hidden"
          onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
        />

        {file && (
          <p className="mt-3 text-xs text-gray-500">
            Selected file: <span className="font-medium">{file.name}</span>
          </p>
        )}
      </div>

     
    </div>
  );
};

export default ExcelUpload;
