import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { taskService } from "../../services/taskService";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../../store/dashboard/task";
import TagListForForm from "../tag/TagListForForm";

const TaskFormUpdate = ({ currentTask }) => {
	const token = localStorage.getItem("token");

	const dispatch = useDispatch();

	const weekDays = [
		{ name: "L", value: 1 },
		{ name: "M", value: 2 },
		{ name: "M", value: 3 },
		{ name: "J", value: 4 },
		{ name: "V", value: 5 },
		{ name: "S", value: 6 },
		{ name: "D", value: 7 },
	];

	const dayOfMonthOptions = Array.from({ length: 31 }, (_, index) => index + 1);

	const [title, setTitle] = useState(currentTask.title);

	const [selectedWeekDays, setSelectedWeekDays] = useState(
		currentTask.recurrences.map((recurrence) => recurrence.day_of_week)
	);
	const [selectedDayOfMonth, setSelectedDayOfMonth] = useState(
		currentTask.recurrences.map((recurrence) => recurrence.day_of_month)
	);
	const [selectedInterval, setSelectedInterval] = useState(
		currentTask.selectedInterval
	);
	const [startDate, setStartDate] = useState(
		currentTask.startDate ? new Date(currentTask.startDate) : null
	);
	console.log("Initial startDate:", startDate);

	const [endDate, setEndDate] = useState(
		currentTask.endDate ? new Date(currentTask.endDate) : null
	);
	console.log("Initial endDate:", endDate);
	const [idSelected, setIdSelected] = useState(currentTask.idSelected);

	const determineRecurrenceType = (task) => {
		if (task.recurrences && task.recurrences[0]) {
			const recurrence = task.recurrences[0];
			if (recurrence.day_of_week) {
				return "Semaine";
			} else if (recurrence.day_of_month) {
				return "Mois";
			} else if (recurrence.recurrence_interval) {
				return "Intervalle";
			} else {
				return "Unique";
			}
		} else {
			return "Unique"; // ou une autre valeur par défaut
		}
	};

	const [recurrenceType, setRecurrenceType] = useState(
		determineRecurrenceType(currentTask)
	);

	const initForm = () => {
		setTitle(currentTask.title);
		setRecurrenceType(determineRecurrenceType(currentTask));
		const recurrences = currentTask.recurrences;
		setSelectedWeekDays(
			currentTask.recurrences &&
				currentTask.recurrences.map((recurrence) => recurrence.day_of_week)
				? currentTask.recurrences.map((recurrence) => recurrence.day_of_week)
				: []
		);
		setSelectedDayOfMonth(
			currentTask.recurrences &&
				currentTask.recurrences.map((recurrence) => recurrence.day_of_month)
				? currentTask.recurrences.map((recurrence) => recurrence.day_of_month)
				: []
		);
		setSelectedInterval(
			currentTask.recurrences &&
				currentTask.recurrences[0] &&
				currentTask.recurrences[0].recurrence_interval
				? currentTask.recurrences[0].recurrence_interval
				: 0
		);
		setStartDate(
			currentTask.recurrences &&
				currentTask.recurrences[0] &&
				currentTask.recurrences[0].start_date
				? new Date(currentTask.recurrences[0].start_date)
				: null
		);
		setEndDate(
			currentTask.recurrences &&
				currentTask.recurrences[0] &&
				currentTask.recurrences[0].end_date
				? new Date(currentTask.recurrences[0].end_date)
				: null
		);
		setIdSelected(currentTask.tags[0].id);
	};

	useEffect(() => {
		initForm();
	}, [currentTask]);

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const recurrences = generateRecurrenceData();
			console.log("Recurrencesdqzdqzdqzd:", recurrences); // Ajoutez cette ligne

			await taskService.updateTask(
				currentTask.id,
				title,
				recurrences,
				idSelected
			);
			dispatch(fetchTasks());
			initForm();
			console.log("currentTask:", currentTask);
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

	console.log(determineRecurrenceType(currentTask));
	console.log("selectedWeekDays:", selectedWeekDays);

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Modifier une tâche 💡</p>
			</div>
			<TagListForForm idSelected={idSelected} setIdSelected={setIdSelected} />
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
				{recurrenceType === "Semaine" && (
					<div className="inputContainer">
						<label>Sélectionnez les jours de la semaine:</label>
						<div className="checkboxesContainer">
							{weekDays.map((day) => (
								<label key={day.value} className="checkbox-container">
									<input
										type="checkbox"
										checked={selectedWeekDays.includes(day.value)}
										onChange={() => handleWeekDayToggle(day.value)}
									/>
									<span className="checkmark">{day.name}</span>
								</label>
							))}
						</div>
					</div>
				)}
				{recurrenceType === "Mois" && (
					<div className="inputContainer">
						<label>Sélectionnez les jours du mois:</label>
						<div className="checkboxesContainer" id="monthDayList">
							{dayOfMonthOptions.map((day) => (
								<label key={day} className="checkbox-container">
									<input
										type="checkbox"
										checked={selectedDayOfMonth.includes(day)}
										onChange={() => handleDayOfMonthToggle(day)}
									/>
									<span className="checkmark">{day}</span>
								</label>
							))}
						</div>
					</div>
				)}
				{recurrenceType === "Intervalle" && (
					<div className="inputContainer">
						<label htmlFor="selectedInterval">
							Sélectionnez un intervalle:
						</label>
						<input
							type="number"
							id="selectedInterval"
							value={selectedInterval}
							onChange={(event) =>
								setSelectedInterval(Number(event.target.value))
							}
							required
						/>
					</div>
				)}
				<div className="inputContainer">
					<label>Date{recurrenceType != "Unique" && " de début"} :</label>
					<DatePicker
						selected={startDate instanceof Date ? startDate : null}
						onChange={(date) => setStartDate(date)}
					/>
				</div>
				{recurrenceType != "Unique" && (
					<div className="inputContainer">
						<label>Date de fin:</label>
						<DatePicker
							selected={endDate instanceof Date ? endDate : null}
							onChange={(date) => setEndDate(date)}
						/>
					</div>
				)}
				<div className="inputContainer">
					<button type="submit">Mettre à jour</button>
				</div>
			</form>
		</div>
	);
};

export default TaskFormUpdate;
