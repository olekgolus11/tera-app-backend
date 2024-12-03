import Stripe from "npm:stripe";

export interface PaymentIntent extends Stripe.PaymentIntent {
    metadata: {
        user_id: string;
    };
}
