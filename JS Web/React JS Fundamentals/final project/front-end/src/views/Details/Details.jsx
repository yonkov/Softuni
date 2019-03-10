import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar';
import { NavLink } from 'react-router-dom'

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null
    }
  }

  componentDidMount() {
    const { posts, match } = this.props;

    this.setState({
      post: posts.length 
        ? posts.find(p => p._id === match.params.id) 
        : null
    })
  }

  componentDidUpdate(prevProps) {
    const { posts, match, isAdmin } = this.props;

    if (JSON.stringify(prevProps) === JSON.stringify(this.props)) {
      return;
    }

    this.setState({
      post: posts.length 
        ? posts.find(p => p._id === match.params.id) 
        : null
    });
  }

  render() {
    const { post } = this.state;
    const {isAdmin} = this.props
    console.log(isAdmin);
    

    if (!post) {
      return <span>Loading post ...</span>;
    }

    return (
      <section className="site-section py-lg">
      <div className="container">
        <div className="row blog-entries">
          <div className="col-md-12 col-lg-8 main-content">
            <img src={post.imageUrl} alt="image placeholder" className="img-fluid mb-5" />
            <div className="post-meta">
              <span className="author mr-2"><img src="/images/atanas-yonkov.jpg" alt="pic" className="mr-2" />{post.author.username}</span>•
              <span className="mr-2">{this.state.post.creationDate} </span> •
              <span className="ml-2"><span className="fa fa-comments" /> 3</span>
            </div>
              {isAdmin && <NavLink to={isAdmin && "/edit/" + this.props.match.params.id}>edit post </NavLink>}
              {isAdmin && <NavLink to={"/delete/" + this.props.match.params.id}>delete post</NavLink>}
            <h1 className="mb-4">{this.state.post.title}</h1>
            <div className="post-content-body">
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