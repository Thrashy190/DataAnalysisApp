import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilHome,
  cilFolderOpen,
  cilPeople,
  cilUserFollow,
  cilPlus,
  cilClipboard,
} from "@coreui/icons";
import { CNavItem, CNavTitle } from "@coreui/react";

const _adminNav = [
  {
    component: CNavItem,
    name: "Inicio",
    to: "/dashboard/start",
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    role: "all",
  },
  {
    component: CNavTitle,
    name: "Analisis",
  },
  {
    component: CNavItem,
    name: "Cadetes",
    to: "/dashboard/cadets",
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    role: "all",
  },
  {
    component: CNavItem,
    name: "Procesar datos",
    to: "/dashboard/processData",
    icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
    role: "all",
  },
  {
    component: CNavItem,
    name: "Agregar Cadete",
    to: "/dashboard/addCadet",
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
    role: "all",
  },
  {
    component: CNavTitle,
    name: "Administración",
    role: "all",
  },
  {
    component: CNavItem,
    name: "Administrar usuarios",
    to: "/dashboard/manageUsers",
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    role: "admin",
  },
  // {
  //   component: CNavItem,
  //   name: "Administrar campos",
  //   to: "/dashboard/manageInputs",
  //   icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  //   role: "admin",
  // },
];

export default _adminNav;
