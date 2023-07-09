import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
	const token = localStorage.getItem("token");

	return (
		<Router>
			<div className="app-container">
				<Routes>
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
				</Routes>
			</div>
		</Router>
	);
}

export default App;
