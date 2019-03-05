import React, { Component } from 'react';
import {Input, Icon, Segment, Form, Button} from 'semantic-ui-react';
// import socket from 'socket.io-client';
import io from '../../socket';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userLogin, setUsername} from '../../store/actions/globalActions';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false
        };
        this.username = '';
    }
    login() {
        console.log('login');
        if(this.username) {
            this.state.auth = true;
            io.emit('login', this.username);
            this.props.setUsername(this.username);
            this.props.userLogin();

        }
    }

    onInput(event) {
        this.username = event.target.value;
    }

    render() {
        return (
            <div className='LoginSection'>
                <Form>
                    <Form.Field>
                        <label>Username</label>
                        <Input name='username' onChange={(event) => this.onInput(event)} onKeyPress={this.login}></Input>
                    </Form.Field>
                    <Button primary onClick={() => this.login()}>Log In</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        global: state.global
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        userLogin: userLogin,
        setUsername: setUsername
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);