import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Form, Typography, Button} from "antd";
import {RootState} from "../../../redux/reducer";
import {userActions} from "../../../redux/actions/userActions";
import {ResetPasswordStepOneProps} from "../../../interfaces/auth/resetPassword";
import {mainActions} from "../../../redux/actions/mainActions";
import FormInput from "../FormInput/FormInput";
import {Link} from "react-router-dom";
import MessageLabel from "../MessageLabel/MessageLabel";


const ResetPasswordStepOne = ({status, resetPasswordStepOne, message}: ResetPasswordStepOneProps) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => resetPasswordStepOne(values);

    useEffect(() => {
        if (status) {
            form.resetFields();
        }
    }, [status, form]);

    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item className="text-center">
                <Typography.Text>
                    In order to reset your password, <br/>
                    you need to enter your username or email.
                </Typography.Text>
            </Form.Item>
            <Typography.Title level={3} style={{marginBottom: 25}}>Password Recovery</Typography.Title>
            {message !== "" ? (
                <MessageLabel level="error" message={message}/>
            ) : null}
            <Form.Item name="username"
                       rules={[{required: true, message: "Please input your username"}]}>

                <FormInput label="Username or Email" type="text" name="username"
                           placeholder="Username or Email"/>
            </Form.Item>
            <Form.Item>
                <div className="form-context-q">
                    Don't have an account? <Link to="/register">Register</Link>
                </div>
            </Form.Item>

            <Form.Item style={{marginBottom: 0}}>
                <Button type="primary" size="large" htmlType="submit">Confirm</Button>
            </Form.Item>
        </Form>
    )
}

const mapStateToProps = (state: RootState) => {
    const {operationStatus, message} = state.user;
    return {
        status: operationStatus,
        message
    }
};

const mapDispatchToProps = {
    resetPasswordStepOne: userActions.resetPasswordStepOne,
    setPageTitle: mainActions.setPageTitle,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPasswordStepOne);
