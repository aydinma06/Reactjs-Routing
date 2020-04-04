import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import { Link, Route } from "react-router-dom";
import "./Posts.css";
import FullPost from "../FullPost/FullPost";

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  };

  postSelectedHandler = postId => {
    this.setState({ selectedPostId: postId });
    //this.props.history.push("/" + postId);
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
          <Link key={post.id} to={"/posts/" + post.id}>
            <Post
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)}
            />{" "}
          </Link>
        );
      });
    }

    return (
      <div>
        <section className="Posts">{posts}</section>

        <Route path="/posts/:id" exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;
