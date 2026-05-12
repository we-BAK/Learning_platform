// backend/test-supabase.js
require('dotenv').config(); // Make sure you have dotenv installed
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use Service Role to bypass RLS
);

async function runTest() {
  console.log("Checking connection to:", process.env.SUPABASE_URL);
  
  const { data, error } = await supabase
    .from('registrations') 
    .select('count');

  if (error) {
    console.error("❌ Connection failed:", error.message);
  } else {
    console.log("✅ Connection successful! Row count:", data);
  }
}

runTest();