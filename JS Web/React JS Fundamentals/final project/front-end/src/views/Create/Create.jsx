import React, { Component } from 'react';

class Create extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: null,
            imageUrl: null,
            content: null,
            author: localStorage.getItem('userId')
        }
        this.handleChange = props.handleChange.bind(this);

    }

    render() {
        return (
            <main className="text-center form">
                <div className="form-wrapper">
                    <h1>Create New Post</h1>
                    <form className="submit-form" onSubmit={(e) => this.props.handleSubmit(e, this.state)}>
                        <div className="row">
                            <div className="col-md-12 form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" onChange={this.handleChange} name="title" id="title" className="form-control " />
                            </div>
                            <div className="col-md-12 form-group">
                                <label htmlFor="description">Featured Image Url</label>
                                <input type="text" onChange={this.handleChange} name="imageUrl" id="imageUrl" className="form-control " />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 form-group">
                                <label htmlFor="content">Content</label>
                                <textarea name="content" onChange={this.handleChange} id="content" className="form-control " cols={30} rows={8} defaultValue={""} />
                            </div>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Create</button>
                    </form>
                </div>
            </main>
        );
    }
}

export default Create;