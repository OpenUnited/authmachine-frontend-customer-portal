import React from "react";
import LogoImage from "../../staticfiles/custom-brand/assets/images/open-united-logo.svg"


const Logo = () => {
    return (
        <div className="text-center">
            <a href="https://openunited.com/">
                <img src={LogoImage} alt="AuthMachine" className="logo"/>
            </a>
        </div>
    )
}

export default Logo;