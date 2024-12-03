import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { SupabaseService } from "../_shared/SupabaseService.ts";
import Stripe from "npm:stripe";
import { PaymentIntent } from "../_shared/types.ts";

Deno.serve(async (req) => {
    const supabaseService = new SupabaseService();
    const body = await req.json() as Stripe.Event;

    switch (body.type) {
        case "payment_intent.succeeded": {
            console.info("Payment succeeded!");
            const paymentIntentData = body.data.object as PaymentIntent;

            const { data: cartData, error: cartFetchError } =
                await supabaseService.supabase
                    .from("baskets")
                    .select("variant_id, quantity")
                    .eq("user_id", paymentIntentData.metadata.user_id);
            if (cartFetchError) {
                return new Response(
                    JSON.stringify(cartFetchError),
                    {
                        status: 403,
                        headers: { "Content-Type": "application/json" },
                    },
                );
            }

            const { error: transactionsError } = await supabaseService.supabase
                .from("transactions").insert({
                    user_id: paymentIntentData.metadata.user_id,
                    amount: paymentIntentData.amount / 100,
                    cart: cartData,
                });

            if (transactionsError) {
                return new Response(
                    JSON.stringify(transactionsError),
                    {
                        status: 403,
                        headers: { "Content-Type": "application/json" },
                    },
                );
            }
            break;
        }
        default:
            console.info("Unhandled event type:", body.type);
            return new Response(
                JSON.stringify("Unhandled event type"),
                { headers: { "Content-Type": "application/json" } },
            );
    }

    return new Response(
        JSON.stringify(body),
        { headers: { "Content-Type": "application/json" } },
    );
});
