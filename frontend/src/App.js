import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDetails from "./UserDetails/UserDetails";
import CreateUser from "./CreateUser/CreateUser";
import UpdateForm from "./UpdateForm/UpdateForm";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<UserDetails />} />
					<Route path="/createUser" element={<CreateUser />} />
					<Route path="/updateUser/:id" element={<UpdateForm />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
