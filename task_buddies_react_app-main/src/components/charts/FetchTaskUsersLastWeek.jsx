import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskUsersDateRange } from "../../store/dashboard/taskUser";

const FetchTaskUsersLastWeek = () => {
	const dispatch = useDispatch();
	const taskUsersLastWeek = useSelector(
		(state) => state.taskUser.taskUsersDateRange
	);

	useEffect(() => {
		const endDate = new Date();
		const startDate = new Date();
		startDate.setDate(endDate.getDate() - 7); // Définir la date de début à 7 jours avant la date de fin

		dispatch(fetchTaskUsersDateRange({ startDate, endDate }));
	}, [dispatch]);

	// Convertir l'objet en tableau
	const taskUsersArray = Object.values(taskUsersLastWeek);
	console.log(taskUsersArray);

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Liste des TaskUsers des 7 derniers jours</p>
			</div>
			<div className="bodyContainer">
				<ul>
					{taskUsersArray.map((taskUser, index) => (
						<li key={index}>
							{/* Affichez les informations que vous voulez ici */}
							{taskUser.title}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default FetchTaskUsersLastWeek;
