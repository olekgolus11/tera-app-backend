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

    const { data, error } = await supabase
        .from("favourites")
        .select(`
            id,
            product_id,
            color,
            size,
            image_url,
            sex
        `);

    return new Response(
        JSON.stringify(data),
        { headers: { "Content-Type": "application/json" } },
    );
});
