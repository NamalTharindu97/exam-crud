import React, { useState } from "react";
import axios from "axios";
import "./CreateUser.css";

const CreateUser = () => {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");

	const createUser = async () => {
		await axios.post("http://localhost:5001/createUser", {
			name: name,
			age: age,
		});
	};

	const handleSubmit = (e) => {
		createUser();
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Name:</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<label htmlFor="age">Age:</label>
				<input
					type="number"
					id="age"
					value={age}
					onChange={(e) => setAge(e.target.value)}
				/>

				<button type="submit">Add User</button>
			</form>
		</div>
	);
};

export default CreateUser;
