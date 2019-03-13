import React, { Component } from 'react'
import Sidebar from '../../components/Sidebar';
import {NavLink} from 'react-router-dom'

class AllPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <section className="site-section pt-5">
                <div className="container">
                    <div className="row blog-entries">
                        <div className="col-md-12 col-lg-8 main-content">
                            <div className="col-md-12 mb-5">
                                <h2>All Posts</h2>
                            </div>
                            {this.props.posts.map(p=> (
                                <div key ={p._id} className="col-md-12">
                                    <div className="post-entry-horzontal">
                                        <NavLink to={"/posts/" + p._id}>
                                            <div className="image" style={{ backgroundImage: `url(${p.imageUrl})` }} />
                                            <span className="text">
                                                <div className="post-meta">
                                                    <span className="author mr-2"><img src="images/atanas-yonkov.jpg" alt="pic placeholder" /> {p.author.username}</span>•
                                                    <span className="mr-2">{this.props.formatDate(p.creationDate)} </span> •
                                                </div>
                                                <h2>{p.title}</h2>
                                            </span>
                                        </NavLink>
                                    </div>
                                {/* END post */}
                                
                                </div>

                            ))}
                        </div>
                        <Sidebar posts={this.props.posts} 
                        handleSearchSubmit={this.props.handleSearchSubmit}
                        handleChange={this.props.handleChange} 
                        formatDate={this.props.formatDate} />
                    </div>
                </div>
            </section>
        )

    }
}

export default AllPosts;