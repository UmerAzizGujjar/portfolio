import Project from '../models/Project.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private (Admin)
export const createProject = async (req, res) => {
  try {
    const { title, description, technologies, github, liveLink, featured } = req.body;
    
    // Handle technologies - can be string or array
    const techArray = typeof technologies === 'string' 
      ? technologies.split(',').map(tech => tech.trim())
      : technologies;

    const projectData = {
      title,
      description,
      technologies: techArray,
      github,
      liveLink,
      featured: featured === 'true' || featured === true
    };

    // Handle image upload - Cloudinary URL
    if (req.file) {
      projectData.image = req.file.path; // Cloudinary URL
    }

    const project = await Project.create(projectData);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = req.body.title || project.title;
      project.description = req.body.description || project.description;
      
      // Handle technologies - can be string or array
      if (req.body.technologies) {
        project.technologies = typeof req.body.technologies === 'string' 
          ? req.body.technologies.split(',').map(tech => tech.trim())
          : req.body.technologies;
      }
      
      project.github = req.body.github || project.github;
      project.liveLink = req.body.liveLink || project.liveLink;
      project.featured = req.body.featured !== undefined ? req.body.featured : project.featured;
      
      // Handle image upload - Cloudinary URL
      if (req.file) {
        project.image = req.file.path; // Cloudinary URL
      } else if (req.body.existingImage) {
        project.image = req.body.existingImage;
      }

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
