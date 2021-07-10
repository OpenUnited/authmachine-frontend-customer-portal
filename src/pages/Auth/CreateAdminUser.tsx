import React, {useEffect, useState} from "react";
import Logo from "../../components/Auth/Logo";
import {Form, Input, Typography, Button, Alert} from "antd";
import {userActions} from "../../redux/actions/userActions";
import {connect} from "react-redux";
import {mainActions} from "../../redux/actions/mainActions";
import {CreateAdminUserProps, createAdminUserValues} from "../../interfaces/auth/createAdminUser";
import {useHistory} from "react-router";
import { Link } from "react-router-dom";

const CreateAdminUser = ({message, operationStatus, createAdminUser, setPageTitle}: CreateAdminUserProps) => {
    const history = useHistory();
    const [formErrors, setFormErrors] = useState(false);
    const [form] = Form.useForm();
    const [counter, setCounter] = useState(5);

    const onFinish = (values: createAdminUserValues) => {
        if (values.password !== values.confirm_password) {
            form.setFields([{
                name: "confirm_password",
                errors: ["Please check the passwords, values don't match"],
            }])
        } else {
            createAdminUser(values);
        }
    }

    useEffect(() => setPageTitle("Create Admin User"), [setPageTitle]);

    useEffect(() => {
        let formErrors = [];
        try {
            let errors = JSON.parse(message);
            if (errors.hasOwnProperty("username")) {
                formErrors.push({
                    name: "username",
                    errors: [errors.username[0].message],
                })
                setFormErrors(true);
            }
            if (errors.hasOwnProperty("email")) {
                formErrors.push({
                    name: "email",
                    errors: [errors.email[0].message],
                })
            }
            if (errors.hasOwnProperty("password")) {
                formErrors.push({
                    name: "password",
                    errors: [errors.password[0].message],
                })
            }
            if (formErrors.length > 0) {
                setFormErrors(true);
                form.setFields(formErrors);
            }
        } catch (Exception) {
            setFormErrors(false);
        }
    }, [form, message]);

    useEffect(() => {
        if (operationStatus) {
            if (counter > 0) {
                const timeout = setTimeout(() => setCounter(counter - 1), 1000);
                return () => clearTimeout(timeout);
            } else {
                history.push("/new-license");
            }
        }

    }, [counter, history, operationStatus]);

    return (
        <div className="form-container">
            <div className="form-content">
                <Logo />
                <Typography.Title level={3}>Create Admin User</Typography.Title>
                <Form form={form} onFinish={onFinish} initialValues={{username: "admin"}}>
                    <Form.Item name="username"
                               rules={[{ required: true, message: "Please input your username" }]}>
                        <Input size="large" placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="email"
                               rules={[{ required: true, message: "Please input your email" }]}>
                        <Input size="large" placeholder="Email" type="email" />
                    </Form.Item>
                    <Form.Item name="password"
                               rules={[{ required: true, message: "Please input your password" }]}>
                        <Input.Password size="large" placeholder="New password" />
                    </Form.Item>
                    <Form.Item name="confirm_password"
                               rules={[{ required: true, message: "Please confirm your password" }]}>
                        <Input.Password size="large" placeholder="Confirm new password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" size="large" htmlType="submit">Create User</Button>
                    </Form.Item>
                    {(!formErrors && message !== "") &&
                    <Alert style={{marginTop: 20}}
                           message={
                               operationStatus ?
                                   <>{message} You will be redirected to the <Link to="/new-license">Request new license</Link> page in {counter} seconds</>: message}
                           type={operationStatus ? "success" : "error"}
                           showIcon />}
                </Form>

            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    const {createAdminUserData} = state.user;
    return {
        message: createAdminUserData.message,
        operationStatus: createAdminUserData.success,
    }
};

const mapDispatchToProps = {
    createAdminUser: userActions.createAdminUser,
    setPageTitle: mainActions.setPageTitle,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateAdminUser);
