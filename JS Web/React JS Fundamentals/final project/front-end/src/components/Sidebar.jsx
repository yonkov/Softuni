import React from 'react';

const Sidebar = (props) => {
    
    return (
        <div className="col-md-12 col-lg-4 sidebar">
            <div className="sidebar-box search-form-wrap">
                <form className="search-form">
                    <div className="form-group">
                        <span className="icon fa fa-search" />
                        <input type="text" className="form-control" onChange={props.handleChange}  name="search" id="s" placeholder="Search.." />

                    </div>
                </form>
            </div>
            {/* END sidebar-box */}
            <div className="sidebar-box">
                <div className="bio text-center">
                    <img src="images/atanas-yonkov.jpg" alt="Image Placeholder" className="img-fluid" />
                    <div className="bio-body">
                        <h2>Atanas Yonkov</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem facilis sunt repellendus
                        excepturi beatae porro debitis voluptate nulla quo veniam fuga sit molestias minus.</p>
                        <p><a href="#" className="btn btn-primary btn-sm rounded">Read my bio</a></p>
                        <p className="social">
                            <a href="#" className="p-2"><span className="fa fa-facebook" /></a>
                            <a href="#" className="p-2"><span className="fa fa-twitter" /></a>
                            <a href="#" className="p-2"><span className="fa fa-instagram" /></a>
                            <a href="#" className="p-2"><span className="fa fa-youtube-play" /></a>
                        </p>
                    </div>
                </div>
            </div>
            {/* END sidebar-box */}
            <div className="sidebar-box">
                <h3 className="heading">Popular Posts</h3>
                <div className="post-entry-sidebar">
                    <ul>
                        <li>
                            <a href=''>
                                <img src="images/img_2.jpg" alt="Image placeholder" className="mr-4" />
                                <div className="text">
                                    <h4>How to Find the Video Games of Your Youth</h4>
                                    <div className="post-meta">
                                        <span className="mr-2">March 15, 2018 </span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href=''>
                                <img src="images/img_4.jpg" alt="Image placeholder" className="mr-4" />
                                <div className="text">
                                    <h4>How to Find the Video Games of Your Youth</h4>
                                    <div className="post-meta">
                                        <span className="mr-2">March 15, 2018 </span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href=''>
                                <img src="images/img_12.jpg" alt="Image placeholder" className="mr-4" />
                                <div className="text">
                                    <h4>How to Find the Video Games of Your Youth</h4>
                                    <div className="post-meta">
                                        <span className="mr-2">March 15, 2018 </span>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            {/* END sidebar-box */}
        </div>
        );
};
export default Sidebar;