import React, {useEffect} from "react";
import Logo from "../../components/Auth/Logo";
import {Form, Input, Typography, Button, Steps, Alert} from "antd";
import { Link } from "react-router-dom";
import {CheckCircleOutlined, SolutionOutlined, UserOutlined} from "@ant-design/icons";
import {RootState} from "../../redux/reducer";
import {userActions} from "../../redux/actions/userActions";
import {connect} from "react-redux";
import {ActivateAccountProps} from "../../interfaces/auth/activateAccount";
import PrivacyPolicies from "../../components/Auth/PrivacyPolicies/PrivacyPolicies";
import {mainActions} from "../../redux/actions/mainActions";

const { Step } = Steps;

const ActivateAccount = (props: ActivateAccountProps) => {
    const {activationFirstStepStatus, activationSecondStepStatus, message, match, setPageTitle} = props;
    const isActivationWithNamePath = match.path === "/activation-with-username";
    const [firstForm] = Form.useForm();
    const [secondForm] = Form.useForm();
    const [current, setCurrent] = React.useState(0);

    useEffect(() => {
        if (activationFirstStepStatus) setCurrent(1);
    }, [activationFirstStepStatus]);

    useEffect(() => setPageTitle("Activate Account"), [setPageTitle]);

    useEffect(() => {
        if (activationSecondStepStatus) setCurrent(2);
    }, [activationSecondStepStatus]);

    const onFirstFinish = (values: any) => props.activationFirstStep(values);

    const onSecondFinish = (values: any) => {
        if (values.password !== values.confirmPassword) {
            secondForm.setFields([{
                name: "confirmPassword",
                errors: ["Please check the passwords, values don't match"],
            }])
        } else {
            props.activationSecondStep(values);
        }
    };

    return (
        <div className="form-container auth-form">
            <div className="form-content">
                <Logo />
                <Typography.Title level={3}>Activate Account</Typography.Title>
                <Steps style={{marginBottom: 20}} current={current}>
                    <Step title="Activation" icon={<UserOutlined />} />
                    <Step title="Verification" icon={<SolutionOutlined />} />
                    <Step title="Finish" icon={<CheckCircleOutlined />} />
                </Steps>
                {current === 0 && (
                    <Form form={firstForm} onFinish={onFirstFinish}>
                        {isActivationWithNamePath && (
                            <Form.Item name="username"
                                       rules={[{ required: true, message: "Please input username" }]}>
                                <Input size="large" placeholder="Username" />
                            </Form.Item>
                        )}
                        <Form.Item name="code"
                                   rules={[{ required: true, message: "Please input activation code" }]}>
                            <Input size="large" placeholder="Activation Code" />
                        </Form.Item>
                        <Form.Item style={{marginBottom: 0}}>
                            <Button type="primary" size="large" htmlType="submit">Activate Account</Button>
                        </Form.Item>
                        {(!activationFirstStepStatus && message !== "") && <Alert style={{marginTop: 20}} message={message} type="error" showIcon />}
                    </Form>
                )}
                {current === 1 && (
                    <Form form={secondForm} onFinish={onSecondFinish}>
                        <Form.Item name="email"
                                   rules={[{ required: true, message: "Please input username" }]}>
                            <Input size="large" placeholder="Email" />
                        </Form.Item>
                        <Form.Item name="phone"
                                   rules={[{ required: true, message: "Please input your phone" }]}>
                            <Input size="large" placeholder="Phone number" />
                        </Form.Item>
                        <Form.Item name="password"
                                   rules={[{ required: true, message: "Please input your password" }]}>
                            <Input.Password size="large" placeholder="Password" />
                        </Form.Item>
                        <Form.Item name="confirmPassword"
                                   rules={[{ required: true, message: "Please confirm a password" }]}>
                            <Input.Password size="large" placeholder="Confirm Password" />
                        </Form.Item>

                        <PrivacyPolicies form={secondForm} formType="activation" />

                        <Form.Item style={{marginBottom: 0}}>
                            <Button type="primary" size="large" htmlType="submit">Submit</Button>
                        </Form.Item>
                        {(!activationSecondStepStatus && message !== "") && <Alert style={{marginTop: 20}} message={message} type="error" showIcon />}
                    </Form>
                )}
                {current === 2 && (
                    <Alert
                      message="Finish the registration!"
                      description={message}
                      type="info"
                      showIcon
                    />
                )}
            </div>
            <ul className="additional-actions">
                <li>Got activation code without username? <Link to={`/${isActivationWithNamePath ? "activation" : "activation-with-username"}`}>Activate account</Link></li>
            </ul>
        </div>
    )
};

const mapStateToProps = (state: RootState) => {
    const {activationFirstStepStatus, activationSecondStepStatus, activateMessage} = state.user;
    return {
        activationFirstStepStatus,
        activationSecondStepStatus,
        message: activateMessage,
    }
};

const mapDispatchToProps = {
    activationFirstStep: userActions.activationFirstStep,
    activationSecondStep: userActions.activationSecondStep,
    setPageTitle: mainActions.setPageTitle,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivateAccount);
