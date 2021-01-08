import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import USER_SERVER from '../../../utils/Config';
import MainLayout from '../../layouts/MainLayout';

function LandingPage(props) {
    const onClickHandler = () => {
        axios.get(`${USER_SERVER}/logout`)
            .then((response) => {
                if (response.data.success) {
                    props.history.push('/login');
                } else {
                    alert('로그아웃 실패');
                }
            });
    };

    return (
        <MainLayout>
            <div
                style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh',
                }}
            >
                <h1>시작 페이지</h1>

                <button type="button" onClick={onClickHandler}>
                    로그아웃
                </button>
            </div>
        </MainLayout>
    );
}

LandingPage.propTypes = {
    history: PropTypes.objectOf(PropTypes.object()).isRequired,
};

export default LandingPage;
