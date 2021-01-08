import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../views/Footer/Footer';
import NavBar from '../views/NavBar/NavBar';

function MainLayout(props) {
    const { children } = props;
    return (
        <div>
            <NavBar />
            { children }
            <Footer />
        </div>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;
