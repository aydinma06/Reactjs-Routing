import React, { Component } from 'react';
import axios from '../../axios';

import './FullPost.css';

class FullPost extends Component {

    state = {
        selectedPost: null
    }

    componentDidUpdate() {
        if (this.props.selectedPostId) {
            if (!this.state.selectedPost || (this.state.selectedPost && this.props.selectedPostId !== this.state.selectedPost.id)) {
                axios.get('/posts/' + this.props.selectedPostId)
                    .then(response => {
                        this.setState({ selectedPost: response.data })
                    })
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.id)
            .then(response => { console.log(response) })
    }

    render() {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (this.props.selectedPostId) {
            post = <p style={{ textAlign: 'center' }}>Loading....</p>;
        }

        if (this.state.selectedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.selectedPost.title}</h1>
                    <p>{this.state.selectedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>

            );
        }

        return post;
    }
}

export default FullPost;