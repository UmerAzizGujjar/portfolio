import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Protected routes (Admin only)
router.post('/', protect, upload.single('projectImage'), createProject);
router.put('/:id', protect, upload.single('projectImage'), updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
