// src/components/auth/Login.js
import React, { useState } from "react";
import { authService } from "../../services/authService";

const Login = ({ toggleShowSignup }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await authService.login({ email, password });
			localStorage.setItem("token", response.jwtToken);
		} catch (error) {
			console.error("An error occurred while logging in:", error);
		}
	};

	return (
		<div className="authContainer">
			<h2 className="authTitle">
				Hello 👋, <br /> déjà un compte ?
			</h2>
			<form className="authForm" onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="Adresse email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				<input
					type="password"
					placeholder="Mot de passe"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>

				<div className="authBtnContainer">
					<button onClick={toggleShowSignup} className="secondaryBtn">
						Pas encore de compte ? S'inscrire
					</button>
					<button type="submit">Se connecter</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
