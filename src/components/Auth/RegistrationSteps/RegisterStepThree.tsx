import React, {useEffect, useState} from "react";
import {Form, Input} from "antd";
import {Button} from "antd";
import MessageLabel from "../MessageLabel/MessageLabel";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {userActions} from "../../../redux/actions/userActions";
import {RegisterStepThreeProps} from "../../../interfaces/auth/registration";
import PrivacyPolicies from "../PrivacyPolicies/PrivacyPolicies";
import FormInput from "../FormInput/FormInput";
import PasswordChecker from "../PasswordChecker/PasswordChecker";


const RegisterStepThree = ({register, isRegister, message, changeMessage, id, status}: RegisterStepThreeProps) => {
    const [form] = Form.useForm();
    const [passwordLevel, setPasswordLevel] = useState('');
    const [passwordCheckerStatus, setPasswordCheckedStatus] = useState(false);
    const [msg, setMsg] = useState(true);

    const onFinish = (values: any) => {
        if (passwordLevel !== 'medium' && passwordLevel !== 'strong') {
            changeMessage("Password is too weak!");
        } else if (values.password !== values.confirmPassword) {
            changeMessage("The passwords entered do not match!");
        } else if (!checkUsername(values.username)) {
            changeMessage('Username should contain only lowercase letters and digits');
        } else {
            let nextUrl = localStorage.getItem('nextUrl') ? localStorage.getItem('nextUrl') : null;
            register({username: values.username, password: values.password, userId: id}, nextUrl);
        }
    };

    const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
        const passwordPower = checkPassword(e.currentTarget.value);
        setPasswordLevel(passwordPower.toLowerCase());
        setPasswordCheckedStatus(true);
        form.setFieldsValue({password: e.currentTarget.value});
    };

    const onChangeUsername = (e: React.FormEvent<HTMLInputElement>) => {
        const username = e.currentTarget.value;
        if (!checkUsername(username)) {
            if(msg) setMsg(false);
            changeMessage('Username should contain only lowercase letters and digits');
        }
        else {
            changeMessage('');
            form.setFieldsValue({username});
        }
    }

    const checkUsername = (username: string) => {
        return /^[a-z0-9]*$/.test(username);
    }

    const checkPassword = (password: string) => {
        switch (true) {
            case checkStrong(password):
                return "strong";
            case checkMedium(password):
                return "medium";
            case checkWeak(password):
                return "weak";
            default:
                return "too-weak";
        }
    }

    const checkWeak = (password: string) => {
        return /(?=.*[a-zA-Z0-9])(?=.{4,})/.test(password);
    };

    const checkMedium = (password: string) => {
        return /(?=.*[0-9])(?=.*[a-zA-Z])(?=.{6,})/.test(password);
    };

    const checkStrong = (password: string) => {
        return /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>_-])(?=.{8,})/.test(password);
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item>
                {message !== "" ? <MessageLabel level='error' message={message}/> : msg ?
                    <MessageLabel level="success" message="Email verified! Please set your username and password."/>
                    : null}
            </Form.Item>
            <Form.Item name="username"
                       rules={[{required: true, message: "Please input username"}]}>
                <FormInput label="Choose username" type="text" value={form.getFieldValue('username')} name="username" placeholder="Choose username"
                           onChange={onChangeUsername}/>
            </Form.Item>
            <Form.Item name="password"
                       rules={[{required: true, message: "Please input your password"}]}>
                <FormInput label="Password" type="password" value={form.getFieldValue('password')} name="password" placeholder="Choose password"
                           onChange={onChangePassword}/>
                <PasswordChecker level={passwordLevel} display={passwordCheckerStatus}/>
            </Form.Item>
            <Form.Item name="confirmPassword"
                       rules={[{required: true, message: "Please confirm a password"}]}>
                <FormInput label="Confirm password" value={form.getFieldValue('confirmPassword')} type="password" name="confirmPassword" placeholder="Confirm password"/>
            </Form.Item>

            <PrivacyPolicies form={form} formType="activation"/>

            <Form.Item style={{marginBottom: 20}}>
                <Button type="primary" size="large" htmlType="submit">Submit</Button>
            </Form.Item>
            <div className="form-context-q">
                Already Have an Account?<Link to="/">Sign In</Link>
            </div>
        </Form>
    );

};

const mapStateToProps = (state: any) => {
    const {message, isRegister, id, status} = state.user;
    return {
        message: message,
        isRegister,
        id,
        status
    };
};

const mapDispatchToProps = {
    register: userActions.registerStepThree,
    changeMessage: userActions.changeMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterStepThree);
