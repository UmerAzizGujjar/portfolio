import Contact from '../models/Contact.js';
import { sendContactNotification } from '../config/email.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    console.log('💬 New contact form submission from:', name);

    const contact = await Contact.create({
      name,
      email,
      message
    });

    console.log('✅ Contact saved to database');

    // Send email notification (non-blocking)
    console.log('📧 Starting email notification process...');
    sendContactNotification({ name, email, message })
      .then(result => {
        if (result.success) {
          console.log('✅ Email notification sent successfully');
          console.log('Message ID:', result.messageId);
        } else {
          console.log('⚠️ Email notification failed:', result.error);
          console.log('Message saved in database, but email not sent');
        }
      })
      .catch(err => {
        console.error('❌ Email notification error:', err.message);
        console.error('Full error:', err);
      });

    res.status(201).json({
      message: 'Message sent successfully! I will get back to you soon.',
      contact
    });
  } catch (error) {
    console.error('❌ Error in submitContact:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (Admin)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark contact as read
// @route   PUT /api/contact/:id/read
// @access  Private (Admin)
export const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.isRead = true;
    await contact.save();

    res.json({ message: 'Marked as read', contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await contact.deleteOne();
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
