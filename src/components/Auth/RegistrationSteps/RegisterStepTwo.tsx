import React, {useState} from "react";
import {Form, Input} from "antd";
import {Button} from "antd";
import MessageLabel from "../MessageLabel/MessageLabel";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {userActions} from "../../../redux/actions/userActions";
import {RegisterStepTwoProps} from "../../../interfaces/auth/registration";


const RegisterStepTwo = ({
                             id,
                             register,
                             isRegister,
                             message,
                             changeMessage,
                             status,
                             changeStep,
                             activationFailed,
                             attempt
                         }: RegisterStepTwoProps) => {
    const [form] = Form.useForm();
    const [code, setCode] = useState('      ');

    const onFinish = () => {
        if (validate(code)) {
            register({activationCode: code, id, attempt});
        } else {
            changeMessage("Activation code is incorrect!");
        }
    };

    const autoFocus = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.nextElementSibling) {
            (e.currentTarget.nextElementSibling as HTMLInputElement).focus();
        }
    };

    const inputChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length > 1) {
            changeCode(e.currentTarget.value[0], e.currentTarget.id);
        } else if (e.currentTarget.value.length === 0 || e.currentTarget.value < '0' || e.currentTarget.value > '9') {
            changeCode(' ', e.currentTarget.id);
        } else {
            changeCode(e.currentTarget.value, e.currentTarget.id);
            autoFocus(e);
        }
    };

    const changeCode = (value: string, id: string) => {
        setCode(code.substr(0, Number.parseInt(id)) + value + code.substr(Number.parseInt(id) + 1));
        form.setFieldsValue({code: code});
    }

    const validate = (value: string) => {
        return value.length === 6 && Number.parseInt(value);
    };

    return (
        <Form form={form} onFinish={onFinish}>
            {message !== "" ? (
                <MessageLabel level={isRegister ? "success" : "error"} message={message}/>
            ) : <MessageLabel
                level="info"
                message="Please check your email for six-digit code"
            />}
            <Form.Item name="code"
                       rules={[{required: true, message: "Type your code"}]}>
                <div className="form-title">Six-digit code</div>

                <Form.Item className="space-between">
                    <Input id={"0"} type="number" autoFocus={true} size="large" className="digit-field"
                           onChange={inputChange} value={code[0]}/>
                    <Input id={"1"} type="number" size="large" className="digit-field" onChange={inputChange}
                           value={code[1]}/>
                    <Input id={"2"} type="number" size="large" className="digit-field" onChange={inputChange}
                           value={code[2]}/>
                    <Input id={"3"} type="number" size="large" className="digit-field" onChange={inputChange}
                           value={code[3]}/>
                    <Input id={"4"} type="number" size="large" className="digit-field" onChange={inputChange}
                           value={code[4]}/>
                    <Input id={"5"} type="number" size="large" className="digit-field" onChange={inputChange}
                           value={code[5]}/>
                </Form.Item>

                <div className="form-context-q">
                    Didn’t recieve the code? <Link to="/register" onClick={() => {
                        changeStep(0, '');
                        activationFailed(id);
                }}>Resend it</Link>
                </div>

            </Form.Item>
            <Form.Item style={{marginBottom: 0}}>
                <Button type="primary" size="large" htmlType="submit">Verify</Button>
            </Form.Item>
        </Form>
    );

};

const mapStateToProps = (state: any) => {
    const {message, isRegister, id, status, codeAttempt} = state.user;
    return {
        message: message,
        isRegister,
        id,
        status,
        attempt: codeAttempt
    };
};

const mapDispatchToProps = {
    register: userActions.registerStepTwo,
    changeMessage: userActions.changeMessage,
    changeStep: userActions.changeStep,
    activationFailed: userActions.activationFailed
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterStepTwo);
