import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { SupabaseService } from "../_shared/SupabaseService.ts";

console.log("Hello from Functions!");

Deno.serve(async (req) => {
    const supabaseService = new SupabaseService();
    const supabase = supabaseService.supabase;

    const { category, sex } = await req.json();

    const { data, error } = await supabase
        .from("products")
        .select(`
      id,
      price,
      name,
      brand,
      category,
      image_url,
      discount,
      products_variants!inner(sex, color)
      `)
        .eq("category", category)
        .eq("products_variants.sex", sex);

    if (error) {
        return new Response(
            JSON.stringify(error),
            { status: 403, headers: { "Content-Type": "application/json" } },
        );
    }

    const responseBody = data.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        brand: product.brand,
        category: product.category,
        image_url: product.image_url,
        discount: product.discount,
        colors: [
            ...new Set(
                product.products_variants.map((variant) => variant.color),
            ),
        ],
    }));

    return new Response(
        JSON.stringify(responseBody),
        { headers: { "Content-Type": "application/json" } },
    );
});
