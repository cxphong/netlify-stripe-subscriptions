import  axios from 'axios';
var isSubmitting = false;

// exports.submitOrder = async (stripeId) => {
exports.handler = async (_event, context) => {
  // console.log(_event);
  let data =  _event.body;
  
  if (isSubmitting) {
    console.log("is submitting");
    return
  }

  isSubmitting = true;
  const API_KEY = process.env.API_KEY
  const API_BASE_URL = process.env.API_URL

  try {
    const instance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        Authorization: API_KEY
        }
    });
    
    const response = await instance.post(API_BASE_URL + "/" + "production" + "/submit", {
      order: data.params,
      stripe_id: data.stripeId
    });
  
    console.log(response.data);
    alert("Thank you very much for your purchase!\nWe will process your order as soon as possible!!");
    isSubmitting = false;
  } catch (error) {
    isSubmitting = false;
    console.error(error);
  }

  return {
    statusCode: 200,
    // body: JSON.stringify(link.url),
  };
  
}

