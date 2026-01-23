// backend/routes/registration.js
const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Approve Registration - Copy data to profiles, parents, children tables
router.post('/approve_registration', async (req, res) => {
  const { id: registration_id } = req.body;
  console.log("HIT: Approve Registration Route reached!");
  if (!registration_id) {
    return res.status(400).json({ error: 'Missing registration ID' });
  }

  try {
    const { data: registration, error: fetchError } = await supabase
      .from('registrations')
      .select('*')
      .eq('id', registration_id)
      .single();

    if (fetchError || !registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    const {
      email, guardian_name, phone, region, city,
      language, therapist_info, therapist_phone,
      child_name, age, gender, school,
      diagnosis_file_url, level
    } = registration;

    // Get existing user from Supabase Auth
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) {
      console.error('Auth list error:', authError);
      return res.status(500).json({ error: 'Failed to list users from Supabase Auth' });
    }

    let user = authUsers.users.find(u => u.email === email);

    // If user not found in Auth, create with static password
    if (!user) {
      const { data: createdUser, error: createError } = await supabase.auth.admin.createUser({
        email,
        password: 'ChangeMe123!',
        email_confirm: true
      });

      if (createError) {
        console.error('Auth user creation failed:', createError);
        return res.status(400).json({ error: `Auth Error: ${createError.message}` });
      }

      user = createdUser.user;
      console.log(`Created new user for ${email} with static password.`);
    }

    const userId = user.id;

    // Upsert into profiles
    const { error: profileError } = await supabase.from('profiles').upsert({
      id: userId,
      full_name: guardian_name,
      email,
      role: 'parent'
    });
    if (profileError) {
      console.error('Profile upsert error:', profileError);
      return res.status(500).json({ error: 'Failed to upsert profile' });
    }

    // Upsert into parents
    const { error: parentError } = await supabase.from('parents').upsert({
      user_id: userId,
      full_name: guardian_name,
      phone_number: phone,
      region,
      city,
      language,
      therapist_info,
      therapist_phone,
      request_status: 'approved'
    });
    if (parentError) {
      console.error('Parent upsert error:', parentError);
      return res.status(500).json({ error: 'Failed to upsert parent' });
    }

    // Insert into children
    const { error: childError } = await supabase.from('children').insert({
      full_name: child_name,
      age: parseInt(age),
      gender,
      current_school: school?.trim() || null,
      diagnosis_summary: diagnosis_file_url ? 'See attached file' : null,
      level: level || null,
      parent_id: userId,
      therapist_id: null
    });
    if (childError) {
      console.error('Child insert error:', childError);
      return res.status(500).json({ error: 'Failed to insert child' });
    }

    // Update registration status
    const { error: updateRegError } = await supabase
      .from('registrations')
      .update({
        request_status: 'approved',
        reviewed_at: new Date().toISOString()
      })
      .eq('id', registration_id);

    if (updateRegError) {
      console.error('Registration update error:', updateRegError);
      return res.status(500).json({ error: 'Failed to update registration status' });
    }

    return res.status(200).json({
      success: true,
      message: 'Registration approved and copied successfully',
      userId,
      email
    });
  } catch (err) {
    console.error('Approval error:', err);
    return res.status(500).json({ error: err.message || 'Unexpected error during approval' });
  }
});

// Reject Registration
router.post('/reject', async (req, res) => {
  const { id: registration_id, reason } = req.body;

  if (!registration_id) {
    return res.status(400).json({ error: 'Missing registration ID' });
  }

  try {
    const { error } = await supabase
      .from('registrations')
      .update({
        request_status: 'rejected',
        rejection_reason: reason || null,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', registration_id);

    if (error) {
      console.error('Rejection update error:', error);
      return res.status(500).json({ error: 'Failed to reject registration' });
    }

    return res.status(200).json({
      success: true,
      message: 'Registration rejected successfully'
    });
  } catch (err) {
    console.error('Rejection error:', err);
    return res.status(500).json({ error: err.message || 'Unexpected error during rejection' });
  }
});

module.exports = router;
