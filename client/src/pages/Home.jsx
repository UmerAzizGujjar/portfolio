import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import ContactForm from '../components/ContactForm';
import WorkExperience from '../components/WorkExperience';
import Certifications from '../components/Certifications';
import api from '../utils/api';

const Home = () => {
  const [bio, setBio] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bioRes, projectsRes] = await Promise.all([
        api.get('/bio'),
        api.get('/projects')
      ]);
      setBio(bioRes.data);
      setProjects(projectsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Get all unique technologies from projects
  const allTechnologies = ['All', ...new Set(projects.flatMap(p => p.technologies || []))];

  // Filter projects based on search and technology
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = selectedTech === 'All' || project.technologies?.includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-purple-400 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-blue-950">
      <Helmet>
        <title>{bio?.name || 'Umer Aziz'} - {bio?.title || 'MERN Stack Developer'}</title>
        <meta name="description" content={bio?.bio || 'Full-Stack MERN Developer Portfolio showcasing projects and skills'} />
        <meta name="keywords" content="MERN Stack, Full Stack Developer, React, Node.js, MongoDB, Express, Portfolio" />
        <meta property="og:title" content={`${bio?.name || 'Umer Aziz'} - ${bio?.title || 'MERN Stack Developer'}`} />
        <meta property="og:description" content={bio?.bio} />
        <meta property="og:type" content="website" />
        {bio?.imageUrl && <meta property="og:image" content={`http://localhost:5000${bio.imageUrl}`} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${bio?.name || 'Umer Aziz'} - ${bio?.title}`} />
        <meta name="twitter:description" content={bio?.bio} />
      </Helmet>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Navbar />

      {/* Hero Section - Enhanced */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
        {/* Advanced Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-slate-950 dark:via-purple-950 dark:to-pink-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-purple-900/20 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJWMzRoLTJ6bTAtNGgydjJoLTJ2LTJ6bTAgNGgydjJoLTJ2LTJ6bTAtOGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bTQgMTZ2LTJoMnYyaC0yem00IDB2LTJoMnYyaC0yem0wLTR2LTJoMnYyaC0yem0wIDh2LTJoMnYyaC0yem0wLTEydi0yaDJ2MmgtMnptMC00di0yaDJ2MmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        {/* Dynamic Floating Elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            <div className="mb-8 animate-fadeInUp">
              {bio?.imageUrl && bio.imageUrl.trim() !== '' && (
                <div className="mb-12 flex justify-center">
                  <div className="relative group">
                    {/* Glowing rings effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-60 group-hover:opacity-100 animate-pulse transition duration-1000"></div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="relative">
                      <div className="w-48 h-48 md:w-56 md:h-56 rounded-full p-2 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 shadow-2xl transform group-hover:scale-105 transition duration-500">
                        <img 
                          src={bio.imageUrl.startsWith('/uploads') ? `http://localhost:5000${bio.imageUrl}` : bio.imageUrl}
                          alt={bio.name}
                          onError={(e) => { e.target.style.display = 'none'; }}
                          className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border-2 border-blue-400/40 rounded-full text-blue-200 text-sm font-semibold mb-6 shadow-lg hover:scale-105 transition-transform duration-300">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Available for hire 🚀
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-extrabold mb-8 text-white animate-fadeInUp leading-tight" style={{ animationDelay: '0.1s' }}>
              Hi, I'm{' '}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-2xl opacity-70"></span>
                <span className="relative bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-gradient">
                  {bio?.name || 'Umer Aziz'}
                </span>
              </span>
            </h1>
            
            <div className="mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                  {bio?.title || 'MERN Stack Developer'}
                </span>
              </h2>
              <div className="flex items-center justify-center gap-4 flex-wrap mt-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">Open to Opportunities</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white text-sm font-medium">Top Rated</span>
                </div>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-12 leading-relaxed animate-fadeInUp font-light" style={{ animationDelay: '0.3s' }}>
              {bio?.bio || 'Passionate MERN Stack Developer with expertise in building full-stack web applications.'}
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <a
                href="#projects"
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 transform hover:scale-110 overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  View My Work
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
              {bio?.cvLink && (
                <a
                  href={bio.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-110 flex items-center gap-3"
                >
                  <svg className="w-6 h-6 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume
                </a>
              )}
              <a
                href="#contact"
                className="px-10 py-5 bg-white/10 backdrop-blur-xl text-white border-3 border-white/40 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-110 shadow-xl"
              >
                Let's Talk 💬
              </a>
            </div>
            
            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-2">
                  {projects.length}+
                </div>
                <div className="text-gray-300 text-sm font-medium">Projects Done</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent mb-2">
                  {bio?.skills?.length || 0}+
                </div>
                <div className="text-gray-300 text-sm font-medium">Skills Mastered</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent mb-2">
                  {bio?.certifications?.length || 0}+
                </div>
                <div className="text-gray-300 text-sm font-medium">Certifications</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent mb-2">
                  {bio?.workExperience?.length || 0}+
                </div>
                <div className="text-gray-300 text-sm font-medium">Work Experience</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Education Section */}
      {bio?.education && (bio.education.degree || bio.education.institution) && (
        <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '4s' }}></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12 animate-fadeInUp">
                <div className="inline-flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h2 className="text-5xl font-bold mb-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                    Education
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  Academic Background & Qualifications
                </p>
              </div>

              {/* Education Card */}
              <div className="relative group animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                {/* Premium glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-700"></div>
                
                <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-800 dark:via-gray-800/90 dark:to-gray-900 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 border-2 border-gray-100 dark:border-gray-700 group-hover:border-transparent group-hover:shadow-3xl">
                  {/* Enhanced Header with animated gradient */}
                  <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-10 text-white overflow-hidden">
                    {/* Animated background orbs */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 animate-float"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full -ml-40 -mb-40 animate-float" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -ml-32 -mt-32 animate-pulse"></div>
                    
                    {/* Graduation cap icon */}
                    <div className="absolute top-6 right-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg"></div>
                        <div className="relative w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative max-w-3xl">
                      {bio.education.degree && (
                        <h3 className="text-4xl font-bold mb-4 flex items-start gap-4 leading-tight">
                          <span className="drop-shadow-2xl">{bio.education.degree}</span>
                        </h3>
                      )}
                      {bio.education.institution && (
                        <div className="flex items-center gap-3 text-xl text-white/95 font-semibold">
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <span className="drop-shadow-lg">{bio.education.institution}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="p-10">
                    {/* Timeline and Status Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                      {bio.education.startDate && (bio.education.endDate || bio.education.isCurrentlyPursuing) && (
                        <div className="group/item relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover/item:opacity-30 transition-opacity duration-300"></div>
                          <div className="relative flex items-center gap-4 bg-gradient-to-br from-blue-50 via-purple-50/50 to-white dark:from-blue-900/20 dark:via-purple-900/20 dark:to-gray-800 px-6 py-5 rounded-2xl border-2 border-blue-100 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl blur-md opacity-50"></div>
                              <div className="relative w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">Duration</p>
                              <p className="text-gray-900 dark:text-gray-100 font-bold text-lg">
                                {bio.education.startDate} - {bio.education.isCurrentlyPursuing ? (
                                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-pulse">Present</span>
                                ) : (
                                  bio.education.endDate
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {bio.education.currentSemester && (
                        <div className="group/item relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover/item:opacity-30 transition-opacity duration-300"></div>
                          <div className="relative flex items-center gap-4 bg-gradient-to-br from-purple-50 via-pink-50/50 to-white dark:from-purple-900/20 dark:via-pink-900/20 dark:to-gray-800 px-6 py-5 rounded-2xl border-2 border-purple-100 dark:border-purple-800/50 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl blur-md opacity-50"></div>
                              <div className="relative w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-xl">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">Current Progress</p>
                              <p className="text-gray-900 dark:text-gray-100 font-bold text-lg">{bio.education.currentSemester}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {bio.education.description && (
                      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Additional Details</h4>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{bio.education.description}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills Section - Enhanced */}
      <section id="skills" className="py-32 relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-purple-950 transition-colors">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 animate-float"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 animate-fadeInUp">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform duration-300">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
            </div>
            <h2 className="text-6xl font-extrabold mb-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </h2>
            <div className="h-2 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-6 shadow-lg"></div>
            <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto font-light">
              Mastering cutting-edge technologies to build exceptional digital experiences
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {bio?.skills?.map((skill, index) => {
              const skillIcons = {
                'MERN Stack': '🚀',
                'REST APIs': '🔌',
                'MongoDB': '🍃',
                'SQL': '🗄️',
                'JavaScript': '⚡',
                'Python': '🐍',
                'Java': '☕',
                'Git & GitHub': '🔧',
                'React': '⚛️',
                'Node.js': '💚',
                'Express': '🌐',
                'HTML': '📄',
                'CSS': '🎨',
                'Tailwind': '💨',
                'TypeScript': '📘',
                'Docker': '🐳',
                'AWS': '☁️',
                'Firebase': '🔥',
                'Next.js': '▲',
                'Redux': '🔄'
              };
              
              const skillColors = [
                'from-blue-500 to-cyan-500',
                'from-purple-500 to-pink-500',
                'from-emerald-500 to-teal-500',
                'from-orange-500 to-red-500',
                'from-yellow-500 to-amber-500',
                'from-indigo-500 to-blue-500'
              ];
              
              const icon = skillIcons[skill] || skill.charAt(0);
              const gradientColor = skillColors[index % skillColors.length];
              
              return (
                <div
                  key={index}
                  className="group relative animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${gradientColor} rounded-3xl blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-500`}></div>
                  
                  {/* Card */}
                  <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-gray-100 dark:border-gray-700 group-hover:border-transparent overflow-hidden">
                    {/* Background gradient on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    <div className="relative text-center">
                      {/* Icon with animation */}
                      <div className="text-6xl mb-5 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 filter drop-shadow-lg">
                        {icon}
                      </div>
                      
                      {/* Skill name */}
                      <span className="text-gray-800 dark:text-gray-200 font-bold text-lg block group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all">
                        {skill}
                      </span>
                      
                      {/* Proficiency indicator */}
                      <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${gradientColor} rounded-full transition-all duration-1000 group-hover:w-full`}
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Skill Categories Banner */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-white text-center">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold mb-2">Frontend</h3>
                <p className="text-blue-100">Building responsive & interactive UIs</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-white text-center">
                <div className="text-5xl mb-4">🛠️</div>
                <h3 className="text-2xl font-bold mb-2">Backend</h3>
                <p className="text-purple-100">Scalable server-side solutions</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-white text-center">
                <div className="text-5xl mb-4">💾</div>
                <h3 className="text-2xl font-bold mb-2">Database</h3>
                <p className="text-emerald-100">Efficient data management</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <WorkExperience 
        workExperience={bio?.workExperience || []} 
        showAll={showAllExperience}
        setShowAll={setShowAllExperience}
      />

      {/* Certifications Section */}
      <Certifications 
        certifications={bio?.certifications || []} 
        showAll={showAllCertifications}
        setShowAll={setShowAllCertifications}
      />

      {/* Projects Section */}
      <section id="projects" className="py-32 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-950 transition-colors duration-300">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-500/5 to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-fadeInUp">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform duration-300">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
            </div>
            <h2 className="text-6xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <div className="h-2 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-6 shadow-lg"></div>
            <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto font-light">
              Showcasing innovative solutions and impactful work in full-stack development
            </p>
          </div>

          {/* Search and Filter - Enhanced */}
          <div className="max-w-5xl mx-auto mb-16 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search projects by name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-8 py-6 pl-16 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-purple-900/50 transition-all outline-none text-lg shadow-xl placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  <svg className="w-7 h-7 text-blue-500 absolute left-5 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Technology Filter */}
            {allTechnologies.length > 1 && (
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filter by Technology
                </h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {allTechnologies.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => setSelectedTech(tech)}
                      className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg ${
                        selectedTech === tech
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-blue-500/50 scale-105'
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500'
                      }`}
                    >
                      {tech === 'All' && (
                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      )}
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {filteredProjects.length === 0 ? (
            <div className="text-center py-24">
              <div className="inline-block p-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-purple-900/20 dark:to-pink-900/20 rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-700 shadow-xl">
                <svg className="w-32 h-32 mx-auto text-gray-400 dark:text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="text-gray-600 dark:text-gray-400 text-2xl font-semibold mb-3">
                  {projects.length === 0 ? 'No projects yet. Check back soon!' : 'No projects match your search.'}
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-lg">
                  Try adjusting your filters or search query
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {(showAllProjects ? filteredProjects : filteredProjects.slice(0, 6)).map((project, index) => (
                  <div key={project._id} className="animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
              
              {filteredProjects.length > 6 && (
                <div className="text-center mt-12 animate-fadeInUp">
                  <button
                    onClick={() => setShowAllProjects(!showAllProjects)}
                    className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10">{showAllProjects ? 'Show Less' : `Show More (${filteredProjects.length - 6} more projects)`}</span>
                    <svg 
                      className={`relative z-10 w-5 h-5 transition-transform duration-300 ${showAllProjects ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJWMzRoLTJ6bTAtNGgydjJoLTJ2LTJ6bTAgNGgydjJoLTJ2LTJ6bTAtOGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bTQgMTZ2LTJoMnYyaC0yem00IDB2LTJoMnYyaC0yem0wLTR2LTJoMnYyaC0yem0wIDh2LTJoMnYyaC0yem0wLTEydi0yaDJ2MmgtMnptMC00di0yaDJ2MmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 animate-fadeInUp">
              <h2 className="text-5xl font-bold mb-4 text-white">
                Get In <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mb-4"></div>
              <p className="text-gray-300 text-lg">
                Have a question or want to work together? I'd love to hear from you!
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <ContactForm />
              </div>

              {/* Contact Info */}
              <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
                  <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    {bio?.email && (
                      <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Email</p>
                          <a href={`mailto:${bio.email}`} className="text-white font-semibold hover:text-blue-400 transition">
                            {bio.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {bio?.github && (
                      <a
                        href={bio.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                      >
                        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-400">GitHub</p>
                          <p className="text-white font-semibold group-hover:text-blue-400 transition">View Profile</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    )}

                    {bio?.linkedin && (
                      <a
                        href={bio.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                      >
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-400">LinkedIn</p>
                          <p className="text-white font-semibold group-hover:text-blue-400 transition">Connect With Me</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
