import React, { Component } from 'react';
import { toast } from 'react-toastify'

class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: null,
      imageUrl: null,
      content: null,
    }
    this.handleChange = props.handleChange.bind(this);
  }

  componentDidMount() {
    this.deleteGet();
    
  }
  
  deleteGet() {
    fetch('http://localhost:9999/feed/post/delete/' + this.props.match.params.id)
      .then(rawData => rawData.json())
      .then(
        body => {
            
          this.setState({
            id: this.props.match.params.id,
            title: body.post.title,
            imageUrl: body.post.imageUrl,
            content: body.post.content
          })     
          
        }
      )
      .catch(error => console.error(error));
  }

  deletePost(e, data) {
      
    e.preventDefault();
    
    fetch('http://localhost:9999/feed/post/delete/' + this.props.match.params.id, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(
        
        rawData => rawData.json()
      )
      .then(

        body => {
          
          if (!body.errors) {
            toast.success(body.message);
            this.props.history.push('/')    
          }
          else {
            console.log(body.message)
          }
        }
      )
      .catch(error => console.error(error));
  }

    render() {

        return (
            <main className="text-center form">
                <div className="form-wrapper">
                    <h1>Delete Post</h1>
                    <form className="submit-form" onSubmit={(e) => this.deletePost(e, this.state)}>
                        <div className="row">
                            <div className="col-md-12 form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" onChange={this.handleChange} name="title" value={this.state.title} id="title" className="form-control" disabled />
                            </div>
                            <div className="col-md-12 form-group">
                                <label htmlFor="description">Featured image</label>
                                <input type="text" onChange={this.handleChange} name="imageUrl" value={this.state.imageUrl} id="imageUrl" className="form-control" disabled />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 form-group">
                                <label htmlFor="content">Content</label>
                                <textarea name="content" value={this.state.content} onChange={this.handleChange} id="content" className="form-control " cols={30} rows={8} defaultValue={""} disabled />
                            </div>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Delete</button>
                    </form>
                </div>
            </main>
        );
    }
}

export default Delete;