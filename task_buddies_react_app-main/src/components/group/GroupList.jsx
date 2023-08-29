import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchMemberGroups,
	fetchCreatedGroups,
} from "../../store/dashboard/group";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPeopleGroup,
	faPersonCirclePlus,
	faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const GroupList = ({ handleCreateClick, handleJoinClick, handleListClick }) => {
	const dispatch = useDispatch();
	const { memberGroups, createdGroups, status, error } = useSelector(
		(state) => state.group
	);

	useEffect(() => {
		dispatch(fetchMemberGroups());
		dispatch(fetchCreatedGroups());
	}, [dispatch]);

	if (status === "loading") {
		return <div>Chargement...</div>;
	}

	if (status === "failed") {
		return <div>Erreur : {error.message}</div>;
	}

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Groupes 💡</p>
				<div className="groupIcons">
					<button className="headerBtn" onClick={handleListClick}>
						<FontAwesomeIcon icon={faPeopleGroup} />
					</button>
					<button className="headerBtn" onClick={handleJoinClick}>
						<FontAwesomeIcon icon={faPersonCirclePlus} />
					</button>
					<button className="headerBtn" onClick={handleCreateClick}>
						<FontAwesomeIcon icon={faPenToSquare} />
					</button>
				</div>
			</div>
			<div className="bodyContainer">
				{memberGroups.length > 0 && (
					<>
						<h2>Groupes auxquels j'appartiens</h2>
						{memberGroups.map((group) => (
							<div key={group.id}>
								<Link to={`/group/${group.id}`}>{group.name}</Link>
							</div>
						))}
					</>
				)}
				{createdGroups.length > 0 && (
					<>
						<h2>Groupes que j'ai créés</h2>
						{createdGroups.map((group) => (
							<div key={group.id}>
								<Link to={`/group/${group.id}`}>{group.name}</Link>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default GroupList;
