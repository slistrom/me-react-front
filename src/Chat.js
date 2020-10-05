import React, { Component } from 'react';
import io from 'socket.io-client';

class Chat extends Component {

    constructor() {
        super();
        this.state = {
            history: [],
            latestChat: [],
            msg: "",
            tmpNick: "",
            userNick: ""
        };
        // this.socket = io('http://localhost:8000');
        this.socket = io('https://socket-server.listrom.me');
        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.myChangeHandlerTwo = this.myChangeHandlerTwo.bind(this);
    }

    myChangeHandlerTwo = (event) => {
        let tmpNick = event.target.value;
        this.setState({tmpNick: tmpNick});
    }

    setUserNick = () => {
        this.setState({userNick: this.state.tmpNick})
        this.socket.emit('chat message', this.state.tmpNick + " just joined the chat")
    }

    myChangeHandler(event) {
        this.setState({msg: event.target.value});
    }

    sendMessage = () => {
        let message = this.state.userNick + ": " + this.state.msg;
        this.socket.emit('chat message', message);
        this.setState({msg: ""});
    }

    componentDidMount() {
        this.socket.on('connect', function() {
            console.log("New user connected")
        })

        this.socket.on('chat message', function (message) {
            updateChat(message);
            // console.log(message);
        });

        const updateChat = message => {
            this.setState({ history: [...this.state.history, message] });
        }
    }

    componentDidUpdate() {
        if (this.state.history.length > 1) {
            let chatwindow = document.getElementById("all-messages");
            chatwindow.scrollTop = chatwindow.scrollHeight;
        }
    }

    render() {

        if (this.state.userNick === "") {
            return (
                <main>
                    <h1>Websocket chat</h1>

                    <p><strong>Choose username:</strong></p>
                    <input className="new-message" value={this.tmpNick} onChange={this.myChangeHandlerTwo} />
                    <button className='button' onClick={this.setUserNick} >Join chat</button>
                </main>
            );
        } else {
            return (
                <main>
                    <h1>Websocket chat</h1>

                    <div
                        id="all-messages"
                        className="all-messages">
                        {this.state.history.map(item => (
                            <p key={item}>{item}</p>
                        ))}
                    </div>

                    <p><strong>Write new message:</strong></p>
                    <input
                        type="text"
                        className="new-message"
                        value={this.state.msg}
                        onChange={this.myChangeHandler}
                    />
                    <button
                        className='button'
                        onClick={this.sendMessage}
                    >
                    Send
                    </button>
                    <br />



                </main>
            );
        }


    }
}

export default Chat;
