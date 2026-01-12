import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✓ Connected to MongoDB');

    // User Schema
    const userSchema = new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      role: String
    });

    const User = mongoose.model('User', userSchema);

    // Check if admin exists
    const existingAdmin = await User.findOne({ email: 'umerazizgujjar009@gmail.com' });
    
    if (existingAdmin) {
      console.log('✓ Admin account already exists');
      console.log('  Email: umerazizgujjar009@gmail.com');
    } else {
      // Create admin account
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);

      await User.create({
        username: 'admin',
        email: 'umerazizgujjar009@gmail.com',
        password: hashedPassword,
        role: 'admin'
      });

      console.log('✓ Admin account created successfully!');
      console.log('  Email: umerazizgujjar009@gmail.com');
      console.log('  Password: admin123');
    }

    // Bio Schema
    const bioSchema = new mongoose.Schema({
      name: String,
      title: String,
      bio: String,
      skills: [String],
      email: String,
      github: String,
      linkedin: String
    });

    const Bio = mongoose.model('Bio', bioSchema);

    // Check if bio exists
    const existingBio = await Bio.findOne();
    
    if (!existingBio) {
      await Bio.create({
        name: 'Umer Aziz',
        title: 'MERN Stack Developer',
        bio: 'Passionate MERN Stack Developer with expertise in building full-stack web applications. Experienced in creating scalable solutions using MongoDB, Express.js, React, and Node.js with a focus on clean code and best practices.',
        skills: ['MERN Stack', 'REST APIs', 'MongoDB', 'SQL', 'JavaScript', 'Python', 'Java', 'Git & GitHub'],
        email: 'umerazizgujjar009@gmail.com',
        github: 'https://github.com/umeraziz',
        linkedin: 'https://linkedin.com/in/umeraziz'
      });
      console.log('✓ Default bio created');
    } else {
      console.log('✓ Bio already exists');
    }

    console.log('\n✅ Setup Complete!');
    console.log('\nYou can now:');
    console.log('1. Start the backend: cd server && npm start');
    console.log('2. Start the frontend: cd client && npm run dev');
    console.log('3. Login at http://localhost:3000/login');
    console.log('   Email: umerazizgujjar009@gmail.com');
    console.log('   Password: admin123');

    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
