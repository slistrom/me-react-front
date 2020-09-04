import React, {Component} from 'react';
import {Link} from "react-router-dom";
import auth from "./auth.js";

class Report extends Component {

    constructor() {
        super();
        this.state = {
            data: null,
            number: null
        };
    }

    componentDidMount() {
        // console.log(this.props);
        fetch("http://localhost:1337/reports/week/" + this.props.match.params.number)
            .then(response => response.json())
            .then(data => {
                this.setState({ data: data.data.text});
                // console.log(this.state.data);
            });
    };

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.number !== this.props.match.params.number) {
            fetch("http://localhost:1337/reports/week/" + this.props.match.params.number)
                .then(response => response.json())
                .then(data => {
                    this.setState({ data: data.data.text});
                    // console.log(this.state.data);
                });
        }
    }

    render() {
        // console.log(this.props);
        let editUrl;

        if (auth.token !== "") {
            editUrl = <Link className='button' to={`/reports/edit/${this.props.match.params.number}`}>Edit</Link>;
        }

        return (
            <main>
                <h3>Kmom {this.props.match.params.number}</h3>
                <p>{editUrl}</p>
                <article dangerouslySetInnerHTML={{__html: this.state.data}}></article>
            </main>
        );
    }
}

export default Report;