import { useState } from "react";
import "../../styles/Dashboard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGolfBall, faGamepad } from "@fortawesome/free-solid-svg-icons";

import { tagService } from "../../services/tagService";

const TagForm = () => {
	const [title, setTitle] = useState("");
	const [icon, setIcon] = useState("");
	const [color, setColor] = useState("#F1F1F4");

	const tagIcons = [
		{
			name: "golf",
			icon: faGolfBall,
		},
		{
			name: "gamepad",
			icon: faGamepad,
		},
	];

	const tagColors = [
		{
			name: "red",
			color: "#EB546F",
		},
		{
			name: "orange",
			color: "#E15E42",
		},
		{
			name: "yellow",
			color: "#FFC700",
		},
		{
			name: "greenLight",
			color: "#82D25D",
		},
		{
			name: "green",
			color: "#15AD70",
		},
		{
			name: "blueLight",
			color: "#68D0CA",
		},
		{
			name: "blue",
			color: "#73BDE7",
		},
		{
			name: "blueDark",
			color: "#7193ED",
		},
		{
			name: "purple",
			color: "#BF9FF1",
		},
		{
			name: "pink",
			color: "#F9C3D6",
		},
	];

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			await tagService.addTag(title, icon, color);
		} catch (error) {
			console.error("Failed to add tag:", error);
		}
	};

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Ajouter un tag 🏷️</p>
			</div>
			<form className="bodyContainer" onSubmit={handleFormSubmit}>
				<div className="inputContainer">
					<label htmlFor="title">Nom du tag</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						placeholder="Titre du tag"
						required
					/>
				</div>
				<div className="inputContainer">
					<label htmlFor="icon">Icone du tag</label>
					<div className="iconContainer">
						{tagIcons.map((icon) => (
							<button
								type="button"
								className="tagIcon"
								key={icon.name}
								onClick={() => setIcon(icon.name)}
							>
								<FontAwesomeIcon icon={icon.icon} style={{ color: color }} />
							</button>
						))}
					</div>
				</div>
				<div className="inputContainer">
					<label htmlFor="color">Couleur du tag</label>
					<div className="colorContainer">
						{tagColors.map((color) => (
							<button
								type="button"
								className="tagColor"
								key={color.name}
								onClick={() => setColor(color.color)}
								style={{ backgroundColor: color.color }}
							></button>
						))}
					</div>
				</div>
				<div className="inputContainer">
					<button type="submit">Ajouter</button>
				</div>
			</form>
		</div>
	);
};

export default TagForm;
