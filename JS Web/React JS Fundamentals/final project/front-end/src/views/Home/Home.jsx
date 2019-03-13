import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Sidebar from '../../components/Sidebar';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    
    return (
      <div>
        {/* Start of main-content */}
        <section className="site-section py-sm">
          <div className="container">
            <div className="row">
            
              <div className="col-md-6">
                <h2 className="mb-4">Latest Posts</h2>
              </div>
            </div>
            <div className="row blog-entries">
              <div className="col-md-12 col-lg-8 main-content">
                <div className="row">
                  {/* Dynamic content here */}
                  {this.props.posts.slice(0,4).map(post =>
                    <div key={post._id} className="col-md-6">
                      <NavLink to={"/posts/" + post._id} className="blog-entry element-animate fadeIn element-animated" data-animate-effect="fadeIn">
                        <img src={post.imageUrl} alt="featured" />
                        <div className="blog-content-body">
                          <div className="post-meta">
                            <span className="author mr-2"><img src="images/atanas-yonkov.jpg" alt="author" /> {post.author.username}</span>•
                        <span className="mr-2">{this.props.formatDate(post.creationDate)} </span>
                          </div>
                          <h2>{post.title}</h2>
                        </div>
                      </NavLink>
                    </div>

                  )}

                </div>
                {/* <div className="row mt-5">
                  <div className="col-md-12 text-center">
                    <nav aria-label="Page navigation" className="text-center">
                      <ul className="pagination">
                        <li className="page-item  active"><a className="page-link" href="#">&lt;</a></li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">4</a></li>
                        <li className="page-item"><a className="page-link" href="#">5</a></li>
                        <li className="page-item"><a className="page-link" href="#">&gt;</a></li>
                      </ul>
                    </nav>
                  </div>
                </div> */}
              </div>
              {/* END of main-content */}

              {/* Show Sidebar */}
              <Sidebar posts={this.props.posts} 
                handleSearchSubmit={this.props.handleSearchSubmit}
                handleChange={this.props.handleChange} 
                formatDate={this.props.formatDate}/>
            </div>
          </div>
        </section>
      </div>
    );
  }

}

export default Home;