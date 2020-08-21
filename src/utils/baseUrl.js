
let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:8080';}
else if (process.env.NODE_ENV === 'production') {
    baseUrl = 'http://39.96.204.153';
}
export default baseUrl