import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import "./Post.css";

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  };

  postSelectedHandler = postId => {
    this.setState({ selectedPostId: postId });
  };
  componentDidMount() {
    axios.get("/posts").then(response => {
      const posts = response.data.slice(0, 4);
      const updatedPosts = posts.map(post => {
        return {
          ...post,
          author: "Mammimia"
        };
      });
      this.setState({ posts: updatedPosts });
      //console.log(response.data)
    });
    //.catch(//error => this.setState({ error: true }));
  }

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;

    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }

    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;
