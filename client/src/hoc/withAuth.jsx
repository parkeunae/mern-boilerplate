/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default (SpecificComponent, option, adminRoute = null) => {
    /*
        option
        null => 아무나 출입이 가능한 페이지
        true => 로그인한 유저만 출입이 가능한 페이지
        false => 로그인한 유저는 출입이 불가능한 페이지
    */

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        const { history } = props;

        useEffect(() => {
            dispatch(auth()).then((response) => {
                // 로그인하지 않은 상태
                if (!response.payload.isAuth) {
                    if (option) {
                        history.push('/login');
                    }
                } else {
                    // 로그인한 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        history.push('/');
                        return;
                    }
                    if (option === false) {
                        history.push('/');
                    }
                }
            });
        }, [dispatch, history]);

        return (
            <SpecificComponent {...props} />
        );
    }

    AuthenticationCheck.propTypes = {
        match: PropTypes.objectOf(PropTypes.object()).isRequired,
        location: PropTypes.objectOf(PropTypes.object()).isRequired,
        history: PropTypes.objectOf(PropTypes.object()).isRequired,
    };

    return AuthenticationCheck;
};
