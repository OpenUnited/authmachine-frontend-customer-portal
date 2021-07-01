import React, {useEffect} from "react";
import Logo from "../../staticfiles/images/logo.png";
import StepWidget from "../../components/Auth/StepSwitcher/StepSwitcher";
import Switcher from "../../components/Auth/Switcher/Switcher";
import {RegistrationStepsProps} from "../../interfaces/auth/registration";
import {mainActions} from "../../redux/actions/mainActions";
import {connect} from "react-redux";
// import CrossIcon from "../../components/Icons/CrossIcon/CrossIcon";
// import BackIcon from "../../components/Icons/BackIcon/BackIcon";
// import SocialAccounts from "../../components/Auth/SocialAccounts";
import "../../components/Auth/Auth.scss";
import RegisterStepOne from "../../components/Auth/RegistrationSteps/RegisterStepOne";
import RegisterStepTwo from "../../components/Auth/RegistrationSteps/RegisterStepTwo";
import RegisterStepThree from "../../components/Auth/RegistrationSteps/RegisterStepThree";
import RegisterSuccess from "../../components/Auth/RegistrationSteps/RegisterSuccess";
import {userActions} from "../../redux/actions/userActions";

const RegistrationSteps = ({step, setPageTitle, changeMessage, location}: RegistrationStepsProps) => {

    useEffect(() => {
        setPageTitle("Register");
        changeMessage('');
    }, [setPageTitle]);

    const stepForms = {
        0: <RegisterStepOne/>,
        1: <RegisterStepTwo/>,
        2: <RegisterStepThree/>,
        3: <RegisterSuccess/>
    }

    useEffect(() => {
        let nextUrl = new URLSearchParams(location.search).get("next");
        if (nextUrl) localStorage.setItem("nextUrl", nextUrl);
    }, [location]);

    const getStepForm = (step: number) => {
        return stepForms[step];
    }

    return (
        <div className="form-container auth-form">
            {/*<div className="head-panel">*/}
            {/*    <BackIcon display/>*/}
            {/*    <CrossIcon/>*/}
            {/*</div>*/}
            <div className="form-content">
                <a href={"https://openunited.com/"}>
                    <div className="text-center">
                        <img src={Logo} alt="AuthMachine" className="logo"/>
                    </div>
                </a>
                <div>
                    <div className="space-between sign-type-panel">
                        <Switcher link="/" title="Sign In"/>
                        <Switcher link="/register" active title="Register"/>
                    </div>
                    <StepWidget step={step} first={step === 1 || step === 2 || step === 3}
                                second={step === 2 || step === 3} third={step === 3}/>
                    <div style={{marginTop: '30px'}}>
                        {getStepForm(step)}
                    </div>

                </div>
            </div>
            {/*<div className="additional-actions form-content">*/}
            {/*    <SocialAccounts type="register"/>*/}
            {/*</div>*/}
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const {registerStep, isRegister} = state.user;
    return {
        step: registerStep,
        isRegister
    }
}

const mapDispatchToProps = {
    setPageTitle: mainActions.setPageTitle,
    changeMessage: userActions.changeMessage
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationSteps);
