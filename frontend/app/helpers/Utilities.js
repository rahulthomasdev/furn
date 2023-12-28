import Cookies from "js-cookie";

const getCookie = (cookieName) => {
    return Cookies.get(cookieName);
}

const setCookie = (cookieName) => {
    return Cookies.set(cookieName);
}

export { getCookie, setCookie };
