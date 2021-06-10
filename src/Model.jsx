import React from "react";
import "./Model.css";

function Model({ Brand, Name }) {
	return (
		<div className="model">
			<h4>{Name}</h4>
		</div>
	);
}

export default Model;
