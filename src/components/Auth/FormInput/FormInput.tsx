import React, {useState} from "react";
import "./FormInput.scss"
import {Input} from "antd";
import {FormInputInterface} from "../../../interfaces/auth/formInputInterface";

const FormInput = ({label, placeholder, type, onChange, value}: FormInputInterface) => {
    const [focus, setFocus] = useState(false);
    const [focused, setFocused] = useState(false);
    const labelClass = focus ? "label label-float" : (focused ? ("label-filled label") : ("label"));

    return (
        <div className="float-label" onBlur={() => setFocus(false)} onFocus={() => {
            setFocus(true);
            setFocused(true)
        }}>
            <label className={labelClass}>{label}</label>
            {
                type === 'password' ?
                    <Input.Password size="large" placeholder={placeholder} type={type} onChange={onChange}
                                    style={{borderRadius: 10}}/> :
                    <Input size="large" placeholder={placeholder} value={value} type={type} onChange={onChange}
                           style={{borderRadius: 10}}/>
            }
        </div>
    );
};

export default FormInput;
