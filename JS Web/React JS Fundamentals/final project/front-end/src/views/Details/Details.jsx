import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar';
import { NavLink } from 'react-router-dom'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      comment: null
    }
    this.handleChange = props.handleChange.bind(this);
  }

  componentDidMount() {
    const { posts, match } = this.props;

    this.setState({
      post: posts.length
        ? posts.find(p => p._id === match.params.id)
        : null,
      userId: localStorage.getItem('userId')
    })
  }

  componentDidUpdate(prevProps) {
    const { posts, match, isAuthed } = this.props;

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
    const { isAdmin, isAuthed } = this.props;

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
              <span className="mr-2">{this.props.formatDate(post.creationDate)} </span> •
              <span className="ml-2"><span className="fa fa-comments" /> 3</span>
              </div>
              {isAdmin && <NavLink to={isAdmin && "/edit/" + this.props.match.params.id}>edit post </NavLink>}
              {isAdmin && <NavLink to={"/delete/" + this.props.match.params.id}>delete post</NavLink>}
              <h1 className="mb-4">{post.title}</h1>
              <div className="post-content-body">
                <div className="row mb-5">
                </div>
                {ReactHtmlParser(post.content)}
              </div>
              <div className="pt-5">
                <h3 className="mb-5">Comments</h3>
                <ul className="comment-list">
                {post.comments.map(comment =>
                  <li key={comment._id} className="comment">
                  <div className="vcard">
                    <img src="/images/person_1.jpg" alt="Image placeholder" />
                  </div>
                  <div className="comment-body">
                     <h3>{comment.author.username}</h3>
                     <div className="meta">{this.props.formatDate(comment.creationDate)}</div>
                     <p>{comment.comment}</p>
                     <p><a href="#" className="reply rounded">Reply</a></p>
                   </div>
                 </li>
                
                  )}
                  
                </ul>
                {/* END comment-list */}
                <div className="comment-form-wrap pt-5">
                  {isAuthed ? <h3 className="mb-5">Leave a comment</h3> 
                  : 
                  <h3 className="mb-5">Please <NavLink to="/login">log in</NavLink> or <NavLink to="/register">register</NavLink> to post a comment</h3> }
                  {isAuthed && <form onSubmit={(e) => this.props.handleSubmit(e, this.state)} className="p-5 bg-light">

                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea name="comment" id="message" onChange={this.handleChange} cols={30} rows={10} className="form-control" defaultValue={""} />
                    </div>
                    <div className="form-group">
                      <input type="submit" defaultValue="Post Comment" className="btn btn-primary" />
                    </div>
                  </form>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    );
  }
}

export default Details;