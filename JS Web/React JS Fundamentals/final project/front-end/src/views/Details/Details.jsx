import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: props.posts.find(p => p._id === this.props.match.params.id) 
    }
  }
  render() {
    return (
      <section className="site-section py-lg">
      <div className="container">
        <div className="row blog-entries">
          <div className="col-md-12 col-lg-8 main-content">
            <img src={this.state.post.imageUrl} alt="Image" className="img-fluid mb-5" />
            <div className="post-meta">
              <span className="author mr-2"><img src="images/person_1.jpg" alt="Colorlib" className="mr-2" /> Colorlib</span>•
              <span className="mr-2">{this.state.post.creationDate} </span> •
              <span className="ml-2"><span className="fa fa-comments" /> 3</span>
            </div>
            <h1 className="mb-4">{this.state.post.title}</h1>
            <div className="post-content-body">
              <p>{this.state.post.author}</p>
              <div className="row mb-5">  
              </div>
              <p>{this.state.post.content}</p>
            </div>
            <div className="pt-5">
              <h3 className="mb-5">6 Comments</h3>
              <ul className="comment-list">
                <li className="comment">
                  <div className="vcard">
                    <img src="/images/person_1.jpg" alt="Image placeholder" />
                  </div>
                  <div className="comment-body">
                    <h3>Jean Doe</h3>
                    <div className="meta">January 9, 2018 at 2:21pm</div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum
                      necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure!
                      Quam voluptas earum impedit necessitatibus, nihil?</p>
                    <p><a href="#" className="reply rounded">Reply</a></p>
                  </div>
                </li>
                <li className="comment">
                  <div className="vcard">
                    <img src="/images/person_1.jpg" alt="Image placeholder" />
                  </div>
                  <div className="comment-body">
                    <h3>Jean Doe</h3>
                    <div className="meta">January 9, 2018 at 2:21pm</div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum
                      necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure!
                      Quam voluptas earum impedit necessitatibus, nihil?</p>
                    <p><a href="#" className="reply rounded">Reply</a></p>
                  </div>
                  <ul className="children">
                    <li className="comment">
                      <div className="vcard">
                        <img src="/images/person_1.jpg" alt="Image placeholder" />
                      </div>
                      <div className="comment-body">
                        <h3>Jean Doe</h3>
                        <div className="meta">January 9, 2018 at 2:21pm</div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum
                          necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure!
                          Quam voluptas earum impedit necessitatibus, nihil?</p>
                        <p><a href="#" className="reply rounded">Reply</a></p>
                      </div>
                      <ul className="children">
                        <li className="comment">
                          <div className="vcard">
                            <img src="/images/person_1.jpg" alt="Image placeholder" />
                          </div>
                          <div className="comment-body">
                            <h3>Jean Doe</h3>
                            <div className="meta">January 9, 2018 at 2:21pm</div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum
                              necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste
                              iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                            <p><a href="#" className="reply rounded">Reply</a></p>
                          </div>
                          <ul className="children">
                            <li className="comment">
                              <div className="vcard">
                                <img src="/images/person_1.jpg" alt="Image placeholder" />
                              </div>
                              <div className="comment-body">
                                <h3>Jean Doe</h3>
                                <div className="meta">January 9, 2018 at 2:21pm</div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum
                                  necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente
                                  iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                <p><a href="#" className="reply rounded">Reply</a></p>
                              </div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="comment">
                  <div className="vcard">
                    <img src="/images/person_1.jpg" alt="Image placeholder" />
                  </div>
                  <div className="comment-body">
                    <h3>Jean Doe</h3>
                    <div className="meta">January 9, 2018 at 2:21pm</div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum
                      necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure!
                      Quam voluptas earum impedit necessitatibus, nihil?</p>
                    <p><a href="#" className="reply rounded">Reply</a></p>
                  </div>
                </li>
              </ul>
              {/* END comment-list */}
              <div className="comment-form-wrap pt-5">
                <h3 className="mb-5">Leave a comment</h3>
                <form action="#" className="p-5 bg-light">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input type="url" className="form-control" id="website" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea name id="message" cols={30} rows={10} className="form-control" defaultValue={""} />
                  </div>
                  <div className="form-group">
                    <input type="submit" defaultValue="Post Comment" className="btn btn-primary" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div></div></section>
    

      
    );
  }
}

export default Details;