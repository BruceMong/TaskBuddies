import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { taskService } from "../../services/taskService";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../../store/dashboard/task";

const TaskFormUpdate = ({ currentTask }) => {
	const token = localStorage.getItem("token");

	const dispatch = useDispatch();

	const [title, setTitle] = useState(currentTask.title);
	const [recurrenceType, setRecurrenceType] = useState(
		currentTask.recurrenceType
	);
	const [selectedWeekDays, setSelectedWeekDays] = useState(
		currentTask.selectedWeekDays
	);
	const [selectedDayOfMonth, setSelectedDayOfMonth] = useState(
		currentTask.selectedDayOfMonth
	);
	const [selectedInterval, setSelectedInterval] = useState(
		currentTask.selectedInterval
	);
	const [startDate, setStartDate] = useState(new Date(currentTask.startDate));
	const [endDate, setEndDate] = useState(new Date(currentTask.endDate));

	const initForm = () => {
		setTitle(currentTask.title);
		setRecurrenceType(currentTask.recurrenceType);
		setSelectedWeekDays(currentTask.selectedWeekDays);
		setSelectedDayOfMonth(currentTask.selectedDayOfMonth);
		setSelectedInterval(currentTask.selectedInterval);
		setStartDate(currentTask.startDate);
		setEndDate(currentTask.endDate);
	};

	useEffect(() => {
		initForm();
	}, [currentTask]);

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const recurrences = generateRecurrenceData();

			await taskService.updateTask(currentTask.id, title, recurrences, token);
			dispatch(fetchTasks());
			initForm();
		} catch (error) {
			console.error("Failed to update task:", error);
		}
	};

	const handleWeekDayToggle = (day) => {
		const updatedWeekDays = [...selectedWeekDays];
		const index = updatedWeekDays.indexOf(day);

		if (index !== -1) {
			updatedWeekDays.splice(index, 1);
		} else {
			updatedWeekDays.push(day);
		}

		setSelectedWeekDays(updatedWeekDays);
	};

	const handleDayOfMonthToggle = (day) => {
		const updatedDaysOfMonth = [...selectedDayOfMonth];
		const index = updatedDaysOfMonth.indexOf(day);

		if (index !== -1) {
			updatedDaysOfMonth.splice(index, 1);
		} else {
			updatedDaysOfMonth.push(day);
		}

		setSelectedDayOfMonth(updatedDaysOfMonth);
	};

	const generateRecurrenceData = () => {
		const recurrences = [];

		if (recurrenceType === "Unique") {
			const recurrenceData = {
				start_date: startDate?.toISOString(),
				end_date: null,
				day_of_week: null,
				day_of_month: null,
				recurrence_interval: null,
			};
			recurrences.push(recurrenceData);
		} else if (recurrenceType === "Semaine") {
			selectedWeekDays.forEach((day) => {
				const recurrenceData = {
					start_date: startDate?.toISOString(),
					end_date: endDate?.toISOString(),
					day_of_week: day,
					day_of_month: null,
					recurrence_interval: null,
				};
				recurrences.push(recurrenceData);
			});
		} else if (recurrenceType === "Mois") {
			selectedDayOfMonth.forEach((day) => {
				const recurrenceData = {
					start_date: startDate?.toISOString(),
					end_date: endDate?.toISOString(),
					day_of_week: null,
					day_of_month: day,
					recurrence_interval: null,
				};
				recurrences.push(recurrenceData);
			});
		} else if (recurrenceType === "Intervalle") {
			const recurrenceData = {
				start_date: startDate?.toISOString(),
				end_date: endDate?.toISOString(),
				day_of_week: null,
				day_of_month: null,
				recurrence_interval: selectedInterval,
			};
			recurrences.push(recurrenceData);
		}

		return recurrences;
	};

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Modifier une tâche 💡</p>
			</div>
			<form className="bodyContainer" onSubmit={handleFormSubmit}>
				<div className="inputContainer">
					<label htmlFor="title">Nom de la tâche</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						placeholder="Titre de la tâche"
						required
					/>
				</div>
				<div className="inputContainer">
					<label htmlFor="recurrenceType">Type de récurrences</label>
					<select
						id="recurrenceType"
						value={recurrenceType}
						onChange={(event) => setRecurrenceType(event.target.value)}
					>
						<option value="Unique">Unique</option>
						<option value="Semaine">Semaine</option>
						<option value="Mois">Mois</option>
						<option value="Intervalle">Intervalle</option>
					</select>
				</div>

				<div className="inputContainer">
					<button type="submit">Mettre à jour</button>
				</div>
			</form>
		</div>
	);
};

export default TaskFormUpdate;
