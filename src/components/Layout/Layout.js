import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Layout.css';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className='Layout'>
                <Navbar />
                <main className='mainContent'>
                    {this.props.children}
                </main>
                <Footer />
            </div>
        );
    }
}

export default Layout;