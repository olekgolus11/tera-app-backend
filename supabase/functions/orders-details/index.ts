import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { SupabaseService } from "../_shared/SupabaseService.ts";
import { getBearerToken } from "../_shared/functions.ts";

interface ProductOrder {
    product: {
        id: string;
        name: string;
        brand: string;
        price: number;
        discount: number;
    };
    variant: {
        id: string;
        size: string;
        image_url: string;
    };
    quantity: number;
}

Deno.serve(async (req) => {
    const { orderId } = await req.json();

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
    const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select(`
            id,
            user_id,
            amount,
            cart,
            created_at
        `)
        .eq("user_id", userId)
        .eq("id", orderId)
        .single();

    if (orderError) {
        return new Response(
            JSON.stringify(orderError),
            { status: 403, headers: { "Content-Type": "application/json" } },
        );
    }

    const productOrders: ProductOrder[] = [];
    for (const item of orderData.cart) {
        const { data: productData, error: productError } = await supabase
            .from("products_variants")
            .select(`
                id,
                image_url,
                size,
                products!inner(id, name, brand, price, discount)
            `)
            .eq("id", item.variant_id)
            .single();

        if (productError) {
            return new Response(
                JSON.stringify(productError),
                {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        productOrders.push({
            product: {
                id: (productData.products as any).id,
                name: (productData.products as any).name,
                brand: (productData.products as any).brand,
                price: (productData.products as any).price,
                discount: (productData.products as any).discount,
            },
            variant: {
                id: productData.id,
                size: productData.size,
                image_url: productData.image_url,
            },
            quantity: item.quantity,
        });
    }

    return new Response(
        JSON.stringify(productOrders),
        { headers: { "Content-Type": "application/json" } },
    );
});
