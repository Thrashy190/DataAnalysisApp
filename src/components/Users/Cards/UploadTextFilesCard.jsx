import { CCard, CCardBody, CCardHeader, CCardTitle } from "@coreui/react";
import React, { useState } from "react";

import Notification from "../../../helpers/Notifications.jsx";
import { documentDir } from "@tauri-apps/api/path";
import {
  writeBinaryFile,
  BaseDirectory,
  createDir,
  exists,
} from "@tauri-apps/api/fs";

const UploadTextFilesCard = ({ identifier }) => {
  const [selectedTextFiles, setSelectedTextFiles] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleFiles = async (event) => {
    setSelectedTextFiles(event.target.files);
  };

  const readFiles = async () => {
    const documentDirPath = await documentDir();

    await createDir(
      `${documentDirPath}cinvestav\\cadetes\\${identifier}\\text`,
      {
        dir: BaseDirectory.Document,
        recursive: true,
      }
    );

    for (let i = 0; i < selectedTextFiles.length; i++) {
      const textFileReader = new FileReader();
      const file = selectedTextFiles[i];

      textFileReader.onload = async (e) => {
        await writeBinaryFile(
          `${documentDirPath}cinvestav\\cadetes\\${identifier}\\text\\${file.name}`,
          new Uint8Array(e.target.result),
          {
            dir: BaseDirectory.Document,
          }
        )
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

      textFileReader.readAsArrayBuffer(file);
    }
    setSelectedTextFiles([]);
  };

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <CCardTitle className="pt-2">Subir archivos de texto</CCardTitle>
      </CCardHeader>
      <CCardBody className="flex flex-col">
        <div>
          <button
            className="px-4 py-2 mb-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            onClick={readFiles}
          >
            Subir archivos
          </button>
        </div>
        <div className="flex flex-col">
          <div className="mb-2 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <label htmlFor="dropzone-file">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Haz click para subir</span>
                </p>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Archivos en total:
                  <span className="pl-1 font-semibold">
                    {selectedTextFiles.length}
                  </span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Archivos permitidos: .txt
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFiles}
                multiple
                accept=".txt"
              />
            </label>
          </div>
        </div>
      </CCardBody>
      <Notification notify={notify} setNotify={setNotify} position={"top"} />
    </CCard>
  );
};

export default UploadTextFilesCard;
