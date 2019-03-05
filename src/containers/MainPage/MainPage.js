import React, { Component } from 'react';
import Layout from '../../components/Layout/Layout';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <Layout>
                <h1>Main Page!</h1>
                <p>Lorem</p>
            </Layout>
        );
    }
}

export default MainPage;