import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { SupabaseService } from "../_shared/SupabaseService.ts";
import { getBearerToken } from "../_shared/functions.ts";

interface VariantDetails {
    productId: string;
    color: string;
    sizes: {
        size: string;
        variantId: string;
        isInCart: boolean;
    }[];
    imageUrl: string;
    isFavorite: boolean;
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

    const { productId, sex } = await req.json();

    const { data, error } = await supabaseService.supabase
        .from("products_variants")
        .select(`
            id,
            product_id,
            color,
            size,
            image_url,
            sex
        `)
        .eq("product_id", productId)
        .eq("sex", sex);

    if (error) {
        return new Response(
            JSON.stringify(error),
            { status: 403, headers: { "Content-Type": "application/json" } },
        );
    }

    const { data: favouritesData, error: favouritesError } =
        await supabaseService.supabase
            .from("favourites")
            .select("variant_id")
            .eq("user_id", userId);

    if (favouritesError) {
        return new Response(
            JSON.stringify(favouritesError),
            { status: 403, headers: { "Content-Type": "application/json" } },
        );
    }

    const { data: cartData, error: cartError } = await supabaseService.supabase
        .from("baskets")
        .select("variant_id")
        .eq("user_id", userId);

    if (cartError) {
        return new Response(
            JSON.stringify(cartError),
            { status: 403, headers: { "Content-Type": "application/json" } },
        );
    }

    const variantsDetails: VariantDetails[] = [];

    for (const variant of data) {
        const variantDetails = variantsDetails.find(
            (productDetails) => productDetails.color === variant.color,
        );
        const isFavorite = favouritesData.some(
            (favourite) => favourite.variant_id === variant.id,
        );
        const isInCart = cartData.some((cart) =>
            cart.variant_id === variant.id
        );

        if (variantDetails) {
            variantDetails.sizes.push({
                size: variant.size,
                variantId: variant.id,
                isInCart,
            });
            if (isFavorite) {
                variantDetails.isFavorite = true;
            }
        } else {
            variantsDetails.push({
                productId: variant.product_id,
                color: variant.color,
                sizes: [{
                    size: variant.size,
                    variantId: variant.id,
                    isInCart,
                }],
                imageUrl: variant.image_url,
                isFavorite,
            });
        }
    }

    return new Response(
        JSON.stringify(variantsDetails),
        { headers: { "Content-Type": "application/json" } },
    );
});
