// backend/routes/myStudents.js
const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET /api/my_students?therapist_id=<UUID>
router.get('/my_students', async (req, res) => {
  const { therapist_id } = req.query;

  if (!therapist_id) {
    return res.status(400).json({ error: 'Missing therapist_id' });
  }

  try {
    const { data, error } = await supabase
      .from('children')
      .select('id, full_name, age, gender, diagnosis_summary, parent_id')
      .eq('therapist_id', therapist_id);

    if (error) {
      console.error('Error fetching students:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ students: data });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: err.message || 'Unexpected server error' });
  }
});

module.exports = router;
