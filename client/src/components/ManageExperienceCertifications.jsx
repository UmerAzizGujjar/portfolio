import { useState, useEffect } from 'react';
import { useToast } from './CustomToast';
import api from '../utils/api';

const ManageExperienceCertifications = () => {
  const toast = useToast();
  const [bio, setBio] = useState(null);
  const [workExperience, setWorkExperience] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('experience'); // 'experience' or 'certifications'
  const [uploadingIndex, setUploadingIndex] = useState(null);

  useEffect(() => {
    fetchBio();
  }, []);

  const fetchBio = async () => {
    try {
      const response = await api.get('/bio');
      setBio(response.data);
      setWorkExperience(response.data.workExperience || []);
      setCertifications(response.data.certifications || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bio:', error);
      toast.error('Failed to load data');
      setLoading(false);
    }
  };

  const handleAddExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrentJob: false,
        description: '',
        responsibilities: ['']
      }
    ]);
  };

  const handleRemoveExperience = (index) => {
    setWorkExperience(workExperience.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...workExperience];
    updated[index] = { ...updated[index], [field]: value };
    setWorkExperience(updated);
  };

  const handleResponsibilityChange = (expIndex, respIndex, value) => {
    const updated = [...workExperience];
    updated[expIndex].responsibilities[respIndex] = value;
    setWorkExperience(updated);
  };

  const handleAddResponsibility = (expIndex) => {
    const updated = [...workExperience];
    updated[expIndex].responsibilities.push('');
    setWorkExperience(updated);
  };

  const handleRemoveResponsibility = (expIndex, respIndex) => {
    const updated = [...workExperience];
    updated[expIndex].responsibilities = updated[expIndex].responsibilities.filter((_, i) => i !== respIndex);
    setWorkExperience(updated);
  };

  const handleAddCertification = () => {
    setCertifications([
      ...certifications,
      {
        title: '',
        image: ''
      }
    ]);
  };

  const handleRemoveCertification = (index) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handleCertificationChange = (index, field, value) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    setCertifications(updated);
  };

  const handleCertificationImageUpload = async (index, file) => {
    if (!file) {
      toast.error('Please select an image first');
      return;
    }

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

    const formData = new FormData();
    formData.append('image', file);

    setUploadingIndex(index);
    try {
      const response = await api.post('/bio/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const imageUrl = response.data.imageUrl;
      handleCertificationChange(index, 'image', imageUrl);
      toast.success('🖼️ Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleSave = async () => {
    try {
      await api.put('/bio', {
        ...bio,
        workExperience,
        certifications
      });
      toast.success('🎉 Saved successfully!');
      fetchBio();
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('❌ Failed to save');
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-600 dark:text-gray-400">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Manage Experience & Certifications</h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'experience'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Work Experience
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'certifications'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Certifications
          </button>
        </div>

        {/* Work Experience Tab */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            {workExperience.map((exp, expIndex) => (
              <div key={expIndex} className="border border-gray-300 rounded-lg p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Experience #{expIndex + 1}</h3>
                  <button
                    onClick={() => handleRemoveExperience(expIndex)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Job Title *</label>
                    <input
                      type="text"
                      value={exp.jobTitle}
                      onChange={(e) => handleExperienceChange(expIndex, 'jobTitle', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Full Stack Developer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Company *</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(expIndex, 'company', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Tech Solutions Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => handleExperienceChange(expIndex, 'location', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., New York, USA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(expIndex, 'startDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Jan 2023"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">End Date</label>
                    <input
                      type="text"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(expIndex, 'endDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Dec 2024"
                      disabled={exp.isCurrentJob}
                    />
                  </div>
                  <div className="flex items-center pt-6">
                    <input
                      type="checkbox"
                      checked={exp.isCurrentJob}
                      onChange={(e) => handleExperienceChange(expIndex, 'isCurrentJob', e.target.checked)}
                      className="mr-2 w-5 h-5"
                    />
                    <label className="text-sm font-semibold">Currently working here</label>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(expIndex, 'description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Brief description of your role"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Key Responsibilities</label>
                  {exp.responsibilities && exp.responsibilities.map((resp, respIndex) => (
                    <div key={respIndex} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={resp}
                        onChange={(e) => handleResponsibilityChange(expIndex, respIndex, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Developed REST APIs"
                      />
                      <button
                        onClick={() => handleRemoveResponsibility(expIndex, respIndex)}
                        className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddResponsibility(expIndex)}
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    + Add Responsibility
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={handleAddExperience}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              + Add Work Experience
            </button>
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div className="space-y-6">
            {certifications.map((cert, certIndex) => (
              <div key={certIndex} className="border border-gray-300 rounded-lg p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Certification #{certIndex + 1}</h3>
                  <button
                    onClick={() => handleRemoveCertification(certIndex)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Certification Title *</label>
                    <input
                      type="text"
                      value={cert.title}
                      onChange={(e) => handleCertificationChange(certIndex, 'title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., AWS Certified Developer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">Certificate Image *</label>
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            handleCertificationImageUpload(certIndex, file);
                          }
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={uploadingIndex === certIndex}
                      />
                      {uploadingIndex === certIndex && (
                        <p className="text-sm text-blue-600">Uploading...</p>
                      )}
                      <p className="text-sm text-gray-600">
                        📁 Upload your certificate image (JPG, PNG, etc. - Max 5MB)
                      </p>
                    </div>
                  </div>

                  {cert.image && (
                    <div>
                      <label className="block text-sm font-semibold mb-2">Preview:</label>
                      <img
                        src={cert.image.startsWith('/uploads') ? `http://localhost:5000${cert.image}` : cert.image}
                        alt={cert.title || 'Certificate'}
                        className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button
              onClick={handleAddCertification}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              + Add Certification
            </button>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8">
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-lg hover:from-green-600 hover:to-emerald-600 transition font-bold text-lg shadow-lg"
          >
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageExperienceCertifications;
