// import dotenv from "dotenv";
// import { createClient } from "@supabase/supabase-js";

// // Load environment variables
// dotenv.config();

// console.log("SUPABASE_URL =", process.env.SUPABASE_URL);
// console.log(
//     "SUPABASE_ANON_KEY exists =",
//     !!process.env.SUPABASE_ANON_KEY
// );

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//     throw new Error("Supabase environment variables are missing.");
// }

// const supabase = createClient(
//     supabaseUrl,
//     supabaseAnonKey
// );

// export default supabase;

import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

console.log(process.env.PORT);
console.log(process.env.SUPABASE_URL);
console.log(!!process.env.SUPABASE_ANON_KEY);

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export default supabase;