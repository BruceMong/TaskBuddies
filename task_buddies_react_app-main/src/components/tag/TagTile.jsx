import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tagIcons } from "../../utils/tagData";

const TagTile = ({ tag, onTagClick, isActive }) => {
	return (
		<div
			className={`tagTileContainer ${isActive ? "active" : ""}`}
			style={{
				color: tag.color,
				border: `1px solid ${tag.color}`,
			}}
			onClick={() => onTagClick(tag.id)}
		>
			<div className="tagIcon">
				<FontAwesomeIcon
					icon={tagIcons[tag.icon]}
					style={{ color: tag.color, height: "12px" }}
				/>
			</div>
			<div className="tagTitle">
				<p>{tag.title}</p>
			</div>
		</div>
	);
};

export default TagTile;
