import React, {useState} from "react";
import MessageLabel from "../MessageLabel/MessageLabel";
import SuccessIcon from "../../Icons/SuccessIcon/SuccessIcon";
// import {Redirect} from "react-router-dom";


const RegisterSuccess = () => {
    // const [redirect, setRedirect] = useState(false);
    // setTimeout(() => {
    //     setRedirect(true);
    // }, 3000)
    //
    // if (redirect) {
    //     return <Redirect to={"/"}/>
    // }

    return (
        <>
            <MessageLabel level="success" message="Congrats, your account has been created. Redirection in process."/>
            <div className="text-center">
                <SuccessIcon/>
            </div>
        </>
    )
}


export default RegisterSuccess;
