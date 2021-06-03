interface ResetPasswordProps {
    step: number,
    setPageTitle: (pageTitle: string) => void,
    changeMessage: (message: string) => void,
    changeStep: (step: number, message: string) => void
}

interface ResetPasswordStepOneProps {
    status: boolean,
    message: string,
    resetPasswordStepOne: (values: { username: string }) => void,
}

interface ResetPasswordStepTwoProps {
    status: boolean,
    message: string,
    resetId: string,
    resetPasswordStepTwo: (values: { code: string, resetId: string }) => void,
    changeResetStep: (step: number, message: string) => void,
    changeMessage: (message: string) => void
}

interface ResetPasswordStepThreeProps {
    status: boolean,
    message: string,
    resetId: string,
    resetPasswordStepThree: (values: { password: string, confirmPassword: string, resetId: string }) => void
    changeMessage: (message: string) => void
}

export type {ResetPasswordProps, ResetPasswordStepOneProps, ResetPasswordStepTwoProps, ResetPasswordStepThreeProps};
