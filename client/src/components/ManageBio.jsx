import { useState, useEffect } from 'react';
import { useToast } from './CustomToast';
import api from '../utils/api';

const ManageBio = () => {
  const toast = useToast();
  const [bio, setBio] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    skills: '',
    email: '',
    github: '',
    linkedin: '',
    cvLink: '',
    imageUrl: '',
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
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBio();
  }, []);

  const fetchBio = async () => {
    try {
      const response = await api.get('/bio');
      setBio(response.data);
      setFormData({
        name: response.data.name,
        title: response.data.title,
        bio: response.data.bio,
        skills: response.data.skills.join(', '),
        email: response.data.email,
        github: response.data.github,
        linkedin: response.data.linkedin,
        cvLink: response.data.cvLink || '',
        imageUrl: response.data.imageUrl || '',
        education: {
          degree: response.data.education?.degree || '',
          institution: response.data.education?.institution || '',
          startDate: response.data.education?.startDate || '',
          endDate: response.data.education?.endDate || '',
          isCurrentlyPursuing: response.data.education?.isCurrentlyPursuing || false,
          currentSemester: response.data.education?.currentSemester || '',
          description: response.data.education?.description || ''
        }
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bio:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleEducationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      education: {
        ...formData.education,
        [name]: type === 'checkbox' ? checked : value
      }
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      toast.error('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    setUploading(true);
    try {
      const response = await api.post('/bio/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('🖼️ Image uploaded successfully!');
      setSelectedImage(null);
      setImagePreview(null);
      fetchBio();
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(error.response?.data?.message || '❌ Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const bioData = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim())
    };

    try {
      await api.put('/bio', bioData);
      toast.success('🎉 Bio updated successfully!');
      fetchBio();
    } catch (error) {
      console.error('Error updating bio:', error);
      toast.error(error.response?.data?.message || 'Failed to update bio');
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-600 dark:text-gray-400">Loading...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Manage Bio & Skills</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Skills (comma-separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              placeholder="MERN Stack, REST APIs, MongoDB, SQL, JavaScript"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">GitHub URL</label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">LinkedIn URL</label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2 border-t pt-6 mt-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Education Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={formData.education.degree}
                  onChange={handleEducationChange}
                  placeholder="e.g., BS Software Engineering"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Institution</label>
                <input
                  type="text"
                  name="institution"
                  value={formData.education.institution}
                  onChange={handleEducationChange}
                  placeholder="e.g., Superior University"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Start Date</label>
                <input
                  type="text"
                  name="startDate"
                  value={formData.education.startDate}
                  onChange={handleEducationChange}
                  placeholder="e.g., September 2022"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isCurrentlyPursuing"
                    checked={formData.education.isCurrentlyPursuing}
                    onChange={handleEducationChange}
                    className="w-5 h-5 text-primary focus:ring-2 focus:ring-primary rounded"
                  />
                  <span className="text-gray-700 font-semibold">Currently Pursuing this Degree</span>
                </label>
                <p className="text-sm text-gray-500 ml-7 mt-1">Check this if you are still studying</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {formData.education.isCurrentlyPursuing ? 'Expected Completion' : 'End Date'}
                </label>
                <input
                  type="text"
                  name="endDate"
                  value={formData.education.endDate}
                  onChange={handleEducationChange}
                  placeholder="e.g., May 2026"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Current Semester</label>
                <input
                  type="text"
                  name="currentSemester"
                  value={formData.education.currentSemester}
                  onChange={handleEducationChange}
                  placeholder="e.g., 8th Semester"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Description (Optional)</label>
                <textarea
                  name="description"
                  value={formData.education.description}
                  onChange={handleEducationChange}
                  rows="3"
                  placeholder="Add any additional details about your education, achievements, or coursework"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 border-t pt-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Profile Image</h3>
            <div className="space-y-4">
              {/* Current Image Preview */}
              {(bio?.imageUrl || imagePreview) && (
                <div className="flex items-center gap-4">
                  <img 
                    src={imagePreview || `http://localhost:5000${bio.imageUrl}`}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                  />
                  {!imagePreview && (
                    <span className="text-sm text-gray-600">Current profile image</span>
                  )}
                </div>
              )}
              
              {/* File Input */}
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {selectedImage && (
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    disabled={uploading}
                    className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500">Upload your profile image (Max 5MB, JPG/PNG/GIF)</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">CV/Resume Link</label>
            <input
              type="url"
              name="cvLink"
              value={formData.cvLink}
              onChange={handleChange}
              placeholder="https://drive.google.com/your-cv-link"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-sm text-gray-500 mt-1">Enter the URL where your CV is hosted (Google Drive, Dropbox, etc.)</p>
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-8 py-3 rounded hover:bg-secondary transition font-semibold"
        >
          Update Bio
        </button>
      </form>

      {/* Preview */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Preview</h3>
        <div className="space-y-2">
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Title:</strong> {formData.title}</p>
          <p><strong>Bio:</strong> {formData.bio}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <div>
            <strong>Skills:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.split(',').map((skill, index) => (
                <span key={index} className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBio;
