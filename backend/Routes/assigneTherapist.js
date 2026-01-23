// backend/routes/assignTherapist.js
const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Create Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// POST /api/assign_therapist
router.post('/assign_therapist', async (req, res) => {
  console.log('Assign therapist request received:', req.body);
  
  const { child_id, therapist_id } = req.body;

  // Validate required fields
  if (!child_id || !therapist_id) {
    console.error('Missing required fields:', { child_id, therapist_id });
    return res.status(400).json({ 
      error: 'Missing required fields', 
      details: 'Both child_id and therapist_id are required' 
    });
  }

  // Validate UUID format (basic check)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(child_id) || !uuidRegex.test(therapist_id)) {
    console.error('Invalid UUID format:', { child_id, therapist_id });
    return res.status(400).json({ 
      error: 'Invalid UUID format', 
      details: 'Both child_id and therapist_id must be valid UUIDs' 
    });
  }

  try {
    // First, verify that both child and therapist exist
    const [childCheck, therapistCheck] = await Promise.all([
      supabase.from('children').select('id, full_name').eq('id', child_id).single(),
      supabase.from('profiles').select('id, full_name, role').eq('id', therapist_id).single()
    ]);

    if (childCheck.error) {
      console.error('Child not found:', childCheck.error);
      return res.status(404).json({ error: 'Child not found' });
    }

    if (therapistCheck.error) {
      console.error('Therapist not found:', therapistCheck.error);
      return res.status(404).json({ error: 'Therapist not found' });
    }

    if (therapistCheck.data.role !== 'therapist') {
      console.error('User is not a therapist:', therapistCheck.data.role);
      return res.status(400).json({ error: 'User is not a therapist' });
    }

    // Update the child's therapist_id
    const { data, error } = await supabase
      .from('children')
      .update({ therapist_id })
      .eq('id', child_id)
      .select('id, full_name, therapist_id');

    if (error) {
      console.error('Assignment error:', error);
      return res.status(500).json({ 
        error: 'Failed to assign therapist',
        details: error.message 
      });
    }

    console.log('Therapist assigned successfully:', {
      child: childCheck.data.full_name,
      therapist: therapistCheck.data.full_name
    });

    return res.status(200).json({
      success: true,
      message: 'Therapist assigned successfully',
      data: {
        child: childCheck.data,
        therapist: therapistCheck.data,
        assignment: data[0]
      },
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ 
      error: 'Unexpected server error',
      details: err.message 
    });
  }
});

module.exports = router;
