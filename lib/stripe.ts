import Stripe from "stripe";
console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY);

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion:"2025-09-30.clover"
});
export default stripe;
