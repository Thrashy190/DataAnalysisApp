import { CCard, CCardBody, CCardHeader, CCardTitle } from "@coreui/react";
import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Notification from "../../../helpers/Notifications.jsx";

const UploadMediaFilesCard = ({ identifier }) => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const allowedFileTypes = [".mp4", ".jpeg", ".jpg", ".png", ".mp3"];

    const validFiles = Array.from(files).filter((file) =>
      allowedFileTypes.includes(file.name.toLowerCase().slice(-4))
    );

    setSelectedFiles(validFiles);
    console.log(validFiles);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const removeFile = (fileToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove)
    );
  };

  const handleFile = (event) => {
    const files = event.target.files;
    const allowedFileTypes = [".mp4", ".jpeg", ".jpg", ".png", ".mp3"];

    const validFiles = Array.from(files).filter((file) =>
      allowedFileTypes.includes(file.name.toLowerCase().slice(-4))
    );

    setSelectedFiles(validFiles);
  };

  const readFile = async () => {
    for (const file of selectedFiles) {
      const fileReader = new FileReader();

      fileReader.onload = async (e) => {
        await invoke("handle_dat_file", {
          process: name,
          identifier: identifier,
          data: [...new Uint8Array(e.target.result)],
        })
          .then(() => {
            setNotify({
              isOpen: true,
              message: `Archivo ${file.name} cargado con éxito para el cadete ${identifier}.`,
              type: "success",
            });
          })
          .catch((err) => {
            setNotify({
              isOpen: true,
              message: err,
              type: "error",
            });
          });
      };

      fileReader.readAsArrayBuffer(file);
    }

    setSelectedFiles([]);
  };

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <CCardTitle className="pt-2">Subir archivos multimedia</CCardTitle>
      </CCardHeader>
      <CCardBody className="grid grid-cols-3 gap-4">
        <div className="flex items-center justify-center w-full col-span-2">
          <div
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            {selectedFiles.length > 0 ? (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {selectedFiles.map((file, index) => (
                  <div key={index}>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      Archivo seleccionado:
                      <span className="pl-1 font-semibold">{file.name}</span>
                    </p>
                    <button
                      onClick={() => removeFile(file)}
                      className="text-sm text-red-500  font-bold"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
                <div className="flex items-center justify-center mt-6">
                  <button
                    className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-700 rounded-md dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 focus:outline-none focus:bg-gray-600 dark:focus:bg-gray-500"
                    type="button"
                    onClick={readFile}
                  >
                    Subir
                  </button>
                </div>
              </div>
            ) : (
              <label htmlFor="dropzone-file">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Haz click para subir</span>{" "}
                    o arrastra y suelta archivos
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Archivos permitidos: .mp4, .jpeg, .jpg, .png, .mp3
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFile}
                  multiple
                  accept=".mp4, .jpeg, .jpg, .png, .mp3"
                />
              </label>
            )}
          </div>
        </div>
      </CCardBody>
      <Notification notify={notify} setNotify={setNotify} position={"top"} />
    </CCard>
  );
};

export default UploadMediaFilesCard;
