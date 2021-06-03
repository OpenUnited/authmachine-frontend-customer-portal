// import React, {useEffect, useState} from "react";
// import Logo from "../../staticfiles/images/logo.png"
// import {Form, Input, Typography, Button, Alert} from "antd";
// import { Link } from "react-router-dom";
// import SocialAccounts from "../../components/Auth/SocialAccounts";
// import {userActions} from "../../redux/actions/userActions";
// import {connect} from "react-redux";
// import {RegisterStepOneProps} from "../../interfaces/auth/registration";
//
// const Registration = ({message, isRegister, registerStepOne}: RegisterStepOneProps) => {
//     const [formErrors, setFormErrors] = useState(false);
//     const [form] = Form.useForm();
//
//     const onFinish = (values: any) => registerStepOne(values);
//
//     useEffect(() => {
//         let formErrors: import("rc-field-form/es/interface").FieldData[] | { name: string; errors: any[]; }[] = [];
//         try {
//             let errors = JSON.parse(message);
//             let hasError = false;
//             Object.keys(errors).map((key: string) => {
//                 if (errors.hasOwnProperty(key)) {
//                     formErrors.push({
//                         name: key,
//                         errors: [errors[key][0].message],
//                     });
//                     hasError = true;
//                 }
//                 return key;
//             })
//             if (hasError) setFormErrors(true);
//             form.setFields(formErrors);
//         } catch (Exception) {
//             setFormErrors(false);
//         }
//     }, [form, message]);
//
//     return (
//         <div className="form-container auth-form">
//             <div className="form-content">
//                 <div className="text-center">
//                     <img src={Logo} alt="AuthMachine" className="logo" />
//                 </div>
//                 <Typography.Title level={3}>Create Account</Typography.Title>
//                 <Form form={form} onFinish={onFinish}>
//                     <Form.Item name="username"
//                                rules={[{ required: true, message: "Please input your username" }]}>
//                         <Input size="large" placeholder="Username" />
//                     </Form.Item>
//                     <Form.Item name="fullName"
//                                rules={[
//                                    { required: true, message: "Please input your full name" },
//                                    () => ({
//                                         validator(_, value) {
//                                             let fullNameSeparated = value ? value.trim().split(" ") : [];
//                                             if (!value || [2, 3].includes(fullNameSeparated.length)) {
//                                                 return Promise.resolve();
//                                             }
//                                             return Promise.reject("The full name is not valid. " +
//                                                 "Please input the correct value.");
//                                         },
//                                    })
//                                ]}>
//                         <Input size="large" placeholder="Full Name" />
//                     </Form.Item>
//                     <Form.Item name="email"
//                                rules={[{ required: true, message: "Please input your email" }]}>
//                         <Input size="large" placeholder="Email" type="email" />
//                     </Form.Item>
//                     <Form.Item name="password"
//                                rules={[{ required: true, message: "Please input your password" }]}>
//                         <Input.Password size="large" placeholder="Password" />
//                     </Form.Item>
//                     <Form.Item name="confirmPassword"
//                                dependencies={["password"]}
//                                rules={[
//                                    { required: true, message: "Please confirm your password" },
//                                    ({ getFieldValue }) => ({
//                                         validator(_, value) {
//                                             if (!value || getFieldValue("password") === value) {
//                                                 return Promise.resolve();
//                                             }
//                                             return Promise.reject("The two passwords that you entered do not match!");
//                                         },
//                                    })
//                                ]}>
//                         <Input.Password size="large" placeholder="Confirm Password" />
//                     </Form.Item>
//                     <Form.Item>
//                         <Button type="primary" size="large" htmlType="submit">Create Account</Button>
//                     </Form.Item>
//                     {(!formErrors && message !== "") && <Alert style={{marginTop: 20}}
//                                                                message={message}
//                                                                type={isRegister ? "success" : "error"}
//                                                                showIcon />}
//                 </Form>
//
//                 <SocialAccounts type="register" />
//             </div>
//             <ul className="additional-actions">
//                 <li>Already have account? <Link to="/">Log In</Link></li>
//             </ul>
//         </div>
//     );
// };
//
// const mapStateToProps = (state: any) => {
//     const {message, isRegister} = state.user;
//     return {
//         message: message, isRegister
//     }
// };
//
// const mapDispatchToProps = {
//     registerStepOne: userActions.registerStepOne,
// }
//
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Registration);
export {};
