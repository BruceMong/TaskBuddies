import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon as FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCalendarDay,
	faArrowRightFromBracket,
	faUserGear,
	faTableColumns,
} from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, taskSliceActions } from "../store/dashboard/task";

import "../styles/Navbar.scss";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const selectedDateStr = useSelector((state) => state.task.selectedDate);
	const selectedDate = new Date(selectedDateStr);

	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch, selectedDateStr]);

	const handleDateChange = (newDate) => {
		dispatch(taskSliceActions.setSelectedDate(newDate.toISOString()));
		dispatch(fetchTasks());
	};

	const logout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	// Format de la date personnalisé
	const customFormatDate = (date) => {
		let diff = moment(date)
			.startOf("day")
			.diff(moment().startOf("day"), "days");
		let formattedDate = "";

		switch (diff) {
			case 0:
				formattedDate = `Aujourd'hui, ${moment(date).format("ddd D MMM")}`;
				break;
			case -1:
				formattedDate = `Hier, ${moment(date).format("ddd D MMM")}`;
				break;
			case 1:
				formattedDate = `Demain, ${moment(date).format("ddd D MMM")}`;
				break;
			default:
				formattedDate = moment(date).format("ddd D MMM");
		}

		return formattedDate;
	};

	let formattedDate = customFormatDate(selectedDate);

	return (
		<nav className="navbarContainer">
			<div className="navbarLogo">
				<img src="/img/Logo.svg" className="logoNav" />
			</div>
			<div className="navbarDate">
				<p onClick={() => document.getElementById("datePicker").focus()}>
					{formattedDate}
				</p>
				<DatePicker
					id="datePicker"
					selected={selectedDate}
					onChange={(date) => handleDateChange(date)}
					customInput={
						<FontAwesomeIcon className="calendarIcon" icon={faCalendarDay} />
					}
				/>
			</div>
			<div className="navbarLinks">
				<Link
					to="/dashboard"
					className={
						location.pathname === "/dashboard" ? "linkIcon active" : "linkIcon"
					}
				>
					<FontAwesomeIcon icon={faTableColumns} />
				</Link>
				<Link
					to="/profil"
					className={
						location.pathname === "/profil" ? "linkIcon active" : "linkIcon"
					}
				>
					<FontAwesomeIcon icon={faUserGear} />
				</Link>
				<button onClick={logout} className="logoutBtn">
					<FontAwesomeIcon icon={faArrowRightFromBracket} />
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
