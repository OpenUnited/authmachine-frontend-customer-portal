import userTypes from "../types/userTypes";

import {infoStatusResponse} from '../../interfaces/infoStatusResponse';

const emptyMessage = {
    success: null,
    message: '',
}

type UserState = {
    usersExists: boolean,
    username?: string | null,
    id: number | null,
    avatar?: string | null,
    isAuthenticated: boolean,
    features: string[],
    policies: any[],
    eventsExists: boolean,
    message: string,
    registerStep: number,
    registerMessage: string,
    loginMessage: string,
    activateMessage: string,
    operationStatus: boolean,
    isRegister: boolean,
    activationFirstStepStatus: boolean,
    activationSecondStepStatus: boolean,
    socialLink: string,
    isSuperUser: boolean | null,
    newLicenseData: infoStatusResponse,
    activateLicenseData: infoStatusResponse,
    createAdminUserData: infoStatusResponse,
    userId: string
}

const initialState: UserState = {
    usersExists: true,
    username: null,
    id: null,
    isAuthenticated: false,
    isRegister: false,
    avatar: null,
    features: [],
    policies: [],
    eventsExists: false,
    message: "",
    registerStep: 0,
    registerMessage: "",
    loginMessage: "",
    activateMessage: "",
    operationStatus: false,
    activationFirstStepStatus: false,
    activationSecondStepStatus: false,
    socialLink: "",
    isSuperUser: null,
    newLicenseData: emptyMessage,
    activateLicenseData: emptyMessage,
    createAdminUserData: emptyMessage,
    userId: ""
}

type ActionType = {
    type: string,
    user: { username: string, id: number, avatar: string, isSuperuser: boolean },
    registerStep?: number,
    registerMessage?: string,
    id?: string
    isAuthenticated?: boolean,
    data: any[],
    status: boolean,
    message?: string,
    infoStatus: {status: boolean, message: string},
    step: number
}

const userReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case userTypes.USER_AUTH:
            return {
                ...state,
                isAuthenticated: false,
                isSuperuser: action.user.isSuperuser,
                user: action.user
            }
        case userTypes.USER_AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                username: action.user.username,
                id: action.user.id,
                avatar: action.user.avatar,
                user: action.user,
                isSuperUser: action.user.isSuperuser,
            }
        case userTypes.USER_AUTH_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                isSuperUser: false,
            }
        case userTypes.GET_FEATURES:
            return {
                ...state,
                features: action.data,
                eventsExists: action.data.includes("events"),
            }
        case userTypes.USER_LOGOUT:
            return {
                ...state,
            }
        case userTypes.USER_LOGIN:
            return {
                ...state,
                isAuthenticated: action.status,
                loginMessage: action?.message || "",
                isSuperUser: action.user?.isSuperuser || false,
            }
        case userTypes.USER_REGISTER:
            return {
                ...state,
                isRegister: action.status,
                registerMessage: action.message
            }
        case userTypes.RESET_PASSWORD:
        case userTypes.RECOVERY_PASSWORD:
        case userTypes.FINISH_ACTIVATION:
        case userTypes.SOCIAL_CALLBACK:
            return {
                ...state,
                operationStatus: action.status,
                message: action?.message || "",
            }
        case userTypes.ACTIVATION_FIRST_STEP:
            return {
                ...state,
                activationFirstStepStatus: action.status,
                activateMessage: action?.message || "",
            }
        case userTypes.ACTIVATION_SECOND_STEP:
            return {
                ...state,
                activationSecondStepStatus: action.status,
                activateMessage: action?.message || "",
            }
        case userTypes.GET_POLICIES:
            return {
                ...state,
                policies: action.data,
            }
        case userTypes.SOCIAL_LINK:
            return {
                ...state,
                socialLink: action.message
            }
        case userTypes.DISCONNECT_SOCIAL_ACCOUNT:
            return {
                ...state,
                operationStatus: action.status,
            }
        case userTypes.NEW_LICENSE:
            return {
                ...state,
                newLicenseData: action.infoStatus,
            }
        case userTypes.ACTIVATE_LICENSE:
            return {
                ...state,
                activateLicenseData: action.infoStatus,
            }
        case userTypes.CREATE_ADMIN_USER:
            return {
                ...state,
                createAdminUserData: action.infoStatus,
            }
        case userTypes.USERS_EXISTS:
            return {
                ...state,
                usersExists: action.status
            }
        case userTypes.REGISTER_STEP_ONE:
            return {
                ...state,
                id: action.id,
                registerMessage: action.message,
                registerStep: action.registerStep
            }
        case userTypes.REGISTER_STEP_TWO:
            return {
                ...state,
                id: action.id,
                registerMessage: action.message,
                registerStep: action.registerStep
            }
        case userTypes.REGISTER_STEP_THREE:
            return {
                ...state,
                registerMessage: action.message,
                registerStep: action.registerStep
            }
        case userTypes.CHANGE_MESSAGE:
            return {
                ...state,
                registerMessage: action.message,
            }
        case userTypes.CHANGE_STEP:
            return {
                ...state,
                registerStep: action.registerStep,
                registerMessage: action.registerMessage
            }
        default:
            return state;
    }
};

export default userReducer;
