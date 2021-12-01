import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="cotainer-fluid">
                <a href="" className="navbar-brand">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="navbar-item">
                            <Link to="/home" className="nav-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                        <Link to="/tambah" className="nav-link">Tambah</Link>
                        </li>
                        <li className="navbar-item">
                            <a href="#" className="nav-link active">Ubah</a>
                        </li>
                        <li className="navbar-item">
                            <a href="#" className="nav-link active">Daftar</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav
