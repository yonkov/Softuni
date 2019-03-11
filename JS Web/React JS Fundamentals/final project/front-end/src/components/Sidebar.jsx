import React from 'react';
import SidebarWidget from './SidebarWidget';

const Sidebar = (props) => {
    
    return (
        <div className="col-md-12 col-lg-4 sidebar">
            <div className="sidebar-box search-form-wrap">
                {/* Search*/}
                <form className="search-form">
                    <div className="form-group">
                        <span className="icon fa fa-search" />
                        <input type="text" className="form-control" onChange={props.handleChange}  name="search" id="s" placeholder="Search.." />
                    </div>
                </form>
            </div>
            {/* Sidebar-box */}
            <div className="sidebar-box">
                <div className="bio text-center">
                    <img src="images/atanas-yonkov.jpg" alt="Image Placeholder" className="img-fluid" />
                    <div className="bio-body">
                        <h2>Atanas Yonkov</h2>
                        <p>Hi, my name is Atanas Yonkov. I am a blogger, web developer and React enthusiast. In this blog you can find up-to-date and useful information about our favourite JS framework!</p>
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
            {/*LatestPosts widget*/}
            <SidebarWidget {...props} formatDate={props.formatDate} />
        </div>
        );
};
export default Sidebar;