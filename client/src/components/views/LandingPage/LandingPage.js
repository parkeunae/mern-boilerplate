import React from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../../utils/Config';

function LandingPage(props) {
    const onClickHandler = () => {
        axios.get(`${USER_SERVER}/logout`)
            .then(response => {
                if (response.data.success) {
                    props.history.push('/login')
                } else {
                    alert('로그아웃 실패')
                }
            })
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <h1>시작 페이지</h1>

            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    );
}

export default LandingPage;