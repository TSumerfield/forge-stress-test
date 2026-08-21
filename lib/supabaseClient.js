import { createClient } from '@supabase/supabase-js';

// These values are public by design and are embedded in the browser bundle.
// Keep a known-good fallback so a malformed hosting variable cannot silently
// disable anonymous diagnostic submissions.
const productionUrl = 'https://dtarxexjawnxloxrdabw.supabase.co';
const productionPublishableKey =
  'sb_publishable_W7Co0s0y8qwg6QiKKttykQ_7Gxl1sMi';

const configuredUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const configuredPublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabaseUrl = configuredUrl?.endsWith('.supabase.co')
  ? configuredUrl
  : productionUrl;
const supabasePublishableKey =
  configuredPublishableKey?.startsWith('sb_publishable_') &&
  configuredPublishableKey.length >= productionPublishableKey.length
    ? configuredPublishableKey
    : productionPublishableKey;

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);
