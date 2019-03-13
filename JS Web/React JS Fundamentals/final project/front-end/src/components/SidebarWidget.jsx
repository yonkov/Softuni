import React from 'react'
import { NavLink } from 'react-router-dom'
const SidebarWidget = (props) => {
    const { posts } = props;
    
    return (
        <div className="sidebar-box">
            <h3 className="heading">Latest Posts</h3>
            <div className="post-entry-sidebar">
                <ul>
                    {posts.slice(0,3).map(post=>(
                        <li key={post._id}>
                        <NavLink to={"/posts/" + post._id}>
                            <img src={post.imageUrl} alt="Image placeholder" className="mr-4" />
                            <div className="text">
                                <h4>{post.title}</h4>
                                <div className="post-meta">
                                    <span className="mr-2">{props.formatDate(post.creationDate)}</span>
                                </div>
                            </div>
                        </NavLink>
                    </li>

                    ))}
                   
                </ul>
            </div>
        </div>
    
    );
};
export default SidebarWidget;