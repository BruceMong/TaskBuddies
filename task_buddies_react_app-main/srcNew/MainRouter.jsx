import React from "react";
import {
	Route,
	Routes,
	Navigate,
	Router,
	useLocation,
	useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

const MainRouter = () => {
	const token = localStorage.getItem("token");
	const navigate = useNavigate();
	const location = useLocation();

	// Vérifier si le token est présent et si l'utilisateur est sur une page non autorisée
	if (token && (location.pathname === "*" || location.pathname === "/login")) {
		navigate("/dashboard"); // Rediriger vers le tableau de bord
	}

	return (
		<Routes>
			<div className="app-container">
				<Router>
					<Route path="/login" element={<LoginPage />} />
					{token ? (
						<Route path="/*" element={<DashboardPage />} />
					) : (
						<Route path="*" element={<Navigate to="/login" />} />
					)}
				</Router>
			</div>
		</Routes>
	);
};

export default MainRouter;
