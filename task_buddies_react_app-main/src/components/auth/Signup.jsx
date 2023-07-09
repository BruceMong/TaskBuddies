// src/components/auth/Signup.js
import React, { useState } from "react";
import { authService } from "../../services/authService";

const Signup = ({ toggleShowSignup }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [isSigned, setIsSigned] = useState(false); // Ajout de l'état pour suivre l'état de connexion

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await authService.signup({ email, password, username });
			// Redirect to login or show success message
			setIsSigned(true); // Met à jour l'état de connexion après une connexion réussie

		} catch (error) {
			console.error("Error during signup:", error);
		}
	};

	// Si l'utilisateur est connecté, redirige vers le tableau de bord
	if (isSigned) {
		toggleShowSignup()
	}


	return (
		<div className="authContainer">
			<h2 className="authTitle">
				Hello 👋, <br /> nouveau sur TaskBuddies ?
			</h2>
			<form className="authForm" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Nom d'utilisateur"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="email"
					placeholder="Adresse email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Mot de passe"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<div className="authBtnContainer">
					<button onClick={toggleShowSignup} className="secondaryBtn">
						Déjà un compte ? Connectez-vous
					</button>
					<button type="submit">S'inscrire</button>
				</div>
			</form>
		</div>
	);
};

export default Signup;
