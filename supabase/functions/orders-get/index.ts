import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { SupabaseService } from "../_shared/SupabaseService.ts";
import { getBearerToken } from "../_shared/functions.ts";

Deno.serve(async (req) => {
    let supabaseService;
    let userId;

    if (Deno.env.get("IS_DEV")) {
        supabaseService = new SupabaseService();
        userId = "e252c237-5d01-4b50-b7df-c1b8d5c7586b";
    } else {
        const token = getBearerToken(req);
        supabaseService = new SupabaseService(token);
        userId = (await supabaseService.getUser(token)).data.user?.id;
    }

    const supabase = supabaseService.supabase;
    const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select(`
            id,
            user_id,
            amount,
            cart,
            created_at
        `)
        .eq("user_id", userId);

    if (ordersError) {
        return new Response(
            JSON.stringify(ordersError),
            { status: 403, headers: { "Content-Type": "application/json" } },
        );
    }

    const response = await Promise.all(ordersData.map(async (order) => {
        const { data: firstProductData, error: firstProductError } =
            await supabase
                .from("products_variants")
                .select("image_url")
                .eq("id", order.cart[0].variant_id)
                .single();

        if (firstProductError) {
            return new Response(
                JSON.stringify(firstProductError),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }
        return {
            id: order.id,
            date: order.created_at,
            totalPrice: order.amount,
            imageUrl: firstProductData.image_url,
        };
    }));

    return new Response(
        JSON.stringify(response),
        { headers: { "Content-Type": "application/json" } },
    );
});
