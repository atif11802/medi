import React, { useState } from "react";
import "./Post.css";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { CardActionArea, CardContent, Typography } from "@material-ui/core";
import axios from "axios";
import {  Modal } from "@material-ui/core";
import Model from "./Model";

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
		overflow: "scroll",
	};
}

const useStyles = makeStyles((theme) => ({
	// root: {
	// 	maxWidth: 345,
	// },
	// media: {
	// 	height: 140,
	// },
	paper: {
		color: "white",
		marginTop: 50,
		position: "fixed",
		height: 400,
		width: 300,
		// backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		backgroundColor: "#042727",
		fontFamily: "Hind Madurai",
	},
}));

function Post({ BrandId, Description, Name, accessToken }) {
	const classes = useStyles();
	const [brand, setBrand] = useState();
	const [name, setName] = useState();
	const [open, setOpen] = React.useState(false);
	const [modalStyle] = React.useState(getModalStyle);
	const [modeldata, setModeldata] = useState([]);

	const url = `${brand}/${name}`;
	// console.log(brand,name,url)
	

	const handleClose = () => {
		setOpen(false);
	};

	const fetchData = async () => {
		
		await axios
			.get(process.env.REACT_APP_API_KEY_BRAND_NAME+`${url}`, {
				headers: {
					authorization: `${accessToken}`,
				},
			})
			.then((res) => {
				setModeldata(res.data);
				
			})
			.catch((error) => {
				console.error(error);
			});
	};
	if (open === true) {
		fetchData();
	}
	

	const handleOpen = () => {
		setOpen(true);
		setBrand(BrandId);
		setName(Name);
		
	};

	return (
		<div className="post">
			<Modal
				//  disableScrollLock="true"
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div
					style={modalStyle}
					className={classes.paper}
				>
					{modeldata && modeldata.length
						? modeldata.map(
								(
									model,
									ind
								) => (
									<Model
										key={
											ind
										}
										Brand={
											model.Brand
										}
										Model={
											model.Model
										}
										Name={
											model.Name
										}
									/>
								)
						  )
						: "no data found"}
				</div>
			</Modal>
			<div className="post__card" onClick={handleOpen}>
				<Card
					style={{
						Cursor: "pointer",
						pointerEvents: "none",
					}}
					className={classes.root}
				>
					<CardActionArea>
						<CardContent>
							<Typography
								gutterBottom
								variant="h5"
								component="h1"
								style={{
									fontFamily:
										"Hind Madurai",
								}}
							>
								{Name}
							</Typography>
							<Typography
								style={{
									fontFamily:
										"Hind Madurai",
								}}
								variant="h5"
								color="textSecondary"
								component="h3"
							>
								{Description}
							</Typography>
							<Typography
								style={{
									fontFamily:
										"Hind Madurai",
								}}
								gutterBottom
								variant="h6"
								component="h6"
							>
								{BrandId}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>

			
			</div>
		</div>
	);
}

export default Post;
