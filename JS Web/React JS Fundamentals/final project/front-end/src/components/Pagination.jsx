import React from 'react';
 
export default class Pagination extends React.Component {
    setNextPage = () => {
        this.props.setNextPage(this.props.page + 1);
    };
        
    render() {
        return (
            <div>
                <button onClick={this.setNextPage}>Load next page</button>
            </div>
        );
    }
}