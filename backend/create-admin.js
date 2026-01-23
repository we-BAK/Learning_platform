

// create-admin.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    'https://xrpihqkmfviorvicpiwk.supabase.co',       //  project URL 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhycGlocWttZnZpb3J2aWNwaXdrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjQzNDg2NSwiZXhwIjoyMDYyMDEwODY1fQ.Zn3q5jMFeA02dgrLRPtPA1R75le5ZNJ4x3sGKOWW0_Y'                      // service role key
  );


async function createAdmin() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@example.com',
    password: 'AdminPassword123!',
    user_metadata: {
      role: 'admin',
      full_name: 'Main Admin'
    }
  });

  if (error) {
    console.error('❌ Error creating admin:', error.message);
  } else {
    console.log('✅ Admin created:', data.user);
  }
}

createAdmin();

