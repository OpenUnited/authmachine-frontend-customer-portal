import React, {useEffect, useState} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {history} from "../../redux/helpers/history";
import {RootState} from "../../redux/reducer";
import {connect} from "react-redux";
import SignIn from "../../pages/Auth/SignIn";
import {AuthProps} from "../../interfaces/auth";
import "./Auth.scss";
import ResetPassword from "../../pages/Auth/ResetPassword";
// import Registration from "../../pages/Auth/Registration";
import ActivateAccount from "../../pages/Auth/ActivateAccount";
import ActivateFinish from "../../pages/Auth/ActivateFinish";
import ActivateLicense from "../../pages/Auth/ActivateLicense";
import NewLicense from "../../pages/Auth/NewLicense";
import CreateAdminUser from "../../pages/Auth/CreateAdminUser";
import {landingPagesRouter} from "../../landing-pages-router";
import RegistrationSteps from "../../pages/Auth/RegistrationSteps";

const onlyNotAuthLinks = ["/", "/register", "/login"];


const Auth = ({isAuthenticated, initialLink, usersExists}: AuthProps) => {
    const [isAuth, setIsAuth] = useState(false);
    const {pathname} = history.location;

    useEffect(() => {
        if (isAuthenticated) setIsAuth(true);
    }, [isAuthenticated]);

    if (isAuth && onlyNotAuthLinks.includes(pathname)) {
        return <Redirect to={initialLink === "/" ? "/customer-portal" : initialLink} />
    }

    if (!usersExists && pathname !== "/new-admin-user") {
        return <Redirect to="/new-admin-user" />
    }

    return (
        <div className="auth-page-container">
            <Switch>
                <Route exact path={["/", "/login"]} component={SignIn} />
                <Route exact path="/register" component={RegistrationSteps} />
                <Route exact path="/reset-password" component={ResetPassword} />
                <Route exact path="/activation" component={ActivateAccount} />
                <Route exact path="/activation-with-username" component={ActivateAccount} />
                <Route exact path="/activation/:token" component={ActivateFinish} />
                <Route exact path="/license-activation" component={ActivateLicense} />
                <Route exact path="/new-license" component={NewLicense} />
                <Route exact path="/new-admin-user" component={CreateAdminUser} />

                {/* Landing pages router */}
                {landingPagesRouter.map((page: {path: string, component: any}, index: number) => {
                    let pagePath = `landing-pages/${page.path}`;
                    return <Route exact path={[pagePath, `/${pagePath}`]} key={`landing-${index}`} component={page.component}/>
                })}

            </Switch>
        </div>
    );
}


const mapStateToProps = (state: RootState) => {
    const {isAuthenticated, usersExists} = state.user;
    const {pageLink} = state.main;
    return {
        isAuthenticated,
        initialLink: pageLink,
        usersExists,
    }
};

export default connect(mapStateToProps, null)(Auth);
