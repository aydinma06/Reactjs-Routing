import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import "./Blog.css";
import Posts from "./Posts/Posts";
//import NewPost from "./NewPost/NewPost";
import asyncComponent from "../../hoc/asyncComponent";
const AsyncNewPost = asyncComponent(() => {
  return import("./NewPost/NewPost"); // İhtiyaç olana kadar eklemiyor
});

class Blog extends Component {
  state = {
    auth: true
  };

  render() {
    return (
      <div>
        <header className="Blog">
          <nav>
            <ul>
              <li>
                <NavLink to="/posts" exact>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true"
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/*<Route path="/" exact render={() => <Posts />} />
        <Route path="/" exact render={() => <h1>Home 2</h1>} />*/}
        <Switch>
          {this.state.auth ? (
            <Route path="/new-post" component={AsyncNewPost} />
          ) : null}
          <Route path="/posts" component={Posts} />
          <Route render={() => <h1>Not found</h1>} />{" "}
          {/* Üstteki yanlış pathi yakalar*/}
          {/*<Redirect from="/" to="/posts" />*/
          /*Üstteki yanlış path girildiğinde otomatik olarak verilen sayfaya yönlendirir*/}
        </Switch>
      </div>
    );
  }
}

export default Blog;
