import React, { useEffect, useState } from "react";
import "./UpdateForm.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const UpdateForm = () => {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const { id } = useParams();

	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5001/getOneUser/${id}`
				);
				setName(response.data.name);
				setAge(response.data.age);
			} catch (error) {
				console.log(error);
			}
		};
		getUser();
	}, [id]);

	const updateUser = async () => {
		await axios.put(`http://localhost:5001/updateUser/${id}`, {
			name: name,
			age: age,
		});
	};

	const handleSubmit = (e) => {
		updateUser();
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Name:</label>
				<input
					type="text"
					id="name"
					value={name}
					defaultValue={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<label htmlFor="age">Age:</label>
				<input
					type="number"
					id="age"
					value={age}
					defaultValue={age}
					onChange={(e) => setAge(e.target.value)}
				/>
				<Link to="/">
					<button>back</button>
				</Link>

				<button type="submit">Update</button>
			</form>
		</div>
	);
};

export default UpdateForm;
