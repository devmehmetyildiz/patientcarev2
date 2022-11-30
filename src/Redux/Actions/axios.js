import axios from 'axios';
import Cookies from 'universal-cookie';


// Next we make an 'instance' of it
const instanse = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});
// Where you would set stuff like your 'Authorization' header, etc ...
const cookies = new Cookies();
instanse.defaults.headers.common['Authorization'] = "Bearer  " + cookies.get('patientcareauthtoken')
// Also add/ configure interceptors && all the other cool stuff
export default instanse;