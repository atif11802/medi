import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import "./Posts.css";

function Posts({ accessToken }) {
	const [posts, setPosts] = useState({});

	useEffect(() => {
		axios.get(
			process.env.REACT_APP_API_KEY_MODEL_TYPE,
			{
				headers: {
					authorization: `${accessToken}`,
				},
			}
		)
			.then((res) => {
				setPosts(res.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [posts]);

	return (
		<div className="posts">
			{posts.length ? (
				posts.map((post, ind) => (
					<Post
						key={ind}
						BrandId={post.BrandId}
						Description={post.Description}
						Name={post.Name}
						accessToken={accessToken}
					/>
				))
			) : (
				<div className="loader">
					<div className="loader-wheel"></div>
					<div className="loader-text"></div>
				</div>
			)}
		</div>
	);
}

export default Posts;
