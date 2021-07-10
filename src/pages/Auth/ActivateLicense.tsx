import React, {useEffect} from "react";
import Logo from "../../components/Auth/Logo";
import {Form, Input, Typography, Button, Alert} from "antd";
import { Link } from "react-router-dom";
import {RootState} from "../../redux/reducer";
import {mainActions} from "../../redux/actions/mainActions";
import {connect} from "react-redux";
import { ActivateLicenseProps } from "interfaces/auth/activateLicense";
import {userActions} from "../../redux/actions/userActions";

const ActivateLicense = ({setPageTitle, activateLicenseData, activateLicense}: ActivateLicenseProps) => {
    const [form] = Form.useForm();
    const {success, message} = activateLicenseData;

    const onFinish = (values: { activationCode: string }) => activateLicense(values);

    useEffect(() => setPageTitle("Activate License"), [setPageTitle]);

    return (
        <div className="form-container auth-form">
            <div className="form-content">
                <Logo />
                <Typography.Title level={3}>Activate License</Typography.Title>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item name="activationCode"
                               rules={[{ required: true, message: "Please input activation code" }]}>
                        <Input.TextArea size="large" placeholder="Enter your activation code" />
                    </Form.Item>
                    <Form.Item style={{marginBottom: 0}}>
                        <Button type="primary" size="large" htmlType="submit">Activate License</Button>
                    </Form.Item>
                    {message !== "" && <Alert style={{marginTop: 20}} message={message} type={success ? "success" : "error"} showIcon />}
                </Form>
            </div>
            <ul className="additional-actions">
                <li>Have no code? Request one <Link to="/new-license">here</Link></li>
            </ul>
        </div>
    )
};

const mapStateToProps = (state: RootState) => {
    const {activateLicenseData} = state.user;
    return {
        activateLicenseData,
    }
};

const mapDispatchToProps = {
    setPageTitle: mainActions.setPageTitle,
    activateLicense: userActions.activateLicense,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivateLicense);