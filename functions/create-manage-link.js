const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require('./utils/fauna');

exports.handler = async (_event, context) => {
  const { user } = context.clientContext;

  // const result = await faunaFetch({
  //   query: `
  //     query ($netlifyID: ID!) {
  //       getUserByNetlifyID(netlifyID: $netlifyID) {
  //         stripeID
  //       }
  //     }
  //   `,
  //   variables: {
  //     netlifyID: user.sub,
  //   },
  // });

  //console.log(result);

  // const { stripeID } = result.data.getUserByNetlifyID;

  const customer = await stripe.customers.create({ email: "caoxuanphong.khtn@gmail.com" });
  const link = await stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: process.env.URL,
  });

  return {
    statusCode: 200,
    body: customer.id,
  };
};
