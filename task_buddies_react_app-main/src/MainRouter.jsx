import React from "react";
import { Route, Routes, Navigate, Router } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

const MainRouter = () => {
	const token = localStorage.getItem("token");

	return (
		<Routes>
			<div className="app-container">
				<Router>
					{!token ? (
						<>
							<Route path="/login" element={<LoginPage />} />
							<Route path="*" element={<Navigate to="/login" />} />
						</>
					) : (
						<>
							<Route path="/dashboard" element={<DashboardPage />} />
							<Route path="*" element={<Navigate to="/dashboard" />} />
						</>
					)}
				</Router>
			</div>
		</Routes>
	);
};

export default MainRouter;
