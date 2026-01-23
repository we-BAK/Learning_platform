import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xxcffbkmjfwphfbrnhut.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4Y2ZmYmttamZ3cGhmYnJuaHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNTgxNDQsImV4cCI6MjA4MzczNDE0NH0.bCLAxtd1eA7qEllCxeIF9w34-rhtrcOOFAH2akg-r0c';

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js/1.0',
    },
  },
});

export default supabase;
