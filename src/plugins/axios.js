import axios from 'axios'

axios.defaults.baseURL = 'http://localhost/melhorCambioApi/public/api'
// axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
export default axios