import  axios from 'axios';
var isSubmitting = false;

// exports.submitOrder = async (stripeId) => {
exports.handler = async (_event, context) => {
  console.log(_event);
  if (isSubmitting) {
    console.log("is submitting");
    return
  }

  isSubmitting = true;
  const API_KEY = process.env.API_KEY
  const API_BASE_URL = process.env.API_URL
  const ENV = process.env.NODE_ENV

  try {
    const response = await instance.post(API_BASE_URL + "/" + ENV + "/submit", {
      order: params,
      stripe_id: ""
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

