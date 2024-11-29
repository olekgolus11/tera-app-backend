import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { SupabaseService } from "../_shared/SupabaseService.ts";
import { getBearerToken } from "../_shared/functions.ts";

Deno.serve(async (req) => {
    const { variantId, size } = await req.json();

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

    const { data: variantData, error: variantError } = await supabase
        .from("products_variants")
        .select(`
            id,
            product_id,
            color,
            size,
            sex,
            image_url
        `)
        .eq("id", variantId)
        .single();

    const { data: requestedVariantData, error: requestedVariantError } =
        await supabase
            .from("products_variants")
            .select(`
                id,
                product_id,
                color,
                size,
                image_url
            `)
            .eq("product_id", variantData?.product_id)
            .eq("color", variantData?.color)
            .eq("sex", variantData?.sex)
            .eq("size", size);

    if (requestedVariantError) {
        return new Response(
            JSON.stringify(requestedVariantError),
            { status: 403, headers: { "Content-Type": "application/json" } },
        );
    }
    if (requestedVariantData.length === 0) {
        return new Response(
            JSON.stringify({ message: "No variant found" }),
            { status: 404, headers: { "Content-Type": "application/json" } },
        );
    }

    const { error: favouriteError } = await supabase
        .from("favourites")
        .insert({
            product_id: requestedVariantData[0].id,
            user_id: userId,
        });

    if (favouriteError) {
        return new Response(
            JSON.stringify(favouriteError),
            { status: 403, headers: { "Content-Type": "application/json" } },
        );
    }

    return new Response(
        null,
        { headers: { "Content-Type": "application/json" }, status: 201 },
    );
});
