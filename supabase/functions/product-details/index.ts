import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { SupabaseService } from "../_shared/SupabaseService.ts";

interface ProductDetails {
    productId: string;
    color: string;
    sizes: {
        size: string;
        variantId: string;
    }[];
    imageUrl: string;
}

Deno.serve(async (req) => {
    const supabaseService = new SupabaseService();
    const supabase = supabaseService.supabase;

    const { productId, sex } = await req.json();

    const { data, error } = await supabase
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

    const productsDetails: ProductDetails[] = [];

    for (const product of data) {
        const productDetails = productsDetails.find(
            (productDetails) => productDetails.color === product.color,
        );

        if (productDetails) {
            productDetails.sizes.push({
                size: product.size,
                variantId: product.id,
            });
        } else {
            productsDetails.push({
                productId: product.product_id,
                color: product.color,
                sizes: [{
                    size: product.size,
                    variantId: product.id,
                }],
                imageUrl: product.image_url,
            });
        }
    }

    return new Response(
        JSON.stringify(productsDetails),
        { headers: { "Content-Type": "application/json" } },
    );
});
