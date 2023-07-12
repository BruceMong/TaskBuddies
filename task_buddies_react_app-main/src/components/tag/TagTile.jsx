import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tagIcons } from "../../utils/tagData";

const TagTile = ({ tag }) => {
	console.log(tag);
	return (
		<div
			className="tagTileContainer"
			style={{
				color: tag.color,
				border: `1px solid ${tag.color}`,
			}}
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
