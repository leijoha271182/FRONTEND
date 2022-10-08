import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
  <div className="container-fluid">
    <a className="navbar-brand"  href="/">Inventarios</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link"   aria-current="page" href="/">Activos</a>
        </li>
        <li className="nav-item">
          <a className="nav-link"   aria-current="page" href="/usuarios">Usuarios</a>
        </li>
        <li className="nav-item">
          <a className="nav-link"  aria-current="page" href="/marcas">Marcas</a>
        </li>
        <li className="nav-item">
          <a className="nav-link"   aria-current="page" href="/estados">Estados</a>
        </li>
        <li className="nav-item">
          <a className="nav-link"   aria-current="page" href="/tipos">Tipos</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}
