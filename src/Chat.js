import React, { Component } from 'react';
import io from 'socket.io-client';


class Chat extends Component {

    constructor() {
        super();
        this.state = {
            history: [],
            log: [],
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
        if (this.state.msg !== "") {
            let message = this.state.userNick + ": " + this.state.msg;
            this.socket.emit('chat message', message);
            this.setState({msg: ""});
        }
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
        fetch("https://socket-server.listrom.me/chatlog/")
            .then(response => response.json())
            .then(data => {
                // this.setState({ data: data.data.text});
                // console.log(data);
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.setState({ log: [...this.state.log, data[key].message] });
                        // console.log(key + " -> " + data[key].message);
                        // console.log(this.state.log);
                    }
                }
            });
    }

    scrollChat() {
        let chatwindow = document.getElementById("all-messages");
        chatwindow.scrollTop = chatwindow.scrollHeight;
    }

    componentDidUpdate() {
        if (this.state.history.length > 1) {
            let chatwindow = document.getElementById("all-messages");
            chatwindow.scrollTop = chatwindow.scrollHeight;
        }
    }

    componentWillUnmount() {
        this.socket.disconnect();
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
                        {this.state.log.map(item => (
                            <p key={item}>{item}</p>
                        ))}
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
