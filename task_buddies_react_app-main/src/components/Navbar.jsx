import React from "react";
import { Link, useNavigate  } from "react-router-dom";
import "../styles/Navbar.scss";

function Navbar() {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('token');
		navigate('/login');
	};

	return (
		<nav className="navbarContainer">
			<div className="navbarLogo">
				<img src="/img/Logo.svg" className="logoNav" />
			</div>
			<div className="navbarLinks">
				<Link to="/dashboard">Dashboard</Link>
				<Link to="/login">Login</Link>
				<button onClick={logout} className="logoutBtn">
					<img src="/img/image.png" alt="Déconnexion" />
				</button>
			</div>
		</nav>
	);
}

export default Navbar;