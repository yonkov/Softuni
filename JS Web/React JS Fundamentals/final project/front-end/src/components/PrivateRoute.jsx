import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';


export default class PrivateRoute extends Component {
    constructor(props) {
        super(props)
        this.isAdmin = this.props.isAdmin
    }
    render() {
        if (!this.isAdmin) {
            
            return <Redirect to="/login" />;
        };

        return (
            <Route {...this.props}>
                {this.props.children}
            </Route>
        );
    }
}