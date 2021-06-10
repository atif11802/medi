import { Button, Modal } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Posts from "./Posts";
import Upload from "./Upload";

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: 400,

		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function App() {
	const [user, setUser] = useState(null);

	const classes = useStyles();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = useState(getModalStyle);
	const [open, setOpen] = useState(false);
	const [accessToken, setAccsessToken] = useState();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const signin = (e) => {
		e.preventDefault();
		axios.post("http://163.47.115.230:30000/api/login", {
			email: email,
			password: password,
		})
			.then(function (response) {
				setUser(response.data.access_token);
				setAccsessToken(response.data.access_token);
				localStorage.setItem(
					"user",
					JSON.stringify(response)
				);
			})
			.catch(function (error) {
				console.log(error);
				alert("Wrong Password. Please Provide Your Email and Password")
			});
		setOpen(false);
	};

	// console.log(accessToken);

	const handleLogout = () => {
		setUser();
		setEmail("");
		setPassword("");
		localStorage.clear();
	};

	useEffect(() => {
		const loggedInUser = localStorage.getItem("user");
		// console.log(loggedInUser);
		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser);
			setAccsessToken(foundUser.data.access_token);

			setUser(foundUser);
		}
	}, [accessToken]);

	return (
		<div className="app">
			<div className="app__header">
				<div className="app__left">
					<img
						className="app__logo"
						src="https://freepngimg.com/thumb/health/22905-6-health-file.png"
						alt=""
					/>
					<h3>BitFountain</h3>
				</div>
				{user ? (
					<Button
						onClick={handleLogout}
						variant="contained"
						color="secondary"
					>
						Logout
					</Button>
				) : (
					<Button
						onClick={handleOpen}
						variant="contained"
						color="secondary"
					>
						sign in
					</Button>
				)}
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div
					style={modalStyle}
					className={classes.paper}
				>
					<form className="app__form">
						<TextField
							id="standard-basic"
							label="Email"
							onChange={(e) =>
								setEmail(
									e.target
										.value
								)
							}
						/>
						<TextField
							onChange={(e) =>
								setPassword(
									e.target
										.value
								)
							}
							label="Password"
							type="password"
							autoComplete="current-password"
						/>
						<Button onClick={signin}>
							sign in
						</Button>
					</form>
				</div>
			</Modal>
			<div className="app__body">
				<div className="appbody__top">
					{user &&
					user.data &&
					user.data.access_token ? (
						<Upload
							accessToken={
								accessToken
							}
						/>
					) : (
						""
					)}
				</div>

				<div className="appbody__bottom">
					{user &&
					user.data &&
					user.data.access_token ? (
						<Posts
							accessToken={
								accessToken
							}
						/>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
