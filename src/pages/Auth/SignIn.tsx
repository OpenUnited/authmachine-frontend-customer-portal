import React, {useEffect} from "react";
import Logo from "../../staticfiles/images/logo.png"
import {Form, Input, Checkbox, Button, Alert} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {userActions} from "../../redux/actions/userActions";
import {SignInProps} from "../../interfaces/auth/signIn";
// import SocialAccounts from "../../components/Auth/SocialAccounts";
import {mainActions} from "../../redux/actions/mainActions";
// import BackIcon from "../../components/Icons/BackIcon/BackIcon";
// import CrossIcon from "../../components/Icons/CrossIcon/CrossIcon";
import Switcher from "../../components/Auth/Switcher/Switcher";
import FormInput from "../../components/Auth/FormInput/FormInput";
import '../../components/Auth/Auth.scss';
import MessageLabel from "../../components/Auth/MessageLabel/MessageLabel";

const SignIn = (props: SignInProps) => {
    const {
        login,
        isAuthenticated,
        message,
        setPageTitle,
        setSystemInformation,
        status,
        registerStep,
        changeRegisterStep
    } = props;
    const [form] = Form.useForm();

    useEffect(() => setPageTitle("Sign In"), [setPageTitle]);

    const onFinish = (values: any) => {
        let nextUrl = localStorage.getItem('nextUrl') ? localStorage.getItem('nextUrl') : null;
        login(values, nextUrl);
    };

    useEffect(() => {
        return () => setSystemInformation({
            show: false,
            success: false,
            title: "",
            description: "",
        })
    }, [setSystemInformation]);

    useEffect(() => {
        let nextUrl = new URLSearchParams(props.location.search).get("next");
        if (nextUrl) localStorage.setItem("nextUrl", nextUrl);
    }, [props.location]);

    useEffect(() => {
        if (!isAuthenticated && message !== '') {
            form.setFields([
                {
                    name: 'username',
                    errors: [message],
                },
                {
                    name: 'password',
                    errors: [message],
                },
            ]);
        }
    }, [form, isAuthenticated, message]);

    if (registerStep !== 0) {
        changeRegisterStep(0, '');
    }


    return (
        <div className="form-container auth-form">
            {/*<div className="head-panel">*/}
            {/*    <BackIcon display/>*/}
            {/*    <CrossIcon/>*/}
            {/*</div>*/}
            <div className="form-content">
                <div className="text-center">
                    <img src={Logo} alt="AuthMachine" className="logo"/>
                </div>
                <div>
                    <div className="space-between sign-type-panel">
                        <Switcher link="/" active title="Sign In"/>
                        <Switcher link="/register" title="Register"/>
                    </div>
                    <div style={{marginTop: '30px'}}>
                        <Form form={form} onFinish={onFinish} initialValues={{remember: false}}>
                            {!isAuthenticated && message ?
                                <Alert message={message} type="error" showIcon
                                       style={{marginBottom: 40, borderRadius: 10}}/> : undefined}
                            {
                                status ? <MessageLabel level={"success"}
                                                       message={"Your password was updated successfully. You can log in to the system using your credentials."}/> : undefined
                            }

                            <Form.Item name="username"
                                       rules={[{required: true, message: "Please input your username"}]}>
                                <FormInput label="Username or Email" type="text" name="usernameOrEmail"
                                           placeholder="Username or Email"/>
                            </Form.Item>
                            <Form.Item name="password"
                                       rules={[{required: true, message: "Please input your password"}]}>
                                <FormInput label="Password" type="password" name="password" placeholder="Password"/>
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked" className="space-between">
                                <Checkbox>Remember me</Checkbox>
                                <Link to="/reset-password">Forgot password?</Link>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" size="large" htmlType="submit">Sign in</Button>
                            </Form.Item>
                            <div className="form-context-q">
                                Don't have an Account? <Link to="/register">Register</Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            {/*<div className="additional-actions form-content">*/}
            {/*    <SocialAccounts type="login"/>*/}
            {/*</div>*/}
        </div>
    )
};

const mapStateToProps = (state: any) => {
    const {isAuthenticated, loginMessage, status, registerStep} = state.user;
    const {systemInfo} = state.main;
    return {
        isAuthenticated,
        message: loginMessage,
        systemInfo,
        status,
        registerStep
    }
}

const mapDispatchToProps = {
    login: userActions.login,
    setPageTitle: mainActions.setPageTitle,
    setSystemInformation: mainActions.setSystemInformation,
    changeRegisterStep: userActions.changeStep
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
