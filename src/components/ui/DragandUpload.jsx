import { useRef, useState } from "react";
import { UploadCloud, Eye, X, Download } from "lucide-react";
import { RiPencilFill } from "react-icons/ri";

const ExcelUpload = () => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (selectedFile) => {
    const isExcel =
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      selectedFile.type === "application/vnd.ms-excel";

    const isImage = selectedFile.type.startsWith("image/");

    if (!isExcel && !isImage) {
      alert("Please upload a valid Excel or Image file");
      return;
    }

    setFile(selectedFile);

    if (isImage) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl("");
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl("");
    setOpenModal(false);
    inputRef.current.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <>
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
          className={`relative w-full max-w-xl cursor-pointer rounded-lg border-2 border-dashed text-center transition
            ${
              dragActive
                ? "border-purple-500 bg-purple-50"
                : "border-gray-300 dark:border-gray-400 bg-white dark:bg-gray-900"
            }
${previewUrl ? "p-0 min-h-[160px]  overflow-hidden" : "p-10  min-h-[160px]"}
          `}
        >
          {/* Upload Content */}
          {!previewUrl && (
            <>
              <p className="mb-3 text-[0.8rem] text-gray-600 dark:text-gray-200">
                Drag & drop Excel file here or
              </p>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-[#8629DF] px-5 py-2 text-xs font-medium text-white hover:bg-purple-700"
              >
                <UploadCloud className="h-4 w-4" />
                Upload File
              </button>
            </>
          )}

    {/* Image Preview Overlay */}
{previewUrl && (
  <div className="absolute inset-0 group">
    
    <img
      src={previewUrl}
      alt="preview"
      className="h-full w-full object-cover"
    />

    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenModal(true);
        }}
        className="rounded-full bg-white/30 p-2 shadow hover:bg-gray-200/50"
      >
        <Eye className="h-5 w-5 text-white hover:text-black cursor-pointer" />
      </button>
    </div>

    <div className="absolute bottom-2 right-2 flex gap-2">
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current.click();
        }}
        className="rounded-full bg-white/80 p-1 shadow hover:bg-white"
      >
        <RiPencilFill className="h-4 w-4 text-black" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          removeFile();
        }}
        className="rounded-full bg-white/80 p-1 shadow hover:bg-white"
      >
        <X className="h-4 w-4 text-black" />
      </button>

    </div>

  </div>
)}


          <input
            ref={inputRef}
            type="file"
            accept=".xls,.xlsx,image/*"
            className="hidden"
            onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
          />
        </div>

        {file && !previewUrl && (
          <p className="text-xs text-gray-500">
            Selected file: <span className="font-medium">{file.name}</span>
          </p>
        )}
      </div>

      {/* Image View Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-[90%] max-w-xl rounded-xl bg-white p-4 shadow-lg">
            <div className="mb-4 flex items-center justify-between ">
              <h1 className="text-xl font-semibold text-gray-700">
                View Image
              </h1>
              <div className="flex items-center gap-4">
                <a href={previewUrl} download>
                  <Download className="h-4 w-4 cursor-pointer text-black hover:text-gray-700" />
                </a>

                <button onClick={() => setOpenModal(false)}>
                  <X className="h-5 w-5 text-black cursor-pointer hover:scale-110 hover:text-gray-700" />
                </button>
              </div>
            </div>
            <div className="w-full border-t border-gray-300 my-4"></div>

            <div className="flex justify-center">
              <img
                src={previewUrl}
                alt="preview"
                className="max-h-[320px] w-full rounded-lg object-contain shadow"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExcelUpload;
