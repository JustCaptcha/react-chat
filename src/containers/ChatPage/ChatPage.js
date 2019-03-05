import React, { Component } from 'react';
import {Input, Button, Icon, Segment} from 'semantic-ui-react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Layout from '../../components/Layout/Layout';
import Login from '../../components/Login/Login';
import Chat from '../../components/Chat/Chat';

class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentWillMount() {
        new Client();
    }

    showChat(props) {
        if(props.global.isAuthorised) {
            return (
                <Chat></Chat>
            )
        }
    }

    showLogin(props) {
        if(!props.global.isAuthorised) {
            return (
                <Login></Login>
            )
        }
    }
    
    render() {
        return (
            <Layout>
                <h1>Chat Page</h1>
                {/* <div className='InputSection'>
                   <Input id='UserInput' onChange={() => console.log('send')}></Input>
                   <Button primary>Send</Button>
                </div> */}
                {this.showChat(this.props)}
                {this.showLogin(this.props)}
            </Layout>
        );
    }
}

class Client {
    constructor () {
        let button = document.getElementById('startButton');
        let userNameInput = document.getElementById('userNameInput');

        // button.onclick = () => {
        //     // do sth
        // };

        // userNameInput.addEventListener('keypress', (e) => {
        //     const key = e.which || e.keyCode;

        //     if (key === 13) { this.startChat(userNameInput.value); }
        // });
    }

    startChat(name) {
        // this.chat = new Chat(this.name);
        
        document.getElementById('chatBox').style.display = 'block';
    }
}


const mapStateToProps = (state) => {
    return {
        global: state.global
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);