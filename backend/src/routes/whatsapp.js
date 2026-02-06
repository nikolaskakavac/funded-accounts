const express = require('express');
const WhatsAppRequest = require('../models/WhatsAppRequest');

const router = express.Router();

// Submit WhatsApp call request
router.post('/request', async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber || phoneNumber.trim().length < 5) {
    return res.status(400).json({ message: 'Invalid phone number' });
  }

  try {
    const request = await WhatsAppRequest.create({
      phoneNumber: phoneNumber.trim(),
    });

    res.json({
      success: true,
      message: 'WhatsApp call request received',
      id: request._id,
    });
  } catch (err) {
    console.error('WhatsApp request error:', err);
    res.status(500).json({ message: 'Failed to save request' });
  }
});

// Get all WhatsApp requests (admin only)
router.get('/all', async (req, res) => {
  try {
    const requests = await WhatsAppRequest.find()
      .sort({ createdAt: -1 })
      .limit(50);

    const uncontactedCount = await WhatsAppRequest.countDocuments({ contacted: false });

    res.json({
      requests,
      uncontactedCount,
    });
  } catch (err) {
    console.error('Get WhatsApp requests error:', err);
    res.status(500).json({ message: 'Failed to fetch requests' });
  }
});

// Mark as contacted
router.patch('/:id/contacted', async (req, res) => {
  try {
    const request = await WhatsAppRequest.findByIdAndUpdate(
      req.params.id,
      { contacted: true },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json({ success: true, request });
  } catch (err) {
    console.error('Update WhatsApp request error:', err);
    res.status(500).json({ message: 'Failed to update request' });
  }
});

module.exports = router;
