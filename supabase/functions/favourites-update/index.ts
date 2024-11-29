import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { SupabaseService } from "../_shared/SupabaseService.ts";
import { getBearerToken } from "../_shared/functions.ts";

Deno.serve(async (req) => {
  const { oldVariantId, newVariantId } = await req.json();

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

  const { error: favouriteError } = await supabase
    .from("favourites")
    .update({ product_id: newVariantId })
    .eq("product_id", oldVariantId)
    .eq("user_id", userId);

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
