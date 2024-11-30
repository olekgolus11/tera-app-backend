import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { SupabaseService } from "../_shared/SupabaseService.ts";
import { getBearerToken } from "../_shared/functions.ts";

Deno.serve(async (req) => {
    const { variantId, quantity } = await req.json();

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

    const { error: basketsError } = await supabase
        .from("baskets")
        .insert({
            variant_id: variantId,
            user_id: userId,
            quantity,
        });

    if (basketsError) {
        return new Response(
            JSON.stringify(basketsError),
            { status: 403, headers: { "Content-Type": "application/json" } },
        );
    }

    return new Response(
        null,
        { headers: { "Content-Type": "application/json" }, status: 201 },
    );
});
