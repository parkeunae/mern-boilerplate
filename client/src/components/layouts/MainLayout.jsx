import React from 'react'
import Footer from '../views/Footer/Footer';
import NavBar from '../views/NavBar/NavBar';

function MainLayout(props) {
    return (
        <div>
            <NavBar />
                {props.children}
            <Footer />
        </div>
    )
}

export default MainLayout
