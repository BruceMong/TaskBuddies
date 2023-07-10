import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";

function Navbar() {
	return (
		<nav className="navbarContainer">
			<div className="navbarLogo">
				<img src="/img/Logo.svg" className="logoNav" />
			</div>
			<div className="navbarLinks">
				<Link to="/dashboard">Dashboard</Link>
				<Link to="/login">Login</Link>
			</div>
		</nav>
	);
}

export default Navbar;
