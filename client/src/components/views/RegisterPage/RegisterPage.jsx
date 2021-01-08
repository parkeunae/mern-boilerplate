import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: yup.object().shape({
            email: yup.string()
                .email('Email is invalid')
                .required('Email is required'),
            name: yup.string()
                .required('Name is required'),
            password: yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            confirmPassword: yup.string()
                .oneOf([yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
        }),
        onSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                const { email, name, password } = values;
                const body = {
                    email,
                    name,
                    password,
                };

                dispatch(registerUser(body)).then((response) => {
                    if (response.payload.success) {
                        props.history.push('/login');
                    } else {
                        alert(response.payload.errmsg);
                    }
                });

                setSubmitting(false);
            }, 500);
        },
    });

    return (
        <div
            style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh',
            }}
        >
            <form
                style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={formik.handleSubmit}
            >
                <label htmlFor="emailInput">
                    Email
                </label>
                <input
                    id="emailInput"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && formik.errors.email}

                <label htmlFor="nameInput">
                    name
                </label>
                <input
                    id="nameInput"
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name && formik.errors.name}

                <label htmlFor="passwordInput">
                    Password
                </label>
                <input
                    id="passwordInput"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && formik.errors.password}

                <label htmlFor="confirmInput">
                    Confirm Password
                </label>
                <input
                    id="confirmInput"
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {
                    formik.errors.confirmPassword
                    && formik.touched.confirmPassword
                    && formik.errors.confirmPassword
                }
                <br />
                <button type="submit" disabled={formik.isSubmitting}>
                    회원 가입
                </button>
            </form>
        </div>
    );
}

RegisterPage.propTypes = {
    history: PropTypes.objectOf(PropTypes.object()).isRequired,
};

export default RegisterPage;
