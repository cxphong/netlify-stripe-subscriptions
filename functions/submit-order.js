import  axios from 'axios';
var isSubmitting = false;

exports.submitOrder = async (stripeId) => {
  if (isSubmitting) {
    console.log("is submitting");
    return
  }

  isSubmitting = true;
  const API_KEY = process.env.API_KEY
  const API_BASE_URL = process.env.API_URL
  const ENV = process.env.NODE_ENV

  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
       Authorization:  API_KEY
    }
  });
  
  instance.post(API_BASE_URL + "/" + ENV + "/submit", {...{order: params}, ...{stripe_id: stripeId}})
  .then(response => {
    console.log(response.data);
    alert("Thank you very much for your puchase!\nWe will process your order as soon as possible !!")
    isSubmitting = false;
  })
  .catch(error => {
    isSubmitting = false;
    console.error(error);
  });
}

function paramsToObject(entries) {
  const result = {}
  for(const [key, value] of entries) { // each 'entry' is a [key, value] tupple
    if (key && key.length > 0) {
      result[key] = value;
    }
  }
  return result;
}

const queryParameters = new URLSearchParams(window.location.search)
const entries = queryParameters.entries(); 
const params = paramsToObject(entries);
