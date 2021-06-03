import React, {useEffect, useState} from "react";
import {Form} from "antd";
import {Button, Typography} from "antd";
import MessageLabel from "../MessageLabel/MessageLabel";
import {Link} from "react-router-dom";
import FormInput from "../FormInput/FormInput";
import {connect} from "react-redux";
import {userActions} from "../../../redux/actions/userActions";
import {RegisterStepOneProps} from "../../../interfaces/auth/registration";

const RegisterStepOne = ({register, isRegister, message, status}: RegisterStepOneProps) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        register(values);
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item style={{marginTop: 20}} className="text-center">
                <Typography.Text>
                    Let's start with your first name and email address.
                </Typography.Text>
            </Form.Item>
            {message !== "" ? (
                <MessageLabel level={isRegister ? "success" : "error"} message={message}/>
            ) : null}
            <Form.Item style={{marginTop: 20}}
                name="firstName"
                rules={[
                    {required: true, message: "Please input your first name"},
                ]}
            >
                <FormInput label="First name" type="text" name="firstName" placeholder="First name"/>
            </Form.Item>

            <Form.Item style={{marginTop: 20}}
                name="email"
                rules={[{required: true, message: "Please input your email"}]}
            >
                <FormInput label="Email" name="email" placeholder={"Email"} type={"email"}/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" size="large" htmlType="submit">
                    Send Verification Code
                </Button>
            </Form.Item>
            <div className="form-context-q">
                Already Have an Account? <Link to="/">Sign In</Link>
            </div>
        </Form>
    );
}

const mapStateToProps = (state: any) => {
    const {message, isRegister,status} = state.user;
    return {
        message: message,
        isRegister,
        status
    };
};

const mapDispatchToProps = {
    register: userActions.registerStepOne,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterStepOne);
