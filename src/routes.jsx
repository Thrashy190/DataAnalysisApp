import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilDescription,
  cilSpeedometer,
  cilFolderOpen,
  cilBook,
  cilUserFollow,
  cilChart,
  cilPlus,
  cilBookmark,
} from "@coreui/icons";
import { CNavItem, CNavTitle } from "@coreui/react";

const _adminNav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard/start",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Informacion",
  },
  {
    component: CNavItem,
    name: "Tesis",
    to: "/dashboard/start",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Proyectos de residencia",
    to: "/dashboard/start",
    icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Agregar contenido",
    to: "/dashboard/start",
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Extras",
  },
  {
    component: CNavItem,
    name: "Agregar usuarios",
    to: "/dashboard/addUsers",
    icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
  },
];

export default _adminNav;
