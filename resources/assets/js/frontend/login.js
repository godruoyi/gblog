export const requiredAuthorization = ({code, state}) => {
    if (code && state == 'godruoyi') {
        alert(1)
    }
}

export const getAccessToken = (code) => {

}

export const checkAuthorizationAndRedirect = () => {

}
