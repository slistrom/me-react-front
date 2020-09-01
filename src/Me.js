import React, { Component } from 'react';

class Me extends Component {

    constructor() {
        super();
        this.state = { data: "" };
    }

    componentDidMount() {
        fetch("http://localhost:1337")
            .then(response => response.json())
            .then(data => {
                this.setState({ data: data.data.msg});
                // console.log(this.state.data);
            });
    };

    render() {
        return (
            <main dangerouslySetInnerHTML={{__html: this.state.data}} >
            </main>
        );
    }
}

export default Me;
