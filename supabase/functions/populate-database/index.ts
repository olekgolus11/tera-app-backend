import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js";

// create type category_type as enum(
//   'clothes',
//   'shoes',
//   'sport',
//   'new',
//   'accessories',
//   'luxury'
// );

// create table products (
//   id uuid not null primary key default gen_random_uuid(),
//   price decimal not null,
//   name text not null,
//   brand text not null,
//   image_url text not null,
//   category category_type not null
// );

console.log("Hello from Functions!");

interface Product {
    id: string;
    price: number;
    name: string;
    brand: string;
    image_url: string;
    category: "clothes" | "shoes" | "sport" | "accessories" | "luxury" | "new";
    product_variants: ProductVariant[];
}

// create type sex_type as enum(
//   'women',
//   'men',
//   'kids'
// );

// create table products_variants (
//   id uuid not null primary key default gen_random_uuid(),
//   product_id uuid not null,
//   size text not null,
//   stock numeric not null,
//   color text not null,
//   image_url text not null,
//   sex sex_type not null,
//   discount decimal,
//   foreign key (product_id) references public.products(id)
// );

interface ProductVariant {
    product_id: string;
    size: string;
    stock: number;
    color: string;
    image_url: string;
    sex: "women" | "men" | "kids";
    discount?: number;
}

