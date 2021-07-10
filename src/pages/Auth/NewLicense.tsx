import React, {useEffect} from "react";
import Logo from "../../components/Auth/Logo";
import {Form, Input, Typography, Button, Alert, Radio} from "antd";
import { Link } from "react-router-dom";
import {RootState} from "../../redux/reducer";
import {mainActions} from "../../redux/actions/mainActions";
import {connect} from "react-redux";
import {userActions} from "../../redux/actions/userActions";
import {newLicenseProps, newLicenseValues} from "../../interfaces/auth/newLicense";

const NewLicense = ({setPageTitle, requestNewLicense, newLicenseData}: newLicenseProps) => {
    const [form] = Form.useForm();
    const {success, message} = newLicenseData;

    const onFinish = (values: newLicenseValues) => requestNewLicense(values);

    useEffect(() => setPageTitle("Request New License"), [setPageTitle]);

    return (
        <div className="form-container auth-form">
            <div className="form-content">
                <Logo />
                <Typography.Title level={3}>Request new license</Typography.Title>
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item name="licenseType"
                               className="fs-16"
                               label="License type"
                               rules={[{ required: true, message: "Please select license type" }]}>
                        <Radio.Group size="large">
                            <Radio value="authmachine-developer-edition">AuthMachine Developer Edition</Radio>
                            <Radio value="authmachine-startup-edition">AuthMachine Startup Edition</Radio>
                            <Radio value="authmachine-business-edition">AuthMachine Business Edition</Radio>
                            <Radio value="authmachine-enterprise-edition">AuthMachine Enterprise Edition</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="endUserType"
                               className="fs-16"
                               label="End user type"
                               rules={[{ required: true, message: "Please select end user type" }]}>
                        <Radio.Group>
                            <Radio value="individual">Individual</Radio>
                            <Radio value="organisation">Organisation</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="endUserName"
                               rules={[{ required: true, message: "Please input end user name" }]}>
                        <Input size="large" placeholder="End user name" />
                    </Form.Item>
                    <Form.Item name="email"
                               rules={[{ required: true, message: "Please input email" }]}>
                        <Input size="large" type="email" placeholder="Enter end user email" />
                    </Form.Item>
                    <Form.Item style={{marginBottom: 0}}>
                        <Button type="primary" size="large" htmlType="submit">Submit license request</Button>
                    </Form.Item>
                    {(message !== "") && <Alert style={{marginTop: 20}} message={message} type={success ? "success" : "error"} showIcon />}
                </Form>
            </div>
            <ul className="additional-actions">
                <li>Already have a license code? <Link to="/license-activation">Activate license</Link></li>
            </ul>
        </div>
    )
};

const mapStateToProps = (state: RootState) => {
    const {newLicenseData} = state.user;
    return {
        newLicenseData,
    }
};

const mapDispatchToProps = {
    setPageTitle: mainActions.setPageTitle,
    requestNewLicense: userActions.requestNewLicense,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewLicense);