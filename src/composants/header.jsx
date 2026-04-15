import { NavLink } from "react-router-dom"
import logo from "../assets/logo.png"
import "../styles/Header.css"

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="SportSee" />
            </div>

            <nav className="nav">
                <NavLink to="/" className="navLink">
                    Accueil
                </NavLink>
                <NavLink to="/user/12" className="navLink">
                    Profil
                </NavLink>
                <NavLink to="/settings" className="navLink">
                    Réglage
                </NavLink>
                <NavLink to="/community" className="navLink">
                    Communauté
                </NavLink>
            </nav>
        </header>
    )
}

export default Header
