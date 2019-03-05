import React, { Component } from 'react';
import {Menu} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    
    showUsername() {
    }

    render() {
        return (
            <nav>
                <Menu>
                    <Menu.Item><Link to='/'>Home</Link></Menu.Item>
                    <Menu.Item><Link to='/chat'>Chat</Link></Menu.Item>
                    <Menu.Item position='right'>{this.props.global.username}</Menu.Item>
                </Menu>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        global: state.global
    }
}

export default connect(mapStateToProps)(Navbar);