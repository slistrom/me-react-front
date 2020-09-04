import React, {Component} from 'react';
import {Link} from "react-router-dom";
import auth from "./auth";

class ReportEdit extends Component {

    constructor() {
        super();
        this.state = {
            text: '',
            week: null,
            msg: ""
        };
    }

    componentDidMount() {
        // console.log(this.props);
        fetch("http://localhost:1337/reports/week/" + this.props.match.params.number)
            .then(response => response.json())
            .then(data => {
                this.setState({ text: data.data.text});
                this.setState({ week: data.data.week});
                // console.log(this.state.data);
            });
    };

    mySubmitHandler = (event) => {
        event.preventDefault();
        const API = 'http://localhost:1337/reports/';
        let payload={
            "text":this.state.text,
            "week":this.state.week
        }
        fetch(API, {
            method: 'POST',
            headers: {
                "x-access-token": auth.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => {
                this.setState({msg: "<span class='infomsg'>Report updated</span>"});
                console.log('Success:', data);
                // this.props.history.push('/login');

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    myChangeHandler = (event) => {
        this.setState({text: event.target.value});
    }

    render() {
        // console.log(this.props);

        return (
            <main>
                {/*<p>{this.state.msg}</p>*/}
                <p dangerouslySetInnerHTML={{__html: this.state.msg}}></p>
                <h3>Kmom {this.state.week}</h3>
                <h3>Update report text</h3>
                    <form onSubmit={this.mySubmitHandler}>
                        <textarea value={this.state.text} name='text' rows='30' cols='90' onChange={this.myChangeHandler} />
                        <p></p>
                        <input
                            className='button'
                            type='submit'
                            value='Save'
                        />
                    </form>
                <p><Link className='button' to={`/reports/week/${this.props.match.params.number}`}>Cancel</Link></p>
            </main>
        );
    }
}

export default ReportEdit;
