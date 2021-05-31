import React, {useEffect, useState} from "react";
import Logo from "../../../staticfiles/custom-brand/assets/images/logo.png"
import {Form, Input, Typography, Button, Alert, Row, Col, Select, Modal} from "antd";
import {userActions} from "../../../redux/actions/userActions";
import {connect} from "react-redux";
import {RegistrationProps} from "../../../interfaces/auth/registration";
import {mainActions} from "../../../redux/actions/mainActions";
import "./RegisterLandingPage.scss";
import CustomSocialAccounts from "../CustomSocialAccounts/CustomSocialAccounts";
import Countries from "../countries.json";
import ReactPlayer from 'react-player'
import { Link } from "react-router-dom";

const {Option} = Select;

const RegisterLandingPage = ({message, isRegister, register, setPageTitle}: RegistrationProps) => {
    const [formErrors, setFormErrors] = useState(false);
    const [modal, setModal] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
      values["additionalRegistrationData"] = Object.assign({}, values);
      register(values);
    };

    const showModal = () => {
        setModal(!modal);
        setPlaying(true);
    };

    useEffect(() => setPageTitle("Start Free 30-Day Trial - OpenUnited"), [setPageTitle])

    useEffect(() => {
        let formErrors: import("rc-field-form/es/interface").FieldData[] | { name: string; errors: any[]; }[] = [];
        try {
            let errors = JSON.parse(message);
            let hasError = false;
            Object.keys(errors).map((key: string) => {
                if (errors.hasOwnProperty(key)) {
                    formErrors.push({
                        name: key,
                        errors: [errors[key][0].message],
                    });
                    hasError = true;
                }
                return key;
            })
            if (hasError) setFormErrors(true);
            form.setFields(formErrors);
        } catch (Exception) {
            setFormErrors(false);
        }
    }, [form, message]);

    useEffect(() => {
        if (!playing) setModal(false);
    }, [playing])


    return (
        <div className="form-container register-landing-page-container">
            <div className="header">
                <div className="header-content">
                    <Link to="/">
                        <img src={Logo} alt="AuthMachine" />
                    </Link>
                </div>
            </div>
            <div className="form-content">

                <Row style={{width: "100%"}}>
                    <Col md={14} sm={24} className="t-container">
                        <div className="t-text-container">
                            <Typography.Title level={1}>Change the world<br/>change your life</Typography.Title>
                            <Typography.Title level={3} className="d-sm-none">
                                Contribute to Open Products
                            </Typography.Title>
                            <p style={{fontSize: "1rem"}} className="d-sm-none">Contribute and showcase your skills. Join the
                                communities building the products you love and use.
                            </p>
                            <p style={{fontSize: "1rem"}}>Improve your skills and get the recognition you deserve.<br/>
                                Expand your professional network and discover new career opportunities.</p>
                            <Button className="link-btn pt-sans" onClick={() => showModal()}>
                                Watch explainer video
                            </Button>
                        </div>
                    </Col>
                    <Col md={10} sm={24} className="content-form-wrapper">
                        <div className="f-container">
                            <div className="f-form-container">
                                <div className="text-center">
                                    <Typography.Title level={3} className="raleway">Join Now</Typography.Title>
                                </div>
                                <CustomSocialAccounts />
                                <div className="">
                                    <Typography.Title level={5} className="text-center raleway">
                                        Or enter your details
                                    </Typography.Title>

                                    <Form form={form} onFinish={onFinish}>
                                        <Form.Item name="fullName"
                                                   rules={[
                                                       { required: true, message: "Please input your full name" }
                                                   ]}>
                                            <Input placeholder="Full name" />
                                        </Form.Item>
                                        <Form.Item name="username"
                                                   rules={[
                                                       { required: true, message: "Please input your username" }
                                                   ]}>
                                            <Input placeholder="Username" />
                                        </Form.Item>
                                        <Form.Item name="email"
                                                   rules={[{ required: true, message: "Please input your email" }]}>
                                            <Input placeholder="Email" type="email" />
                                        </Form.Item>
                                        <Form.Item name="country"
                                                   rules={[{ required: true, message: "Please select your country" }]}>
                                            <Select placeholder="Country">
                                                {Countries.map((c: {country: string}, index: number) =>
                                                  <Option value={c.country} key={index}>{c.country}</Option>)}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button size="large" htmlType="submit" className="join-btn">Join Now</Button>
                                        </Form.Item>
                                        {(!formErrors && message !== "") && <Alert style={{marginTop: 20}}
                                                                                   message={message}
                                                                                   type={isRegister ? "success" : "error"}
                                                                                   showIcon />}
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            <Modal
              visible={modal}
              title={null}
              closeIcon={null}
              className="video-modal"
              onCancel={() => setPlaying(false)}
              footer={null}>
                <ReactPlayer url="https://www.youtube.com/watch?v=OWXVryhdoVA"
                             playing={playing}
                             playsinline={true}
                             width="100%" />
            </Modal>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    const {registerMessage, isRegister} = state.user;
    return {
        message: registerMessage, isRegister
    }
};

const mapDispatchToProps = {
    register: userActions.register,
    setPageTitle: mainActions.setPageTitle,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterLandingPage);
