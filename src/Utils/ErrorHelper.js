
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
                    return { type: 'Error', code: 'AUTH_NETWORK', description: 'Kullanıcı Adı veya şifre Hatalı' }
            }
        }
    }
    return (
        (error && error.response && error.response.data) ||
        (error && error.response) ||
        error
    )
}