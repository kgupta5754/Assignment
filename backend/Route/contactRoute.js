
const express = require('express');
const router = express.Router();
const Contact = require('../model/contact');

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newContact = await Contact.create({ name, email });
    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error adding contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    await Contact.update({ name, email }, { where: { id } });
    res.sendStatus(204);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Contact.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
