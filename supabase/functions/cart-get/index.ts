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

    const { data, error } = await supabase
        .from("baskets")
        .select(`
            variant_id,
            quantity,
            products_variants!inner(*, products!inner(id, name, brand, price, discount, category))
        `)
        .eq("user_id", userId);

    if (error) {
        return new Response(
            JSON.stringify(error),
            { status: 403, headers: { "Content-Type": "application/json" } },
        );
    }

    const responseBody: ProductCart[] = data.map((basket) => ({
        product: {
            id: (basket.products_variants as any).products.id,
            name: (basket.products_variants as any).products.name,
            brand: (basket.products_variants as any).products.brand,
            price: (basket.products_variants as any).products.price,
            discount: (basket.products_variants as any).products.discount,
            category: (basket.products_variants as any).products.category,
        },
        variant: {
            id: basket.variant_id,
            color: (basket.products_variants as any).color,
            size: (basket.products_variants as any).size,
            image_url: (basket.products_variants as any).image,
            sex: (basket.products_variants as any).sex,
        },
        quantity: basket.quantity,
    }));

    return new Response(
        JSON.stringify(responseBody),
        { headers: { "Content-Type": "application/json" } },
    );
});
