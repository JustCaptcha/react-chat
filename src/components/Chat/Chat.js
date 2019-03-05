import React, { Component } from 'react';
import {Input, Icon, Segment, Button} from 'semantic-ui-react';
import io from '../../socket';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
        this.inputValue = '';
    }
    setupSocket() {
        // ...
    }

    onInput(event) {
        this.inputValue = event.target.value;
    }

    sendMessage() {
        io.emit('sendMessage', this.inputValue);
    }

    render() {
        return (
            <div className='ChatWrapper'>
                <Segment className='ChatMessagesWindow'>
                    {/* User messages */}
                </Segment>
                <div className='ChatInputSection'>
                    <Input id='chatInput' onChange={(event) => this.onInput(event)}></Input>
                    <Button onClick={() => console.log('Send message')}>Send</Button>
                </div>
            </div>
        );
    }
}


class ChatMode {
    constructor (name) {
        this.chatInput = document.getElementById('chatInput');
        this.chatLog = document.getElementById('chatLog');
        this.name = name;
        this.socket = io({
            query: `name=${name}`,
        });
        
    }

    setupSocket() {
        this.socket.on('polo', () => {
            this.latency = Date.now() - this.startPingTime;
            this.addLine()
        });

        this.socket.on('connect_failed', () => {
            this.socket.close();
        });

        this.socket.on('disconnect', () => {
            this.socket.close();
        });

        this.socket.on('userDisconnected', (data) => {
            this.addSystemMessage(`<b>${data.name.length < 1 ? 'Anonymous' : data.name}</b>: disconnected.`);
        });
        
        this.socket.on('userConnected', (data) => {
            this.addSystemMessage(`<b>${data.name.length < 1 ? 'Anonymous' : data.name}</b>: connected.`);
        });

        this.socket.on('serverGotMessage', (data) => {
            this.addUserMessageLine(data.name, data.message, false);
        });
    }

    setupChat() {
        this.addSystemMessage('Connected to the chat!');
    }

    setupEvents() {
        this.chatInput.addEventListener('keypress', (key) => {
            key = key.which || key.keyCode;

            if (key === 13) {
                this.sendChatMessage(this.chatInput.value);
                this.chatInput.value = '';
            }
        });

        this.chatInput.addEventListener('keyup', (key) => {
            key = key.which || key.keyCode;

            if (key === 27) {
                this.chatInput.value = '';
            }
        });

        
    }

    sendChatMessage(text) {
        if (!text) { return; }
        
        this.socket.emit('userSentMessage', {
            name: this.name,
            message: text,
        });

        this.addUserMessageLine(this.name, text, true);
    }

    addUserMessageLine(name, message, me) {
        let newMessage = document.createElement('li');

        newMessage.className = me ? 'me' : 'friend';
        newMessage.innerHTML = `<b>${name.length < 1 ? 'Anonymous' : name}</b>: ${message}`;

        this.addMessage(newMessage);
    }

    addSystemMessageLine(message) {
        let newMessage = document.createElement('li');

        newMessage.className = 'system';
        newMessage.innerHTML = message;

        this.addMessage(newMessage);
    }

    addMessage(node) {
        if (this.chatLog.childNodes.length > 10) {
            this.chatLog.removeChild(this.chatLog.childNodes[0]);
        }

        this.chatLog.appendChild(node);
    }

    checkLatency() {
        this.startPingTime = Date.now();
        this.socket.emit('marko');
    }
}

export default Chat;