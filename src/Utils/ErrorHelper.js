
export function axiosErrorHelper(error) {
    if (error) {
        if (error.code === 'ERR_NETWORK') {
            return { type: 'Error', code: 'ERR_NETWORK', description: 'Server Kapalı yada Erişim Yok' }
        }
        if (error.code === 'ERR_BAD_REQUEST' && error.response) {
            switch (error.response.status) {
                case 401:
                    if (window.location.pathname !== "/Login") {
                        window.location = '/Login?redirectUrl=' + window.location.pathname
                    }
                    return { type: 'Error', code: error.code, description: 'Kullanıcı Adı veya şifre Hatalı' }
                case 404:
                    return { type: 'Error', code: error.code, description: 'URL BULUNAMADI' }
                case 400:
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
    return (
        (error && error.response && error.response.data) ||
        (error && error.response) ||
        error
    )
}