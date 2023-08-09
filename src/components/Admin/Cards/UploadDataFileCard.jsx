import { CCard, CCardBody, CCardHeader, CCardTitle } from "@coreui/react";
import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Notification from "../../../helpers/Notifications.jsx";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const UploadDataFileCard = ({ identifier, processData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [date, setDate] = useState();
  const [name, setName] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleChange = (newValue) => {
    setSelectedDate(newValue);
    setDate(newValue.unix());
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const onDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.name.endsWith(".dat")) {
      setSelectedFile(file);
      console.log(file);
    } else {
      console.log(
        "Tipo de archivo no válido. Solo se permite un archivo .dat."
      );
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const handleFile = (event) => {
    setSelectedFile(event.target);
  };

  const readFile = async () => {
    const file = selectedFile.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      console.log(e);
      await invoke("handle_dat_file", {
        date: date,
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
          setSelectedFile(null);
        })
        .catch((err) => {
          setNotify({
            isOpen: true,
            message: err,
            type: "error",
          });
          setSelectedFile(null);
        });
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <CCardTitle className="pt-2">Subir archivo</CCardTitle>
      </CCardHeader>
      <CCardBody className="grid grid-cols-3 gap-4">
        <div className="flex items-center justify-center w-full col-span-2">
          <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            {selectedFile ? (
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
                  Archivo seleccionado:
                  <span className="pl-1 font-semibold">
                    {selectedFile.files[0].name}
                  </span>
                </p>
                <button
                  onClick={removeFile}
                  className="text-sm text-red-500  font-bold"
                >
                  Eliminar
                </button>
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
              <label
                htmlFor="dropzone-file"
                onDrop={onDrop}
                onDragOver={onDragOver}
              >
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
                    <span className="font-semibold">Haz click para subir</span>{" "}
                    o arrastra y suelta un archivo
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Maximo un archivo DAT
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFile(e)}
                  accept=".dat"
                />
              </label>
            )}
          </div>
        </div>

        <div>
          <div className="pb-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Proceso</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={name}
                label="Proceso"
                onChange={handleInputChange}
              >
                {processData.map((data, index) => {
                  return (
                    <MenuItem key={index} value={data.title}>
                      {data.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div>
            <DateTimePicker
              width="100%"
              label="Fecha y hora de la prueba"
              value={selectedDate}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </div>
      </CCardBody>
      <Notification notify={notify} setNotify={setNotify} position={"top"} />
    </CCard>
  );
};

export default UploadDataFileCard;
