import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useFormik } from 'formik';
import * as yup from 'yup';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [formErrorMessage, setFormErrorMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object().shape({
            email: yup.string()
                .email('Email is invalid')
                .required('Email is required'),
            password: yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),
        onSubmit: (values, {setSubmitting}) => {
            setTimeout(() => {
                const body = {
                    email: values.email,
                    password: values.password,
                };

                dispatch(loginUser(body)).then(response => {
                        if (response.payload.loginSuccess) {
                            props.history.push('/')
                        } else {
                            setFormErrorMessage('Check out your Account or Password again');
                        }
                    })
                    .catch(err => {
                        setFormErrorMessage('Check out your Account or Password again');
                        setTimeout(() => {
                            setFormErrorMessage('');
                        }, 3000);
                    });

                setSubmitting(false);
            }, 500);
        }
    });

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column'}}
                onSubmit={formik.handleSubmit}
            >
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && formik.errors.email}
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && formik.errors.password}
                <br/>
                {formErrorMessage && formErrorMessage}
                <button type="submit" disabled={formik.isSubmitting}>
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginPage;