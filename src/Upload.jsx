import React, { useEffect, useState } from "react";
import "./Upload.css";

import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import axios from "axios";

function Upload({ accessToken }) {
	const [brandId, setBrandId] = useState("");
	const [name, setName] = useState("");
	const [comment, setComment] = useState("");
	const [typeId, setTypeId] = useState("");

	useEffect(() => {
		axios.get(
			`http://163.47.115.230:30000/api/devicetype?limit=40&page=2`,
			{
				headers: {
					authorization: `${accessToken}`,
				},
			}
		)
			.then((res) => {
				setTypeId(res.data[0].length);
				
			})
			.catch((error) => {
				console.error(error);
			});
	});

	const submit = (e) => {
		e.preventDefault();
		if (brandId && name && comment) {
			document.getElementById("create-course-form").reset();

			axios.post(
				"http://163.47.115.230:30000/api/devicemodel",
				{
					BrandId: brandId,
					Name: name,
					TypeId: typeId,
					Comment: comment,
				},
				{
					headers: {
						authorization: `${accessToken}`,
					},
				}
			)
				.then((res) => {
					alert(
						"succesfully uploaded your data refresh to check."
					);
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			alert("Please, Fill all the Fields");
		}
	};

	return (
		<div className="upload">
			<form
				className="upload__form"
				noValidate
				autoComplete="off"
				id="create-course-form"
			>
				<TextField
					onChange={(e) =>
						setName(e.target.value)
					}
					label="Name"
					variant="filled"
				/>
				<TextField
					onChange={(e) =>
						setBrandId(e.target.value)
					}
					label="BrandId"
					variant="filled"
				/>
				<TextField
					onChange={(e) =>
						setComment(e.target.value)
					}
					label="Comment"
					variant="filled"
				/>

				<Button
					onClick={submit}
					type="submit"
					variant="contained"
					color="primary"
				>
					Submit Model Data
				</Button>
			</form>
		</div>
	);
}

export default Upload;
