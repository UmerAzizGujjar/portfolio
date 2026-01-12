const WorkExperience = ({ workExperience, showAll, setShowAll }) => {
  if (!workExperience || workExperience.length === 0) {
    return null;
  }

  const displayedExperience = showAll ? workExperience : workExperience.slice(0, 3);

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-950 transition-colors duration-300">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          <h2 className="text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          <div className="h-2 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-4 shadow-lg"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
            My professional journey and career milestones
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="max-w-5xl mx-auto grid gap-6">
          {displayedExperience.map((exp, index) => (
            <div
              key={index}
              className="group relative animate-fadeInUp"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Premium outer glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-700"></div>
              
              <div className="relative bg-gradient-to-br from-white via-gray-50 to-blue-50/50 dark:from-gray-800 dark:via-gray-800/95 dark:to-gray-900 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700 group-hover:border-transparent overflow-hidden transition-all duration-500 group-hover:shadow-2xl">
                {/* Top accent bar */}
                <div className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                
                {/* Card content */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Left side - Timeline indicator */}
                    <div className="flex md:flex-col items-center md:items-start gap-3 md:w-32 flex-shrink-0">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl blur-lg opacity-40"></div>
                        <div className="relative w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Date badge */}
                      <div className="text-center md:text-left">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs shadow-md mb-1 ${
                          exp.isCurrentJob 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                            : 'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-200'
                        }`}>
                          <span className="whitespace-nowrap">{exp.startDate}</span>
                        </div>
                        <div className="text-xl font-black text-gray-400 dark:text-gray-600 my-0.5">↓</div>
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs shadow-md ${
                          exp.isCurrentJob 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white animate-pulse' 
                            : 'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-200'
                        }`}>
                          {exp.isCurrentJob ? (
                            <>
                              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                              <span>Present</span>
                            </>
                          ) : (
                            <span className="whitespace-nowrap">{exp.endDate}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Right side - Job details */}
                    <div className="flex-1">
                      {/* Job title and company */}
                      <div className="mb-4">
                        <h3 className="text-2xl font-extrabold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 dark:group-hover:from-blue-400 dark:group-hover:via-purple-400 dark:group-hover:to-pink-400 transition-all duration-300 leading-tight">
                          {exp.jobTitle}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg border border-blue-100 dark:border-blue-800/50">
                            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="font-bold text-sm text-gray-900 dark:text-gray-100">{exp.company}</span>
                          </div>
                          
                          {exp.location && (
                            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 text-sm">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="font-medium">{exp.location}</span>
                            </div>
                          )}
                          
                          {exp.isCurrentJob && (
                            <div className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-lg text-xs font-bold shadow-md flex items-center gap-1.5">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                              </svg>
                              ACTIVE
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Description */}
                      {exp.description && (
                        <div className="mb-4">
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed bg-gradient-to-r from-gray-50 to-blue-50/50 dark:from-gray-800/50 dark:to-gray-800/30 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                            {exp.description}
                          </p>
                        </div>
                      )}
                      
                      {/* Responsibilities */}
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <div className="w-1 h-5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
                            Key Responsibilities
                          </h4>
                          <div className="grid gap-2">
                            {exp.responsibilities.map((responsibility, idx) => (
                              <div key={idx} className="group/item flex items-start gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-300">
                                <div className="relative mt-0.5 flex-shrink-0">
                                  <div className="absolute inset-0 bg-emerald-400 rounded-md blur-sm opacity-40 group-hover/item:opacity-70 transition-opacity"></div>
                                  <div className="relative w-5 h-5 bg-gradient-to-br from-emerald-400 to-green-500 rounded-md flex items-center justify-center shadow-md">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                </div>
                                <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed flex-1">{responsibility}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Show More/Less Button */}
        {workExperience.length > 3 && (
          <div className="text-center mt-12 animate-fadeInUp">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">{showAll ? 'Show Less' : `Show More (${workExperience.length - 3} more experiences)`}</span>
              <svg 
                className={`relative z-10 w-5 h-5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkExperience;
