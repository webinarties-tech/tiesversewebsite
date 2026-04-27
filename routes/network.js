const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const authMiddleware = require('../middleware/auth');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('network_images')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

router.post('/', authMiddleware, async (req, res) => {
    const { data, error } = await supabase
        .from('network_images')
        .insert(req.body);
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
});

router.put('/:id', authMiddleware, async (req, res) => {
    const { data, error } = await supabase
        .from('network_images')
        .update(req.body)
        .eq('id', req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

router.delete('/:id', authMiddleware, async (req, res) => {
    const { error } = await supabase
        .from('network_images')
        .delete()
        .eq('id', req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Deleted successfully' });
});

module.exports = router;
