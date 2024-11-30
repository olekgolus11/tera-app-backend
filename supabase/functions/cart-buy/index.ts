import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { SupabaseService } from "../_shared/SupabaseService.ts";
import { getBearerToken } from "../_shared/functions.ts";

interface ProductCart {
    product: {
        id: string;
        name: string;
        brand: string;
        price: number;
        discount: number;
        category: string;
    };
    variant: {
        id: string;
        color: string;
        size: string;
        image_url: string;
        sex: string;
    };
    quantity: number;
}

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

    const { data: basketData, error: basketsFetchError } = await supabase
        .from("baskets")
        .select(`
            variant_id,
            quantity
        `)
        .eq("user_id", userId);

    if (basketsFetchError) {
        return new Response(
            JSON.stringify(basketsFetchError),
            { status: 403, headers: { "Content-Type": "application/json" } },
        );
    }

    const { data: transactionData, error: transactionError } = await supabase
        .from("transactions")
        .insert({
            user_id: userId,
            cart: basketData,
            status: "success",
        });

    if (transactionError) {
        return new Response(
            JSON.stringify(transactionError),
            { status: 403, headers: { "Content-Type": "application/json" } },
        );
    }

    await supabase
        .from("baskets")
        .delete()
        .eq("user_id", userId);

    return new Response(
        JSON.stringify(""),
        { headers: { "Content-Type": "application/json" } },
    );
});
