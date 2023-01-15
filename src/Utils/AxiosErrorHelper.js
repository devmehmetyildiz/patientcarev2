import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { AuthContext } from "../Provider/AuthProvider"
import React from 'react'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
export default function AxiosErrorHelper(error) {


    if (error) {
        if (error.code === 'ERR_NETWORK') {
            return { type: 'Error', code: 'ERR_NETWORK', description: 'Server Kapalı yada Erişim Yok' }
        }
        if (error.code === 'ERR_BAD_REQUEST' && error.response) {
            switch (error.response.status) {
                case 401:
                    console.log("401geldim")
                    console.log('window.location.pathname: ', window.location.pathname);
                    const localcookies = new Cookies();
                    localcookies.remove("patientcare")
                    if (window.location.pathname !== "/Login") {
                        history.push({
                            pathname: '/Login',
                            search: `?redirectUrl=${window.location.pathname}`
                        });
                    }
                    return { type: 'Error', code: error.code, description: 'Kullanıcı Adı veya şifre Hatalı' }
                case 404:
                    return { type: 'Error', code: error.code, description: 'URL BULUNAMADI' }
                case 400:
                    console.log('error: ', error);
                    return { type: 'Error', code: error.code, description: 'EKSİK DATA' }
                case 500:
                    return { type: 'Error', code: error.code, description: 'SERVER HATASI' }
                case 403:
                    return { type: 'Error', code: error.response.data.status, description: error.response.data.massage }
                default:
                    return { type: 'Error', code: error.code, description: 'Tanımsız hata' }
            }
        }
    }

    return null
}
