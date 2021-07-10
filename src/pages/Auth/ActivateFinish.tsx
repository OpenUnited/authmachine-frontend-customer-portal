import React, {useEffect, useState} from "react";
import Logo from "../../components/Auth/Logo";
import {Spin} from "antd";
import {RootState} from "../../redux/reducer";
import {userActions} from "../../redux/actions/userActions";
import {connect} from "react-redux";
import {ActivateFinishProps} from "../../interfaces/auth/activateFinish";
import {mainActions} from "../../redux/actions/mainActions";
import {useHistory} from "react-router";


const ActivateFinish = ({status, message, finishActivation, match, setPageTitle, setSystemInformation}: ActivateFinishProps) => {
    const history = useHistory();
    const {token} = match.params;
    const [loading, setLoading] = useState(!status && message === "");

    useEffect(() => {
        if (!loading) {
            let systemInfo;
            if (status) {
                systemInfo = {
                    description: "Congratulations! Your account has been successfully activated!",
                    title: "Registration is complete!",
                    success: true
                }
            } else {
                systemInfo = {
                    description: message,
                    title: "Registration is not complete!",
                    success: false
                }
            }

            setSystemInformation({
                show: true,
                ...systemInfo,
            })
            history.push("/login");
        }
    }, [loading, message]);

    useEffect(() => {
        setLoading(!status && message === "");
    }, [status, message])


    useEffect(() => setPageTitle("Finish the activation"), [setPageTitle])

    useEffect(() => {
        finishActivation(token);
    }, [finishActivation, token]);

    return (
        <div className="form-container">
            <div className="form-content">
                <Logo />
                <div className="text-center">
                    {loading && <Spin size="large" spinning={loading} />}
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state: RootState) => {
    const {operationStatus, message} = state.user;
    return {
        status: operationStatus,
        message,
    }
};

const mapDispatchToProps = {
    finishActivation: userActions.finishActivation,
    setPageTitle: mainActions.setPageTitle,
    setSystemInformation: mainActions.setSystemInformation,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivateFinish);
