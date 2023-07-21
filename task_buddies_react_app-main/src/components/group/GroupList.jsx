import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchMemberGroups,
	fetchCreatedGroups,
} from "../../store/dashboard/group";

const GroupList = () => {
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
			</div>
			<div className="bodyContainer">
				{memberGroups.length > 0 && (
					<>
						<h2>Groupes auxquels j'appartiens</h2>
						{memberGroups.map((group) => (
							<div key={group.id}>{group.name}</div>
						))}
					</>
				)}
				{createdGroups.length > 0 && (
					<>
						<h2>Groupes que j'ai créés</h2>
						{createdGroups.map((group) => (
							<div key={group.id}>{group.name}</div>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default GroupList;
