// TagFormUpdate.jsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTagsByUser } from "../../store/dashboard/tag";
import { tagService } from "../../services/tagService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tagColors, tagIcons } from "../../utils/tagData";

const TagFormUpdate = ({ currentTag }) => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState(currentTag.title);
	const [color, setColor] = useState(currentTag.color);
	const [icon, setIcon] = useState(currentTag.icon);

	useEffect(() => {
		setTitle(currentTag.title);
		setColor(currentTag.color);
		setIcon(currentTag.icon);
	}, [currentTag]);

	console.log("currentTag", currentTag);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await tagService.updateTag(currentTag.id, title, icon, color);
			dispatch(fetchTagsByUser());
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="title">Titre</label>
			<input
				type="text"
				id="title"
				value={title}
				onChange={(event) => setTitle(event.target.value)}
			/>
			<label htmlFor="icon">Icône</label>
			<div className="iconContainer">
				{Object.keys(tagIcons).map((key) => (
					<button
						type="button"
						className={`tagIcon ${icon === key ? "active" : ""}`}
						key={key}
						onClick={() => setIcon(key)}
					>
						<FontAwesomeIcon icon={tagIcons[key]} style={{ color: color }} />
					</button>
				))}
			</div>
			<label htmlFor="color">Couleur</label>
			<div className="colorContainer">
				{tagColors.map((colorOption) => (
					<button
						type="button"
						className={`tagColor ${
							color === colorOption.color ? "active" : ""
						}`}
						key={colorOption.name}
						onClick={() => setColor(colorOption.color)}
						style={{ backgroundColor: colorOption.color }}
					></button>
				))}
			</div>
			<button type="submit">Mettre à jour</button>
		</form>
	);
};

export default TagFormUpdate;
