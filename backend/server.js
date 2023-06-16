const express = require("express");
const app = express();
const cors = require("cors");
const dbConnection = require("./dbConnection");
const dotenv = require("dotenv").config();
const User = require("./User");

dbConnection();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

//create user
app.post("/createUser", async (req, res) => {
	try {
		const user = await User.create({
			name: req.body.name,
			age: req.body.age,
		});
		res.status(200).json({ message: "user created", user });
	} catch (error) {
		res.status(400).json({ message: "user not created", error });
	}
});

//get users

app.get("/getUser", async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(404).json({ message: "user not found", error });
	}
});

//get one user

app.get("/getOneUser/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json(error);
	}
});
//user update

app.put("/updateUser/:id", async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});

		if (user) {
			res.status(200).json({ message: "User updated", user });
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Failed to update user", error });
	}
});

app.delete("/deleteUser/:id", async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		res.json({ message: "user deleted", user });
	} catch (error) {
		res.status(500).json({ message: "user not deleted", error });
	}
});

app.listen(PORT, () => {
	console.log(`server runnig on port ${PORT}`);
});
