import mongoose from 'mongoose';

const bioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Umer Aziz'
  },
  title: {
    type: String,
    required: true,
    default: 'MERN Stack Developer'
  },
  bio: {
    type: String,
    required: true,
    default: 'Passionate MERN Stack Developer with expertise in building full-stack web applications. Skilled in MongoDB, Express.js, React, and Node.js.'
  },
  skills: [{
    type: String
  }],
  email: {
    type: String,
    required: true,
    default: 'umerazizgujjar009@gmail.com'
  },
  github: {
    type: String,
    default: 'https://github.com/umeraziz'
  },
  linkedin: {
    type: String,
    default: 'https://linkedin.com/in/umeraziz'
  },
  cvLink: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  education: {
    degree: {
      type: String,
      default: ''
    },
    institution: {
      type: String,
      default: ''
    },
    startDate: {
      type: String,
      default: ''
    },
    endDate: {
      type: String,
      default: ''
    },
    isCurrentlyPursuing: {
      type: Boolean,
      default: false
    },
    currentSemester: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  workExperience: [{
    jobTitle: {
      type: String,
      default: ''
    },
    company: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    startDate: {
      type: String,
      default: ''
    },
    endDate: {
      type: String,
      default: ''
    },
    isCurrentJob: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      default: ''
    },
    responsibilities: [{
      type: String
    }]
  }],
  certifications: [{
    title: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    }
  }]
}, {
  timestamps: true
});

const Bio = mongoose.model('Bio', bioSchema);

export default Bio;
