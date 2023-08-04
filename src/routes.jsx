import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilHome,
  cilFolderOpen,
  cilPeople,
  cilSettings,
  cilPlus,
  cilClipboard,
  cilUser,
} from "@coreui/icons";
import { CNavItem, CNavTitle } from "@coreui/react";

const _adminNav = [
  {
    component: CNavTitle,
    name: "Analisis",
    roles: ["Admin", "Lector", "Analista", "Supervisor", "Operador"],
  },
  {
    component: CNavItem,
    name: "Cadetes",
    to: "/dashboard/cadets",
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    roles: ["Admin", "Lector", "Analista", "Supervisor", "Operador"],
  },
  {
    component: CNavItem,
    name: "Procesar datos",
    to: "/dashboard/processData",
    icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
    roles: ["Admin", "Supervisor", "Operador"],
  },
  {
    component: CNavItem,
    name: "Agregar Cadete",
    to: "/dashboard/addCadet",
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
    roles: ["Admin", "Supervisor", "Operador"],
  },
  {
    component: CNavTitle,
    name: "Administración",
    roles: ["Admin", "Lector", "Analista", "Supervisor", "Operador"],
  },
  {
    component: CNavItem,
    name: "Administrar usuarios",
    to: "/dashboard/manageUsers",
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    roles: ["Admin"],
  },
  {
    component: CNavItem,
    name: "Perfil",
    to: "/dashboard/profile",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    roles: ["Admin", "Lector", "Analista", "Supervisor", "Operador"],
  },
  {
    component: CNavItem,
    name: "Ajustes",
    to: "/dashboard/settings",
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    roles: ["Admin"],
  },
];

export default _adminNav;
