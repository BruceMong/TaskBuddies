import React, { useEffect, useState } from "react";
import { tagColors } from "../../utils/tagData";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { fetchCountTaskUsersByGroupAndUserOnDateRange } from "../../store/dashboard/taskUser";

const UserRankingList = ({ users, groupId }) => {
	const [timeframe, setTimeframe] = useState("week");
	const dispatch = useDispatch();
	const countTaskUsersByUser = useSelector(
		(state) => state.taskUser.countTaskUsersByUser
	);

	const endDate = new Date();
	const startDate = new Date();
	if (timeframe === "week") {
		startDate.setDate(endDate.getDate() - 7);
	} else if (timeframe === "month") {
		startDate.setDate(endDate.getDate() - 30);
	}

	useEffect(() => {
		users.forEach((user) => {
			dispatch(
				fetchCountTaskUsersByGroupAndUserOnDateRange({
					groupId,
					userId: user.id,
					startDate,
					endDate,
				})
			);
		});
	}, [dispatch, users, groupId, startDate, endDate, timeframe]);

	const sortedUsers = [...users].sort((a, b) => {
		const countA = countTaskUsersByUser[a.id] || 0;
		const countB = countTaskUsersByUser[b.id] || 0;
		return countB - countA;
	});

	return (
		<div
			className="componentContainer"
			style={{ width: "100%", height: "100%" }}
		>
			<div className="componentHeader">
				<p>Classement des utilisateurs :</p>
				<select
					onChange={(e) => setTimeframe(e.target.value)}
					value={timeframe}
				>
					<option value="week">7 derniers jours</option>
					<option value="month">30 derniers jours</option>
				</select>
			</div>

			<div className="bodyContainer">
				{sortedUsers.map((user, index) => {
					let colorStyle = {};
					if (index === 0) {
						colorStyle = { color: "#f5c042", borderColor: "#f5c042" };
					} else if (index === 1) {
						colorStyle = { color: "#bcceff", borderColor: "#bcceff" };
					} else if (index === 2) {
						colorStyle = { color: "#f5a742", borderColor: "#f5a742" };
					}

					return (
						<div key={user.id} className="tileContainer" style={colorStyle}>
							<p>
								{index + 1}. {user.username} :{" "}
								{countTaskUsersByUser[user.id] || 0} tâches
							</p>
							{index === 0 && <FontAwesomeIcon icon={faMedal} />}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default UserRankingList;
