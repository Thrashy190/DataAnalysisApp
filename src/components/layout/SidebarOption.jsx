import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthProvider.jsx";

export const AppSidebarNav = ({ items }) => {
  const location = useLocation();
  const { currentUser, logOut } = useAuth();

  const navLink = (name, icon) => {
    return (
      <>
        {icon && icon}
        {name && name}
      </>
    );
  };

  const navItem = (item, index) => {
    const { component, name, icon, ...rest } = item;
    const Component = component;

    if (name === "Cerrar sesión") {
      return (
        <Component
          onClick={() => {
            logOut();
          }}
          {...(rest.to &&
            !rest.items && {
              component: NavLink,
            })}
          key={index}
          {...rest}
        >
          {navLink(name, icon)}
        </Component>
      );
    }

    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon)}
      </Component>
    );
  };

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) =>
          item.roles.includes(currentUser.role) ? navItem(item, index) : null
        )}
    </React.Fragment>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
