import {mongooseConnect} from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);
import {buffer} from 'micro';
import {Order} from "@/models/Order";
export default async function handler(req,res){
    await mongooseConnect();
    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    const endpointSecret = "whsec_13055c7ba6f88901e786c52a61ec61a6b038784e4c6e941ff1800d3d85ed2bed";

    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);

    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const paymentIntentSucceeded = event.data.object;
            console.log(paymentIntentSucceeded);
            const orderId= paymentIntentSucceeded.metadata.orderId;
            const paid = paymentIntentSucceeded.payment_status === 'paid';
            if(paid && orderId){
                await Order.findByIdAndUpdate(orderId,{
                    paid:true,
                })
            }
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    //nice-skill-lush-zippy
    //acct_1NViRjEkxvILSBXO
    // Return a 200 response to acknowledge receipt of the event
    res.status(200).send('ok');
}

export const config = {
    api : {
        bodyParser:false
    }
}