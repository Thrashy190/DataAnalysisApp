import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CContainer,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { documentDir } from "@tauri-apps/api/path";
import { BaseDirectory, readDir } from "@tauri-apps/api/fs";
import ShowMediaModal from "../../Admin/Modals/ShowMediaModal.jsx";

const CadetImageVideoCard = ({ identifier }) => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [data, setData] = useState({ name: "", path: "" });

  useEffect(() => {
    fetchMediaFiles().then(() => {});
  }, []);

  const fetchMediaFiles = async () => {
    const documentDirPath = await documentDir();

    setMediaFiles(
      await readDir(`${documentDirPath}cinvestav\\cadetes\\${identifier}`, {
        dir: BaseDirectory.Document,
        recursive: true,
      })
    );
  };

  return (
    <CContainer>
      <div>
        <CCard className="mt-4">
          <CCardHeader>
            <CCardTitle className="pt-2">Lista de archivos</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CTable striped responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Nombre del archivo</CTableHeaderCell>
                  <CTableHeaderCell>Tipo</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {mediaFiles.map((mediaFile, index) => (
                  <CTableRow key={index}>
                    <td>{mediaFile.name}</td>
                    <td>
                      {mediaFile.name.includes(".mp4") ? "Video" : "Imagen"}
                    </td>
                    <td>
                      <CButton
                        color="primary"
                        variant="outline"
                        onClick={() => {
                          setVisibleCreate(true);
                          setData(mediaFile);
                        }}
                      >
                        Ver contenido
                      </CButton>
                    </td>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </div>
      <ShowMediaModal
        visibleCreate={visibleCreate}
        setVisibleCreate={setVisibleCreate}
        data={data}
      />
    </CContainer>
  );
};

export default CadetImageVideoCard;
