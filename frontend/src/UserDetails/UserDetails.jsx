import React, { useEffect, useState } from "react";
import "./UserDetails.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UserDetails = () => {
	const [users, setUser] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5001/getUser"
				);
				setUser(
					response.data.map((user) => ({ ...user, id: user._id }))
				);
			} catch (error) {
				console.log(error);
			}
		};
		getUser();
	}, []);

	const deleteUser = async (id) => {
		try {
			await axios.delete(`http://localhost:5001/deleteUser/${id}`);
		} catch (error) {
			console.log(error);
		}
		window.location.reload();
	};

	const updateUser = (id) => {
		navigate(`/updateUser/${id}`);
	};

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Age</th>
						<th>ID</th>
						<th>update</th>
						<th>delete</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>{user.name}</td>
							<td>{user.age}</td>
							<td>{user.id}</td>
							<td>
								<button onClick={() => updateUser(user._id)}>
									update
								</button>
							</td>
							<td>
								<button onClick={() => deleteUser(user._id)}>
									delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Link to="/createUser">
				<button className="button">create user</button>
			</Link>
		</div>
	);
};

export default UserDetails;
