import Bio from '../models/Bio.js';
import path from 'path';
import fs from 'fs';

// @desc    Get bio information
// @route   GET /api/bio
// @access  Public
export const getBio = async (req, res) => {
  try {
    let bio = await Bio.findOne();
    
    // Create default bio if none exists
    if (!bio) {
      bio = await Bio.create({
        name: 'Umer Aziz',
        title: 'MERN Stack Developer',
        bio: 'Passionate MERN Stack Developer with expertise in building full-stack web applications. Experienced in creating scalable solutions using MongoDB, Express.js, React, and Node.js with a focus on clean code and best practices.',
        skills: ['MERN Stack', 'REST APIs', 'MongoDB', 'SQL', 'JavaScript', 'Python', 'Java', 'Git & GitHub'],
        email: 'umerazizgujjar009@gmail.com',
        github: 'https://github.com/umeraziz',
        linkedin: 'https://linkedin.com/in/umeraziz',
        education: {
          degree: '',
          institution: '',
          startDate: '',
          endDate: '',
          isCurrentlyPursuing: false,
          currentSemester: '',
          description: ''
        }
      });
    } else if (!bio.education) {
      // Initialize education if it doesn't exist
      bio.education = {
        degree: '',
        institution: '',
        startDate: '',
        endDate: '',
        isCurrentlyPursuing: false,
        currentSemester: '',
        description: ''
      };
      await bio.save();
    }
    
    res.json(bio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload profile image
// @route   POST /api/bio/upload-image
// @access  Private (Admin)
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Get the file URL
    const imageUrl = `/uploads/${req.file.filename}`;

    // Update bio with new image URL
    let bio = await Bio.findOne();
    
    if (bio) {
      // Delete old image if exists
      if (bio.imageUrl && bio.imageUrl.startsWith('/uploads/')) {
        const oldImagePath = path.join(process.cwd(), bio.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      bio.imageUrl = imageUrl;
      await bio.save();
    } else {
      bio = await Bio.create({ imageUrl });
    }

    res.json({ imageUrl, message: 'Image uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update bio information
// @route   PUT /api/bio
// @access  Private (Admin)
export const updateBio = async (req, res) => {
  try {
    let bio = await Bio.findOne();

    if (bio) {
      bio.name = req.body.name || bio.name;
      bio.title = req.body.title || bio.title;
      bio.bio = req.body.bio || bio.bio;
      bio.skills = req.body.skills || bio.skills;
      bio.email = req.body.email || bio.email;
      bio.github = req.body.github || bio.github;
      bio.linkedin = req.body.linkedin || bio.linkedin;
      bio.cvLink = req.body.cvLink !== undefined ? req.body.cvLink : bio.cvLink;
      bio.imageUrl = req.body.imageUrl !== undefined ? req.body.imageUrl : bio.imageUrl;
      
      // Update education fields
      if (req.body.education) {
        if (!bio.education) {
          bio.education = {};
        }
        bio.education = {
          degree: req.body.education.degree !== undefined ? req.body.education.degree : (bio.education.degree || ''),
          institution: req.body.education.institution !== undefined ? req.body.education.institution : (bio.education.institution || ''),
          startDate: req.body.education.startDate !== undefined ? req.body.education.startDate : (bio.education.startDate || ''),
          endDate: req.body.education.endDate !== undefined ? req.body.education.endDate : (bio.education.endDate || ''),
          isCurrentlyPursuing: req.body.education.isCurrentlyPursuing !== undefined ? req.body.education.isCurrentlyPursuing : (bio.education.isCurrentlyPursuing || false),
          currentSemester: req.body.education.currentSemester !== undefined ? req.body.education.currentSemester : (bio.education.currentSemester || ''),
          description: req.body.education.description !== undefined ? req.body.education.description : (bio.education.description || '')
        };
      }

      // Update work experience
      if (req.body.workExperience !== undefined) {
        bio.workExperience = req.body.workExperience;
      }

      // Update certifications
      if (req.body.certifications !== undefined) {
        bio.certifications = req.body.certifications;
      }

      const updatedBio = await bio.save();
      res.json(updatedBio);
    } else {
      // Create new bio if none exists
      bio = await Bio.create(req.body);
      res.status(201).json(bio);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
