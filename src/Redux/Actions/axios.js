import axios from 'axios';
import cookies from 'universal-cookie';


// Next we make an 'instance' of it
const instanse = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
});
// Where you would set stuff like your 'Authorization' header, etc ...
const localcookies = new cookies();
instanse.defaults.headers.common['Authorization'] = "Bearer  " + localcookies.get('patientcare')
// Also add/ configure interceptors && all the other cool stuff
export default instanse;