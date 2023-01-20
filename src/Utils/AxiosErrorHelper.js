import { useContext } from "react"
import { Redirect, } from "react-router-dom";
import Cookies from "universal-cookie";

export default function AxiosErrorHelper(error) {
    if (error) {
        if (error.code === 'ERR_NETWORK') {
            return { type: 'Error', code: 'ERR_NETWORK', description: 'Server Kapalı yada Erişim Yok' }
        }
        if (error.code === 'ERR_BAD_REQUEST' && error.response) {
            switch (error.response.status) {
                case 401:
                    const localcookies = new Cookies();
                    localcookies.remove("patientcare")
                    if (window.location.pathname !== "/Login") {
                        window.location = `/Login?redirecturl=${window.location.pathname}`
                    }
                    if (window.location.pathname === "/Login") {
                        return { type: 'Error', code: error.code, description: 'Kullanıcı Adı veya şifre Hatalı' }
                    } else {
                        return { type: 'Error', code: error.code, description: 'Lütfen Tekrardan Giriş Yapınız' }
                    }
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
