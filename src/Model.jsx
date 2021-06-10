import React from "react";
import "./Model.css";

function Model({ Brand, Name }) {
	return (
		<div className="model">
			<h1>{Name}</h1>
		</div>
	);
}

export default Model;
