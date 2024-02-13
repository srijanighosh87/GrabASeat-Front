
const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://grabaseatbookingservice.azurewebsites.net/api/'
  : 'https://localhost:7000/api/';

export default BASE_URL;