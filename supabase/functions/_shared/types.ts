import { Stripe } from "https://esm.sh/stripe@17.4.0";

export interface PaymentIntent extends Stripe.PaymentIntent {
    metadata: {
        user_id: string;
    };
}
