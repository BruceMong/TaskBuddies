import { useState } from "react";
import "../../styles/Dashboard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tagColors, tagIcons } from "../../utils/tagData";

import { tagService } from "../../services/tagService";


import { useSelector, useDispatch } from "react-redux";
import { fetchTagsByUser } from "../../store/dashboard/tag"; 

const TagForm = () => {
  const dispatch = useDispatch();

	const [title, setTitle] = useState("");
	const [icon, setIcon] = useState("");
	const [color, setColor] = useState("#F1F1F4");



	const initForm =  () => {
		setTitle("")
		setIcon("");
		setColor("#F1F1F4");
	}

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			console.log("test color", color);
			await tagService.addTag(title, icon, color);
			initForm();
    		dispatch(fetchTagsByUser());

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
						{Object.keys(tagIcons).map((key) => (
							<button
								type="button"
								className="tagIcon"
								key={key}
								onClick={() => setIcon(key)}
							>
								<FontAwesomeIcon
									icon={tagIcons[key]}
									style={{ color: color }}
								/>
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
