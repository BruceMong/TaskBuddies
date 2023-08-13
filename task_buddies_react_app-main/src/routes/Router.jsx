import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilPage from "../pages/ProfilPage";
import GroupPage from "../pages/GroupPage";

const Routers = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/login" />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/dashboard" element={<DashboardPage />} />
			<Route path="/profil" element={<ProfilPage />} />
			<Route path="/group/:id" element={<GroupPage />} />
		</Routes>
	);
};

export default Routers;
