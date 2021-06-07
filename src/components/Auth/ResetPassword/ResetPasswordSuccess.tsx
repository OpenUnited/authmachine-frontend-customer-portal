import React, {useState} from "react";
import MessageLabel from "../MessageLabel/MessageLabel";
import SuccessIcon from "../../Icons/SuccessIcon/SuccessIcon";
import {connect} from "react-redux";
// import {Redirect} from "react-router-dom";
import {userActions} from "../../../redux/actions/userActions";


const ResetPasswordSuccess = ({changeMessage}: { changeMessage: (message: string) => void }) => {
    // const [redirect, setRedirect] = useState(false);
    // setTimeout(() => {
    //     setRedirect(true);
    // }, 3000)
    //
    // if (redirect) {
    //     changeMessage('');
    //     return <Redirect to={"/"}/>
    // }

    return (
        <>
            <MessageLabel level="success" message="Congrats, your password has been updated. Redirection in process."/>
            <div className="text-center">
                <SuccessIcon/>
            </div>
        </>
    )
}

const mapDispatchToProps = {
    changeMessage: userActions.changeMessage
}

export default connect(null, mapDispatchToProps)(ResetPasswordSuccess);
