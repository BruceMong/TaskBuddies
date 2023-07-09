import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { taskService } from "../../services/taskService";

const FormTask = () => {
	const token = localStorage.getItem("token");

	const [title, setTitle] = useState("");
	const [recurrenceType, setRecurrenceType] = useState("Unique");
	const [selectedWeekDays, setSelectedWeekDays] = useState([]);
	const [selectedDayOfMonth, setSelectedDayOfMonth] = useState([]);
	const [selectedInterval, setSelectedInterval] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const recurrences = generateRecurrenceData();

			await taskService.addTask(title, recurrences, token);
		} catch (error) {
			console.error("Failed to add task:", error);
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

	const weekDays = [
		{ name: "Lundi", value: 1 },
		{ name: "Mardi", value: 2 },
		{ name: "Mercredi", value: 3 },
		{ name: "Jeudi", value: 4 },
		{ name: "Vendredi", value: 5 },
		{ name: "Samedi", value: 6 },
		{ name: "Dimanche", value: 7 },
	];

	const dayOfMonthOptions = Array.from({ length: 31 }, (_, index) => index + 1);

	return (
		<form onSubmit={handleFormSubmit}>
			<div>
				<label htmlFor="title">Title:</label>
				<input
					type="text"
					id="title"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
					required
				/>
			</div>
			<div>
				<label htmlFor="recurrenceType">Recurrence Type:</label>
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
				<div>
					<label>Sélectionnez les jours de la semaine:</label>
					<div>
						{weekDays.map((day) => (
							<label key={day.value}>
								<input
									type="checkbox"
									checked={selectedWeekDays.includes(day.value)}
									onChange={() => handleWeekDayToggle(day.value)}
								/>
								{day.name}
							</label>
						))}
					</div>
				</div>
			)}
			{recurrenceType === "Mois" && (
				<div>
					<label>Sélectionnez les jours du mois:</label>
					<div>
						{dayOfMonthOptions.map((day) => (
							<label key={day}>
								<input
									type="checkbox"
									checked={selectedDayOfMonth.includes(day)}
									onChange={() => handleDayOfMonthToggle(day)}
								/>
								{day}
							</label>
						))}
					</div>
				</div>
			)}
			{recurrenceType === "Intervalle" && (
				<div>
					<label htmlFor="selectedInterval">Sélectionnez un intervalle:</label>
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
			<div>
				<label>Date de début:</label>
				<DatePicker
					selected={startDate}
					onChange={(date) => setStartDate(date)}
				/>
			</div>
			<div>
				<label>Date de fin:</label>
				<DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
			</div>
			<button type="submit">Ajouter</button>
		</form>
	);
};

export default FormTask;
