// src/utils/supabase/admin.ts
import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SERVICE_ROLE_KEY) {
    throw new Error("Supabase env vars missing: " + process.env.SERVICE_ROLE_KEY);;
}

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        }
    }
);

export { supabaseAdmin };
