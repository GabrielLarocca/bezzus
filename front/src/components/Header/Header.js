import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../services/auth";
import "./style.css";
import logo from "../../img/logobezzus.png";

export default function Header() {
  const links = [
    { href: "/news", label: "NEWS" },
    { href: "/shopping", label: "SHOP" },
  ];

  const [usuario, setusuario] = useState("");

  // function firtName(name) {
  //   return name.match(/(\S+) /).toUpperCase() || [];
  // }

  const fetchData = async () => {
    const response = await api.get("/v1/usuario/me");

    setusuario(response?.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light " id="header">
        <Link className="navbar-brand ml-5" to="/login">
          <img alt="logo" src={logo} width="100" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mr-5">
            {links.map(({ href, label }) => {
              return (
                <NavLink className="menu-item mr-4" key={label} to={href}>
                  <span>{label}</span>
                </NavLink>
              );
            })}
            {!usuario && (
              <NavLink className="menu-item mr-4" key={"login"} to={"/login"}>
                <span>ENTER</span>
              </NavLink>
            )}
            {usuario && (
              <>
                <NavLink
                  className="menu-item mr-4"
                  key={usuario._id}
                  to={"/config"}
                >
                  <span>{usuario.nome.toUpperCase()}</span>
                </NavLink>
                <a className="menu-item" href="/login" onClick={logout}>
                  <span>EXIT</span>
                </a>
              </>
            )}
          </ul>
        </div>
      </nav>
      <hr className="navbarhr d-none d-lg-block" />
    </div>
  );
}