Deno.serve(async (req) => {
    const shoes: Product[] = [
        { // https://www.nike.com/pl/t/buty-meskie-air-max-270-Kqzbp7/AH8050-002
            id: "1fa85f64-5717-4562-b3fc-2c963f66afa6",
            price: 120,
            name: "Air Max 270",
            brand: "Nike",
            image_url:
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/AIR+MAX+270.png",
            category: "shoes",
            product_variants: [
                {
                    product_id: "1fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black-white",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/AIR+MAX+270.png",
                    sex: "men",
                },
                {
                    product_id: "1fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black-white",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/AIR+MAX+270.png",
                    sex: "women",
                },
                {
                    product_id: "1fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black-white",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/AIR+MAX+270.png",
                    sex: "kids",
                },
                {
                    product_id: "1fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "white",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/awjogtdnqxniqqk0wpgf/AIR+MAX+270.png",
                    sex: "men",
                },
                {
                    product_id: "1fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "white",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/awjogtdnqxniqqk0wpgf/AIR+MAX+270.png",
                    sex: "women",
                },
                {
                    product_id: "1fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "white",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/awjogtdnqxniqqk0wpgf/AIR+MAX+270.png",
                    sex: "kids",
                },
                {
                    product_id: "1fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/dl2krirthxihbhgtkdv5/AIR+MAX+270.png",
                    sex: "men",
                },
                {
                    product_id: "1fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/dl2krirthxihbhgtkdv5/AIR+MAX+270.png",
                    sex: "women",
                },
                {
                    product_id: "1fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/dl2krirthxihbhgtkdv5/AIR+MAX+270.png",
                    sex: "kids",
                },
            ],
        },
        { //https://www.adidas.pl/ultraboost-1.0-shoes/HQ4201.html
            id: "2fa85f64-5717-4562-b3fc-2c963f66afa6",
            price: 150,
            name: "Ultra Boost",
            brand: "Adidas",
            image_url:
                "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/bad84b99019d4386a67cd03ecc51c0a4_9366/Ultraboost_1.0_Shoes_Czern_HQ4201_HM1.jpg",
            category: "shoes",
            product_variants: [
                {
                    product_id: "2fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black-white",
                    image_url:
                        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/bad84b99019d4386a67cd03ecc51c0a4_9366/Ultraboost_1.0_Shoes_Czern_HQ4201_H",
                    sex: "men",
                },
                {
                    product_id: "2fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black-white",
                    image_url:
                        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/bad84b99019d4386a67cd03ecc51c0a4_9366/Ultraboost_1.0_Shoes_Czern_HQ4201_H",
                    sex: "women",
                },
                {
                    product_id: "2fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black-white",
                    image_url:
                        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/bad84b99019d4386a67cd03ecc51c0a4_9366/Ultraboost_1.0_Shoes_Czern_HQ4201_H",
                    sex: "kids",
                },
                {
                    product_id: "2fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "white-green",
                    image_url:
                        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4dea41850536484faa1a24fd10b30ddc_9366/Ultraboost_1.0_Shoes_Bialy_JH6600_01_standard.jpg",
                    sex: "men",
                },
                {
                    product_id: "2fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "white-green",
                    image_url:
                        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4dea41850536484faa1a24fd10b30ddc_9366/Ultraboost_1.0_Shoes_Bialy_JH6600_01_standard.jpg",
                    sex: "women",
                },
                {
                    product_id: "2fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "white-green",
                    image_url:
                        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4dea41850536484faa1a24fd10b30ddc_9366/Ultraboost_1.0_Shoes_Bialy_JH6600_01_standard.jpg",
                    sex: "kids",
                },
            ],
        },
        { //https://eobuwie.com.pl/c/eobuwie/kolekcja:vans_slip_on?cookie_consent=true
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            price: 90,
            name: "Classic Slip-On",
            brand: "Vans",
            image_url:
                "https://img.eobuwie.cloud/eob_product_660w_880h(7/4/8/4/748463f40776830b04677081ef5d25977154f872_03_0888654802870_rz.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn000zbueo01-checkerboard-blk-pewter-0000303217167.webp",
            category: "shoes",
            product_variants: [
                {
                    product_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "checkerboard",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_660w_880h(7/4/8/4/748463f40776830b04677081ef5d25977154f872_03_0888654802870_rz.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn000zbueo01-checkerboard-blk-pewter-000030321716",
                    sex: "men",
                },
                {
                    product_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "checkerboard",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_660w_880h(7/4/8/4/748463f40776830b04677081ef5d25977154f872_03_0888654802870_rz.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn000zbueo01-checkerboard-blk-pewter-000030321716",
                    sex: "women",
                },
                {
                    product_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "checkerboard",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_660w_880h(7/4/8/4/748463f40776830b04677081ef5d25977154f872_03_0888654802870_rz.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn000zbueo01-checkerboard-blk-pewter-000030321716",
                    sex: "kids",
                },
                {
                    product_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "gray",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_528w_704h(9/8/9/1/98915e04d78c67157f63deb644692ab68fbe3753_03_0196573419926_ki.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn0005wwsxn1-silver-navy-0000303198329.webp",
                    sex: "kids",
                },
                {
                    product_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "gray",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_528w_704h(9/8/9/1/98915e04d78c67157f63deb644692ab68fbe3753_03_0196573419926_ki.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn0005wwsxn1-silver-navy-0000303198329.webp",
                    sex: "men",
                },
                {
                    product_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "gray",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_528w_704h(9/8/9/1/98915e04d78c67157f63deb644692ab68fbe3753_03_0196573419926_ki.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn0005wwsxn1-silver-navy-0000303198329.webp",
                    sex: "women",
                },
            ],
        },
        { //https://outlet.asics.com/pl/pl-pl/gel-quantum-360-vii/p/1201A867-001.html
            id: "4fa85f64-5717-4562-b3fc-2c963f66afa6",
            price: 110,
            name: "Gel-Quantum 360 VII",
            brand: "ASICS",
            image_url:
                "https://images.asics.com/is/image/asics/1201A867_001_SR_RT_GLB?$zoom$",
            category: "shoes",
            product_variants: [
                {
                    product_id: "4fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://images.asics.com/is/image/asics/1201A867_001_SR_RT_GLB?$zoom$",
                    sex: "men",
                },
            ],
        },
        { //https://www.nike.com/pl/t/meskie-wodoszczelne-buty-do-biegania-po-asfalcie-infinityrn-4-gore-tex-MH8Nrw/HQ0265-001
            id: "5fa85f64-5717-4562-b3fc-2c963f66afa6",
            price: 160,
            name: "React Infinity Run",
            brand: "Nike",
            image_url:
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/80ab9794-f137-4750-9920-1002e26f0f62/NIKE+REACTX+INFINITY+RN+4+GTX.png",
            category: "shoes",
            product_variants: [
                {
                    product_id: "5fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black-white",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/80ab9794-f137-4750-9920-1002e26f0f62/NIKE+REACTX+INFINITY+RN+4+GTX.png",
                    sex: "men",
                },
            ],
        },
        { //https://www.adidas.pl/stan_smith?cm_mmca1=PL&cm_mmca2=e&af_reengagement_window=30d&is_retargeting=true&pid=googleadwords_temp&c=adidas-Product_Ranges-B-Exact-ROI&af_channel=Search
            id: "6fa85f64-5717-4562-b3fc-2c963f66afa6",
            price: 140,
            name: "Stan Smith",
            brand: "Adidas",
            image_url:
                "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/69721f2e7c934d909168a80e00818569_9366/Stan_Smith_Shoes_Bialy_M20324_01_standard.jpg",
            category: "shoes",
            product_variants: [
                {
                    product_id: "6fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "white",
                    image_url:
                        "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/69721f2e7c934d909168a80e00818569_9366/Stan_Smith_Shoes_Bialy_M20324_01_standard.jpg",
                    sex: "men",
                },
            ],
        },
        { //https://www.converse.pl/chuck-taylor-all-star-optical-white-m7650c
            id: "7fa85f64-5717-4562-b3fc-2c963f66afa6",
            price: 130,
            name: "Chuck Taylor All Star",
            brand: "Converse",
            image_url:
                "https://media.converse.pl/catalog/product/m/7/m7650_a_107x1_1.jpg",
            category: "shoes",
            product_variants: [
                {
                    product_id: "7fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "white",
                    image_url:
                        "https://media.converse.pl/catalog/product/m/7/m7650_a_107x1_1.jpg",
                    sex: "men",
                },
                {
                    product_id: "7fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "white",
                    image_url:
                        "https://media.converse.pl/catalog/product/m/7/m7650_a_107x1_1.jpg",
                    sex: "women",
                },
            ],
        },
        { //https://eobuwie.com.pl/p/buty-hoka-bondi-8-1123202-bblc?is_retargeting=true&pid=google&af_sub1=cpc&c=_PL_EOB_PLA_MAIN_Google&af_click_lookback=3h&af_reengagement_window=1d
            id: "8fa85f64-5717-4562-b3fc-2c963f66afa6",
            price: 180,
            name: "Hoka One One Bondi",
            brand: "Hoka",
            image_url:
                "https://img.eobuwie.cloud/eob_product_660w_880h(f/e/1/6/fe16cf8900ae7401b03c39465058b2afc9bb8fe0_22_0195719627652_rz.jpg,webp)/buty-hoka-bondi-8-1123202-bblc.webp",
            category: "shoes",
            product_variants: [
                {
                    product_id: "8fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_660w_880h(f/e/1/6/fe16cf8900ae7401b03c39465058b2afc9bb8fe0_22_0195719627652_rz.jpg,webp)/buty-hoka-bondi-8-1123202-bblc.webp",
                    sex: "men",
                },
                {
                    product_id: "8fa85f64-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_660w_880h(f/e/1/6/fe16cf8900ae7401b03c39465058b2afc9bb8fe0_22_0195719627652_rz.jpg,webp)/buty-hoka-bondi-8-1123202-bblc.webp",
                    sex: "women",
                },
            ],
        },
        { //https://www.nike.com/pl/t/buty-meskie-air-force-1-07-SgHWBZ/CW2288-001?CP=EUNS_AFF_AWIN_PL_323889_KiesproductGoogleShoppingtraffic_172275&sv1=affiliate&sv_campaign_id=323889&awc=16334_1732048013_17b0c8dee99fa024001518bf306ade20
            id: "10fa85f64-5717-4562-b3fc-2c963f66afa6",
            price: 120,
            name: "Air Force 1",
            brand: "Nike",
            image_url:
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7cd0845e-4eba-4ccf-8237-bc47f1e31f3e/AIR+FORCE+1+%2707.png",
            category: "shoes",
            product_variants: [
                {
                    product_id: "10fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7cd0845e-4eba-4ccf-8237-bc47f1e31f3e/AIR+FORCE+1+%2707.png",
                    sex: "men",
                },
                {
                    product_id: "10fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7cd0845e-4eba-4ccf-8237-bc47f1e31f3e/AIR+FORCE+1+%2707.png",
                    sex: "women",
                },
            ],
        },
    ];

    const clothes: Product[] = [
        { //https://www2.hm.com/pl_pl/productpage.0963662001.html
            id: "11fa85f6-5717-4562-b3fc-2c963f66afa6",
            price: 25,
            name: "Basic T-Shirt",
            brand: "H&M",
            image_url:
                "https://image.hm.com/assets/hm/51/d8/51d81ba13ce44adb43730f956ef5cac31a3d4275.jpg?imwidth=2160",
            category: "clothes",
            product_variants: [
                {
                    product_id: "11fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "white",
                    image_url:
                        "https://image.hm.com/assets/hm/51/d8/51d81ba13ce44adb43730f956ef5cac31a3d4275.jpg?imwidth=2160",
                    sex: "men",
                },
                {
                    product_id: "11fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "white",
                    image_url:
                        "https://image.hm.com/assets/hm/51/d8/51d81ba13ce44adb43730f956ef5cac31a3d4275.jpg?imwidth=2160",
                    sex: "women",
                },
                {
                    product_id: "11fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "white",
                    image_url:
                        "https://image.hm.com/assets/hm/51/d8/51d81ba13ce44adb43730f956ef5cac31a3d4275.jpg?imwidth=2160",
                    sex: "kids",
                },
                {
                    product_id: "11fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "gray",
                    image_url:
                        "https://image.hm.com/assets/hm/4a/50/4a50b46ff8aa60d3332835ab5217df10e7bda29f.jpg?imwidth=2160",
                    sex: "men",
                },
                {
                    product_id: "11fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "gray",
                    image_url:
                        "https://image.hm.com/assets/hm/4a/50/4a50b46ff8aa60d3332835ab5217df10e7bda29f.jpg?imwidth=2160",
                    sex: "women",
                },
                {
                    product_id: "11fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "gray",
                    image_url:
                        "https://image.hm.com/assets/hm/4a/50/4a50b46ff8aa60d3332835ab5217df10e7bda29f.jpg?imwidth=2160",
                    sex: "kids",
                },
                {
                    product_id: "11fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "blue",
                    image_url:
                        "https://image.hm.com/assets/hm/c9/b5/c9b53516e6d09fffc2e744a11de8553c933dd150.jpg?imwidth=2160",
                    sex: "men",
                },
                {
                    product_id: "11fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "blue",
                    image_url:
                        "https://image.hm.com/assets/hm/c9/b5/c9b53516e6d09fffc2e744a11de8553c933dd150.jpg?imwidth=2160",
                    sex: "women",
                },
                {
                    product_id: "11fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "blue",
                    image_url:
                        "https://image.hm.com/assets/hm/c9/b5/c9b53516e6d09fffc2e744a11de8553c933dd150.jpg?imwidth=2160",
                    sex: "kids",
                },
            ],
        },
        { //https://www.zara.com/pl/pl/jeans-z1975-mom-fit-z-wysokim-stanem-p06164186.html?v1=380163381
            id: "12fa85f6-5717-4562-b3fc-2c963f66afa6",
            price: 30,
            name: "Slim Fit Jeans",
            brand: "Zara",
            image_url:
                "https://static.zara.net/assets/public/6cad/afa9/a94c43b3a5fa/161a7a4b4238/06164186427-e1/06164186427-e1.jpg?ts=1726650212052&w=563",
            category: "clothes",
            product_variants: [
                {
                    product_id: "12fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "blue",
                    image_url:
                        "https://static.zara.net/assets/public/6cad/afa9/a94c43b3a5fa/161a7a4b4238/06164186427-e1/06164186427-e1.jpg?ts=1726650212052&w=563",
                    sex: "men",
                },
                {
                    product_id: "12fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "blue",
                    image_url:
                        "https://static.zara.net/assets/public/6cad/afa9/a94c43b3a5fa/161a7a4b4238/06164186427-e1/06164186427-e1.jpg?ts=1726650212052&w=563",
                    sex: "women",
                },
            ],
        },
        { //https://www2.hm.com/pl_pl/productpage.1024256001.html
            id: "13fa85f6-5717-4562-b3fc-2c963f66afa6",
            price: 40,
            name: "Slim Jeans",
            brand: "H&M",
            image_url:
                "https://image.hm.com/assets/hm/d2/b6/d2b600f3bcfc2f061a1e7ec6353fa0e0bcd2f092.jpg?imwidth=564",
            category: "clothes",
            product_variants: [
                {
                    product_id: "13fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://image.hm.com/assets/hm/d2/b6/d2b600f3bcfc2f061a1e7ec6353fa0e0bcd2f092.jpg?imwidth=564",
                    sex: "men",
                },
                {
                    product_id: "13fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://image.hm.com/assets/hm/d2/b6/d2b600f3bcfc2f061a1e7ec6353fa0e0bcd2f092.jpg?imwidth=564",
                    sex: "men",
                },
            ],
        },
        { //https://www.zara.com/pl/pl/taliowany-blazer-limited-edition-p05942040.html?v1=390213654
            id: "14fa85f6-5717-4562-b3fc-2c963f66afa6",
            price: 50,
            name: "Checked Blazer",
            brand: "Zara",
            image_url:
                "https://static.zara.net/assets/public/729d/6011/61a34ddbb5d2/1e7ab4e1555c/05942040070-e1/05942040070-e1.jpg?ts=1728403210159&w=563",
            category: "clothes",
            product_variants: [
                {
                    product_id: "14fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "gray",
                    image_url:
                        "https://static.zara.net/assets/public/729d/6011/61a34ddbb5d2/1e7ab4e1555c/05942040070-e1/05942040070-e1.jpg?ts=1728403210159&w=563",
                    sex: "men",
                },
                {
                    product_id: "14fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "gray",
                    image_url:
                        "https://static.zara.net/assets/public/729d/6011/61a34ddbb5d2/1e7ab4e1555c/05942040070-e1/05942040070-e1.jpg?ts=1728403210159&w=563",
                    sex: "women",
                },
            ],
        },
        { //https://www2.hm.com/pl_pl/productpage.1222681001.html
            id: "15fa85f6-5717-4562-b3fc-2c963f66afa6",
            price: 35,
            name: "Denim Jacket",
            brand: "H&M",
            image_url:
                "https://image.hm.com/assets/hm/12/b0/12b00a34ac1069c6845cd359cfe5313a4d82f896.jpg?imwidth=564",
            category: "clothes",
            product_variants: [
                {
                    product_id: "15fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "blue",
                    image_url:
                        "https://image.hm.com/assets/hm/12/b0/12b00a34ac1069c6845cd359cfe5313a4d82f896.jpg?imwidth=564",
                    sex: "men",
                },
                {
                    product_id: "15fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "blue",
                    image_url:
                        "https://image.hm.com/assets/hm/12/b0/12b00a34ac1069c6845cd359cfe5313a4d82f896.jpg?imwidth=564",
                    sex: "women",
                },
            ],
        },
        { //https://www.zara.com/pl/pl/trench-z-tkaniny-technicznej-p06544549.html?v1=407167352
            id: "16fa85f6-5717-4562-b3fc-2c963f66afa6",
            price: 145,
            name: "Puffer Coat",
            brand: "Zara",
            image_url:
                "https://static.zara.net/assets/public/4ac5/b77a/538f4445a089/6cd01807c477/06544549800-e1/06544549800-e1.jpg?ts=1727077629594&w=563",
            category: "clothes",
            product_variants: [
                {
                    product_id: "16fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "blue",
                    image_url:
                        "https://static.zara.net/assets/public/4ac5/b77a/538f4445a089/6cd01807c477/06544549800-e1/06544549800-e1.jpg?ts=1727077629594&w=563",
                    sex: "men",
                },
                {
                    product_id: "16fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "blue",
                    image_url:
                        "https://static.zara.net/assets/public/4ac5/b77a/538f4445a089/6cd01807c477/06544549800-e1/06544549800-e1.jpg?ts=1727077629594&w=563",
                    sex: "women",
                },
            ],
        },
        { //https://www2.hm.com/pl_pl/productpage.1226252014.html
            id: "17fa85f6-5717-4562-b3fc-2c963f66afa6",
            price: 20,
            name: "Cotton Sweater",
            brand: "H&M",
            image_url:
                "https://image.hm.com/assets/hm/36/35/3635057383ed6a8a839c6c1ad5241a73e6bc06e2.jpg?imwidth=564",
            category: "clothes",
            product_variants: [
                {
                    product_id: "17fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://image.hm.com/assets/hm/36/35/3635057383ed6a8a839c6c1ad5241a73e6bc06e2.jpg?imwidth=564",
                    sex: "men",
                },
                {
                    product_id: "17fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://image.hm.com/assets/hm/36/35/3635057383ed6a8a839c6c1ad5241a73e6bc06e2.jpg?imwidth=564",
                    sex: "women",
                },
            ],
        },
        { //https://www2.hm.com/pl_pl/productpage.1189347002.html
            id: "19fa85f6-5717-4562-b3fc-2c963f66afa6",
            price: 28,
            name: "Winter Hat",
            brand: "H&M",
            image_url:
                "https://image.hm.com/assets/hm/0d/23/0d23f47306c8f0c33311531d714de1c2f713288d.jpg?imwidth=564",
            category: "clothes",
            product_variants: [
                {
                    product_id: "19fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "white",
                    image_url:
                        "https://image.hm.com/assets/hm/0d/23/0d23f47306c8f0c33311531d714de1c2f713288d.jpg?imwidth=564",
                    sex: "men",
                },
                {
                    product_id: "19fa85f6-5717-4562-b3fc-2c963f66afa6",
                    size: "S",
                    stock: 10,
                    color: "white",
                    image_url:
                        "https://image.hm.com/assets/hm/0d/23/0d23f47306c8f0c33311531d714de1c2f713288d.jpg?imwidth=564",
                    sex: "women",
                },
            ],
        },
    ];

    const accessories: Product[] = [
        { //https://www.zara.com/pl/pl/skorzany-pasek-wizytowy-p02823401.html?v1=370119240
            id: "1fa85321-5717-4562-b3fc-2c963f66afa6",
            price: 25,
            name: "Leather Belt",
            brand: "Zara",
            image_url:
                "https://static.zara.net/assets/public/cbed/d5b1/c47047a88df1/2588fcb95365/02823401800-e1/02823401800-e1.jpg?ts=1724255383732&w=563",
            category: "accessories",
            product_variants: [
                {
                    product_id: "1fa85321-5717-4562-b3fc-2c963f66afa6",
                    size: "Uni",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://static.zara.net/assets/public/cbed/d5b1/c47047a88df1/2588fcb95365/02823401800-e1/02823401800-e1.jpg?ts=1724255383732&w=563",
                    sex: "men",
                },
                {
                    product_id: "1fa85321-5717-4562-b3fc-2c963f66afa6",
                    size: "Uni",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://static.zara.net/assets/public/cbed/d5b1/c47047a88df1/2588fcb95365/02823401800-e1/02823401800-e1.jpg?ts=1724255383732&w=563",
                    sex: "women",
                },
            ],
        },
        { //https://www.zara.com/pl/pl/skorzany-pasek-z-plecionki-p02823305.html?v1=367142025
            id: "2fa85321-5717-4562-b3fc-2c963f66afa6",
            price: 30,
            name: "Canvas Belt",
            brand: "Zara",
            image_url:
                "https://static.zara.net/assets/public/2b5c/2f1a/ec2941b195a4/4b18e8d60974/02823305700-e1/02823305700-e1.jpg?ts=1724662454332&w=563",
            category: "accessories",
            product_variants: [
                {
                    product_id: "2fa85321-5717-4562-b3fc-2c963f66afa6",
                    size: "Uni",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://static.zara.net/assets/public/2b5c/2f1a/ec2941b195a4/4b18e8d60974/02823305700-e1/02823305700-e1.jpg?ts=1724662454332&w=563",
                    sex: "men",
                },
                {
                    product_id: "2fa85321-5717-4562-b3fc-2c963f66afa6",
                    size: "Uni",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://static.zara.net/assets/public/2b5c/2f1a/ec2941b195a4/4b18e8d60974/02823305700-e1/02823305700-e1.jpg?ts=1724662454332&w=563",
                    sex: "men",
                },
            ],
        },
        { //https://www.zara.com/pl/pl/elastyczny-pasek-z-plecionki-p02823315.html?v1=400847601
            id: "3fa85321-5717-4562-b3fc-2c963f66afa6",
            price: 20,
            name: "Woven Belt",
            brand: "Zara",
            image_url:
                "https://static.zara.net/assets/public/446c/4d91/f7f24047aaf4/23e0eff5a30e/02823315802-e1/02823315802-e1.jpg?ts=1729582375664&w=563",
            category: "accessories",
            product_variants: [
                {
                    product_id: "3fa85321-5717-4562-b3fc-2c963f66afa6",
                    size: "Uni",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://static.zara.net/assets/public/446c/4d91/f7f24047aaf4/23e0eff5a30e/02823315802-e1/02823315802-e1.jpg?ts=1729582375664&w=563",
                    sex: "men",
                },
                {
                    product_id: "3fa85321-5717-4562-b3fc-2c963f66afa6",
                    size: "Uni",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://static.zara.net/assets/public/446c/4d91/f7f24047aaf4/23e0eff5a30e/02823315802-e1/02823315802-e1.jpg?ts=1729582375664&w=563",
                    sex: "men",
                },
            ],
        },
        { //https://www.zara.com/pl/pl/portfel-g%C5%82adki-p13800420.html?v1=364086742
            id: "4fa85321-5717-4562-b3fc-2c963f66afa6",
            price: 35,
            name: "Wallet",
            brand: "Zara",
            image_url:
                "https://static.zara.net/assets/public/b2e6/815d/43974b2c8d50/ab8bf0c93fe7/13800420800-e1/13800420800-e1.jpg?ts=1726997784108&w=563",
            category: "accessories",
            product_variants: [
                {
                    product_id: "4fa85321-5717-4562-b3fc-2c963f66afa6",
                    size: "Uni",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://static.zara.net/assets/public/b2e6/815d/43974b2c8d50/ab8bf0c93fe7/13800420800-e1/13800420800-e1.jpg?ts=1726997784108&w=563",
                    sex: "men",
                },
            ],
        },
    ];

    const luxury: Product[] = [
        {
            id: "1fa85f64-5717-4562-b3fc-2c963f6643ad",
            price: 300,
            name: "Seabase",
            brand: "Atlantic",
            image_url:
                "https://www.timetrend.pl/media/catalog/product/cache/6eae3d2d6a1f26f7e69160576124b30a/a/t/atlantic_52857.41.53.webp",
            category: "luxury",
            product_variants: [
                {
                    product_id: "1fa85f64-5717-4562-b3fc-2c963f6643ad",
                    size: "36",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://www.timetrend.pl/media/catalog/product/cache/6eae3d2d6a1f26f7e69160576124b30a/a/t/atlantic_52857.41.53.webp",
                    sex: "men",
                },
            ],
        },
    ];

    const sport: Product[] = [
        { //https://eobuwie.com.pl/p/buty-hoka-bondi-8-1123202-bblc?is_retargeting=true&pid=google&af_sub1=cpc&c=_PL_EOB_PLA_MAIN_Google&af_click_lookback=3h&af_reengagement_window=1d
            id: "8fa58394-5717-4562-8491-2c963f66afa6",
            price: 180,
            name: "Hoka One One Bondi",
            brand: "Hoka",
            image_url:
                "https://img.eobuwie.cloud/eob_product_660w_880h(f/e/1/6/fe16cf8900ae7401b03c39465058b2afc9bb8fe0_22_0195719627652_rz.jpg,webp)/buty-hoka-bondi-8-1123202-bblc.webp",
            category: "sport",
            product_variants: [
                {
                    product_id: "8fa58394-5717-4562-8491-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_660w_880h(f/e/1/6/fe16cf8900ae7401b03c39465058b2afc9bb8fe0_22_0195719627652_rz.jpg,webp)/buty-hoka-bondi-8-1123202-bblc.webp",
                    sex: "men",
                },
                {
                    product_id: "8fa58394-5717-4562-8491-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_660w_880h(f/e/1/6/fe16cf8900ae7401b03c39465058b2afc9bb8fe0_22_0195719627652_rz.jpg,webp)/buty-hoka-bondi-8-1123202-bblc.webp",
                    sex: "women",
                },
            ],
        },
        { //https://eobuwie.com.pl/c/eobuwie/kolekcja:vans_slip_on?cookie_consent=true
            id: "3fa49664-5717-4562-8491-2c963f66afa6",
            price: 90,
            name: "Classic Slip-On",
            brand: "Vans",
            image_url:
                "https://img.eobuwie.cloud/eob_product_660w_880h(7/4/8/4/748463f40776830b04677081ef5d25977154f872_03_0888654802870_rz.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn000zbueo01-checkerboard-blk-pewter-0000303217167.webp",
            category: "sport",
            product_variants: [
                {
                    product_id: "3fa49664-5717-4562-8491-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "checkerboard",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_660w_880h(7/4/8/4/748463f40776830b04677081ef5d25977154f872_03_0888654802870_rz.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn000zbueo01-checkerboard-blk-pewter-000030321716",
                    sex: "men",
                },
                {
                    product_id: "3fa49664-5717-4562-8491-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "checkerboard",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_660w_880h(7/4/8/4/748463f40776830b04677081ef5d25977154f872_03_0888654802870_rz.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn000zbueo01-checkerboard-blk-pewter-000030321716",
                    sex: "women",
                },
                {
                    product_id: "3fa49664-5717-4562-8491-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "checkerboard",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_660w_880h(7/4/8/4/748463f40776830b04677081ef5d25977154f872_03_0888654802870_rz.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn000zbueo01-checkerboard-blk-pewter-000030321716",
                    sex: "kids",
                },
                {
                    product_id: "3fa49664-5717-4562-8491-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "gray",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_528w_704h(9/8/9/1/98915e04d78c67157f63deb644692ab68fbe3753_03_0196573419926_ki.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn0005wwsxn1-silver-navy-0000303198329.webp",
                    sex: "kids",
                },
                {
                    product_id: "3fa49664-5717-4562-8491-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "gray",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_528w_704h(9/8/9/1/98915e04d78c67157f63deb644692ab68fbe3753_03_0196573419926_ki.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn0005wwsxn1-silver-navy-0000303198329.webp",
                    sex: "men",
                },
                {
                    product_id: "3fa49664-5717-4562-8491-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "gray",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_528w_704h(9/8/9/1/98915e04d78c67157f63deb644692ab68fbe3753_03_0196573419926_ki.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn0005wwsxn1-silver-navy-0000303198329.webp",
                    sex: "women",
                },
            ],
        },
    ];

    const news: Product[] = [
        { // https://www.nike.com/pl/t/buty-meskie-air-max-270-Kqzbp7/AH8050-002
            id: "1fa85f64-5717-9502-b3fc-2c963f66afa6",
            price: 120,
            name: "Air Max 270",
            brand: "Nike",
            image_url:
                "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/AIR+MAX+270.png",
            category: "new",
            product_variants: [
                {
                    product_id: "1fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black-white",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/AIR+MAX+270.png",
                    sex: "men",
                },
                {
                    product_id: "1fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black-white",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/AIR+MAX+270.png",
                    sex: "women",
                },
                {
                    product_id: "1fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black-white",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/AIR+MAX+270.png",
                    sex: "kids",
                },
                {
                    product_id: "1fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "white",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/awjogtdnqxniqqk0wpgf/AIR+MAX+270.png",
                    sex: "men",
                },
                {
                    product_id: "1fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "white",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/awjogtdnqxniqqk0wpgf/AIR+MAX+270.png",
                    sex: "women",
                },
                {
                    product_id: "1fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "white",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/awjogtdnqxniqqk0wpgf/AIR+MAX+270.png",
                    sex: "kids",
                },
                {
                    product_id: "1fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/dl2krirthxihbhgtkdv5/AIR+MAX+270.png",
                    sex: "men",
                },
                {
                    product_id: "1fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/dl2krirthxihbhgtkdv5/AIR+MAX+270.png",
                    sex: "women",
                },
                {
                    product_id: "1fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black",
                    image_url:
                        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/dl2krirthxihbhgtkdv5/AIR+MAX+270.png",
                    sex: "kids",
                },
            ],
        },
        { //https://www.adidas.pl/ultraboost-1.0-shoes/HQ4201.html
            id: "2fa85f64-5717-9502-b3fc-2c963f66afa6",
            price: 150,
            name: "Ultra Boost",
            brand: "Adidas",
            image_url:
                "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/bad84b99019d4386a67cd03ecc51c0a4_9366/Ultraboost_1.0_Shoes_Czern_HQ4201_HM1.jpg",
            category: "new",
            product_variants: [
                {
                    product_id: "2fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black-white",
                    image_url:
                        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/bad84b99019d4386a67cd03ecc51c0a4_9366/Ultraboost_1.0_Shoes_Czern_HQ4201_H",
                    sex: "men",
                },
                {
                    product_id: "2fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black-white",
                    image_url:
                        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/bad84b99019d4386a67cd03ecc51c0a4_9366/Ultraboost_1.0_Shoes_Czern_HQ4201_H",
                    sex: "women",
                },
                {
                    product_id: "2fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "black-white",
                    image_url:
                        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/bad84b99019d4386a67cd03ecc51c0a4_9366/Ultraboost_1.0_Shoes_Czern_HQ4201_H",
                    sex: "kids",
                },
                {
                    product_id: "2fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "white-green",
                    image_url:
                        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4dea41850536484faa1a24fd10b30ddc_9366/Ultraboost_1.0_Shoes_Bialy_JH6600_01_standard.jpg",
                    sex: "men",
                },
                {
                    product_id: "2fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "white-green",
                    image_url:
                        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4dea41850536484faa1a24fd10b30ddc_9366/Ultraboost_1.0_Shoes_Bialy_JH6600_01_standard.jpg",
                    sex: "women",
                },
                {
                    product_id: "2fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "white-green",
                    image_url:
                        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4dea41850536484faa1a24fd10b30ddc_9366/Ultraboost_1.0_Shoes_Bialy_JH6600_01_standard.jpg",
                    sex: "kids",
                },
            ],
        },
        { //https://eobuwie.com.pl/c/eobuwie/kolekcja:vans_slip_on?cookie_consent=true
            id: "3fa85f64-5717-9502-b3fc-2c963f66afa6",
            price: 90,
            name: "Classic Slip-On",
            brand: "Vans",
            image_url:
                "https://img.eobuwie.cloud/eob_product_660w_880h(7/4/8/4/748463f40776830b04677081ef5d25977154f872_03_0888654802870_rz.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn000zbueo01-checkerboard-blk-pewter-0000303217167.webp",
            category: "new",
            product_variants: [
                {
                    product_id: "3fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "checkerboard",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_660w_880h(7/4/8/4/748463f40776830b04677081ef5d25977154f872_03_0888654802870_rz.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn000zbueo01-checkerboard-blk-pewter-000030321716",
                    sex: "men",
                },
                {
                    product_id: "3fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "checkerboard",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_660w_880h(7/4/8/4/748463f40776830b04677081ef5d25977154f872_03_0888654802870_rz.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn000zbueo01-checkerboard-blk-pewter-000030321716",
                    sex: "women",
                },
                {
                    product_id: "3fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "checkerboard",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_660w_880h(7/4/8/4/748463f40776830b04677081ef5d25977154f872_03_0888654802870_rz.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn000zbueo01-checkerboard-blk-pewter-000030321716",
                    sex: "kids",
                },
                {
                    product_id: "3fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "gray",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_528w_704h(9/8/9/1/98915e04d78c67157f63deb644692ab68fbe3753_03_0196573419926_ki.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn0005wwsxn1-silver-navy-0000303198329.webp",
                    sex: "kids",
                },
                {
                    product_id: "3fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "gray",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_528w_704h(9/8/9/1/98915e04d78c67157f63deb644692ab68fbe3753_03_0196573419926_ki.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn0005wwsxn1-silver-navy-0000303198329.webp",
                    sex: "men",
                },
                {
                    product_id: "3fa85f64-5717-9502-b3fc-2c963f66afa6",
                    size: "36",
                    stock: 10,
                    color: "gray",
                    image_url:
                        "https://img.eobuwie.cloud/eob_product_528w_704h(9/8/9/1/98915e04d78c67157f63deb644692ab68fbe3753_03_0196573419926_ki.jpg,webp)/tenisowki-vans-uy-classic-slip-on-vn0005wwsxn1-silver-navy-0000303198329.webp",
                    sex: "women",
                },
            ],
        },
    ];

    const supabase = createClient(
        "https://reuseflkjdspscjmfehm.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJldXNlZmxramRzcHNjam1mZWhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwNjMzMDcsImV4cCI6MjA0NTYzOTMwN30.Cn6NV6NjrltnGZOEY5D3_z0-GEaT5PfUeyE7DIojrYk",
    );

    for (const shoe of shoes) {
      await supabase
        .from("products")
        .insert({
          id: shoe.id,
          price: shoe.price,
          name: shoe.name,
          brand: shoe.brand,
          image_url: shoe.image_url,
          category: shoe.category,
        });

      for (const variant of shoe.product_variants) {
        let sizes: string[] = [];
        if (variant.sex === "men") {
          sizes = ["40", "41", "42", "43", "44", "45"];
        } else if (variant.sex === "women") {
          sizes = ["36", "37", "38", "39", "40", "41"];
        } else if (variant.sex === "kids") {
          sizes = ["30", "31", "33", "33", "34", "35"];
        }

        try {
          for (const size of sizes) {
            await supabase
              .from("products_variants")
              .insert({
                product_id: shoe.id,
                size,
                stock: variant.stock,
                color: variant.color,
                image_url: variant.image_url,
                sex: variant.sex,
              });
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    // for (const cloth of clothes) {
    //   await supabase
    //     .from("products")
    //     .insert({
    //       id: cloth.id,
    //       price: cloth.price,
    //       name: cloth.name,
    //       brand: cloth.brand,
    //       image_url: cloth.image_url,
    //       category: cloth.category,
    //     });

    //   for (const variant of cloth.product_variants) {
    //     const sizes: string[] = ['S', 'M', 'L', 'XL', 'XXL'];

    //     try {
    //       for (const size of sizes) {
    //         await supabase
    //           .from("products_variants")
    //           .insert({
    //             product_id: cloth.id,
    //             size,
    //             stock: variant.stock,
    //             color: variant.color,
    //             image_url: variant.image_url,
    //             sex: variant.sex,
    //           });
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    // }

    // for (const accessory of accessories) {
    //   await supabase
    //     .from("products")
    //     .insert({
    //       id: accessory.id,
    //       price: accessory.price,
    //       name: accessory.name,
    //       brand: accessory.brand,
    //       image_url: accessory.image_url,
    //       category: accessory.category,
    //     });

    //   for (const variant of accessory.product_variants) {
    //     try {
    //       await supabase
    //           .from("products_variants")
    //           .insert({
    //             product_id: accessory.id,
    //             size: variant.size,
    //             stock: variant.stock,
    //             color: variant.color,
    //             image_url: variant.image_url,
    //             sex: variant.sex,
    //           });
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    // }

    // for (const luxur of luxury) {
    //   await supabase
    //     .from("products")
    //     .insert({
    //       id: luxur.id,
    //       price: luxur.price,
    //       name: luxur.name,
    //       brand: luxur.brand,
    //       image_url: luxur.image_url,
    //       category: luxur.category,
    //     });

    //   for (const variant of luxur.product_variants) {
    //     try {
    //       await supabase
    //           .from("products_variants")
    //           .insert({
    //             product_id: luxur.id,
    //             size: variant.size,
    //             stock: variant.stock,
    //             color: variant.color,
    //             image_url: variant.image_url,
    //             sex: variant.sex,
    //           });
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    // }

    for (const spor of sport) {
        await supabase
            .from("products")
            .insert({
                id: spor.id,
                price: spor.price,
                name: spor.name,
                brand: spor.brand,
                image_url: spor.image_url,
                category: spor.category,
            });

        for (const variant of spor.product_variants) {
            try {
                await supabase
                    .from("products_variants")
                    .insert({
                        product_id: spor.id,
                        size: variant.size,
                        stock: variant.stock,
                        color: variant.color,
                        image_url: variant.image_url,
                        sex: variant.sex,
                    });
            } catch (error) {
                console.error(error);
            }
        }
    }

    // for (const nev of news) {
    //   await supabase
    //     .from("products")
    //     .insert({
    //       id: nev.id,
    //       price: nev.price,
    //       name: nev.name,
    //       brand: nev.brand,
    //       image_url: nev.image_url,
    //       category: nev.category,
    //     });

    //   for (const variant of nev.product_variants) {
    //     let sizes: string[] = [];
    //     if (variant.sex === "men") {
    //       sizes = ["40", "41", "42", "43", "44", "45"];
    //     } else if (variant.sex === "women") {
    //       sizes = ["36", "37", "38", "39", "40", "41"];
    //     } else if (variant.sex === "kids") {
    //       sizes = ["30", "31", "33", "33", "34", "35"];
    //     }

    //     try {
    //       for (const size of sizes) {
    //         await supabase
    //           .from("products_variants")
    //           .insert({
    //             product_id: nev.id,
    //             size,
    //             stock: variant.stock,
    //             color: variant.color,
    //             image_url: variant.image_url,
    //             sex: variant.sex,
    //           });
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    // }

    return new Response(
        // JSON.stringify(data),
        // { headers: { "Content-Type": "application/json" } },
    );
});
