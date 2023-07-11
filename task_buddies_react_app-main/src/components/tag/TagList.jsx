import { useEffect, useState } from "react";
import { tagService } from "../../services/tagService";
import TagTile from "./TagTile";

const TagList = () => {
	const [tags, setTags] = useState([]);

	useEffect(() => {
		tagService.fetchTagsByUser().then((response) => {
			console.log(response);
			if (response) setTags(response);
		});
	}, []);

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Tags</p>
			</div>
			<div className="bodyContainer">
				{tags.map((tag) => (
					<TagTile key={tag.id} tag={tag} />
				))}
			</div>
		</div>
	);
};

export default TagList;
