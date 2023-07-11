import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tagIcons } from "../../utils/tagData";

const TagTile = ({ tag }) => {
	console.log(tag);
	return (
		<div className="tagTile" style={{ color: tag.color }}>
			<div className="tagIcon">
				<FontAwesomeIcon
					icon={tagIcons[tag.icon]}
					style={{ color: tag.color }}
				/>
			</div>
			<div className="tagTitle">
				<p>{tag.title}</p>
			</div>
		</div>
	);
};

export default TagTile;
