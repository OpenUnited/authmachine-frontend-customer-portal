import React, {useEffect, useState} from "react";
import {Form, Typography, Button, Alert} from "antd";
import {ResetPasswordStepThreeProps} from "../../../interfaces/auth/resetPassword";
import {RootState} from "../../../redux/reducer";
import {userActions} from "../../../redux/actions/userActions";
import {connect} from "react-redux";
import {mainActions} from "../../../redux/actions/mainActions";
import FormInput from "../FormInput/FormInput";
import PasswordChecker from "../PasswordChecker/PasswordChecker";

const ResetPasswordStepThree = ({
                                    status,
                                    message,
                                    resetId,
                                    resetPasswordStepThree,
                                    changeMessage
                                }: ResetPasswordStepThreeProps) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (status) form.resetFields();
    }, [status, form]);

    const [passwordLevel, setPasswordLevel] = useState('');
    const [passwordCheckerStatus, setPasswordCheckedStatus] = useState(false);

    const onFinish = (values: any) => {
        if (passwordLevel !== 'medium' && passwordLevel !== 'strong') {
            changeMessage("Password is too weak!");
        } else if (values.password !== values.confirmPassword) {
            changeMessage("The passwords entered do not match!");
        } else {
            resetPasswordStepThree({...values, resetId});
        }
    };

    const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
        const passwordPower = checkPassword(e.currentTarget.value);
        setPasswordLevel(passwordPower.toLowerCase());
        setPasswordCheckedStatus(true);
        form.setFieldsValue({password: e.currentTarget.value});
    };

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
        <>
            <Typography.Title level={3}>New Password</Typography.Title>
            {message !== "" ?
                <Alert style={{marginTop: 20, marginBottom: 20}} message={message} type={status ? "success" : "error"}
                       showIcon/> : null}
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="password"
                           rules={[{required: true, message: "Please input your password"}]}>
                    <FormInput label="Password" type="password" name="password" placeholder="Choose password"
                               onChange={onChangePassword}/>
                    <PasswordChecker level={passwordLevel} display={passwordCheckerStatus}/>
                </Form.Item>
                <Form.Item name="confirmPassword"
                           rules={[{required: true, message: "Please confirm a password"}]}>
                    <FormInput label="Confirm password" type="password" name="password" placeholder="Confirm password"/>
                </Form.Item>
                <Form.Item style={{marginBottom: 0}}>
                    <Button type="primary" size="large" htmlType="submit">Submit New Password</Button>
                </Form.Item>
            </Form>
        </>
    )
};

const mapStateToProps = (state: RootState) => {
    const {operationStatus, resetId, message} = state.user;
    return {
        status: operationStatus,
        resetId,
        message
    }
};

const mapDispatchToProps = {
    resetPasswordStepThree: userActions.resetPasswordStepThree,
    setPageTitle: mainActions.setPageTitle,
    changeMessage: userActions.changeMessage
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPasswordStepThree);
