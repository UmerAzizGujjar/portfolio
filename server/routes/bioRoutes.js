import express from 'express';
import { getBio, updateBio, uploadImage } from '../controllers/bioController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public route
router.get('/', getBio);

// Protected route (Admin only)
router.put('/', protect, updateBio);
router.post('/upload-image', protect, upload.single('image'), uploadImage);

export default router;
