import React, { useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import { useThemeStore } from '../store/useThemeStore';
import { THEMES } from '../constants';

const CopyButton = ({ valueToCopy, iconColor = "#3b82f6" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!valueToCopy) return;
    try {
      await navigator.clipboard.writeText(valueToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      className="focus:outline-none"
      onClick={handleCopy}
      style={{ color: iconColor }}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
        />
      </svg>
    </button>
  );
};

const ProfilePage = () => {
  const { authUser, isLoading } = useAuthUser();
  const UserData = authUser?.user;
  const { theme } = useThemeStore();

  // Find current theme colors
  const currentTheme = THEMES.find(t => t.name === theme) || THEMES[0];
  const [primaryColor, secondaryColor] = currentTheme.colors;

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: primaryColor }}>
      <div 
        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
        style={{ borderColor: secondaryColor }}
      ></div>
    </div>
  );

  return (
    <div className="flex justify-center p-4">
      <div 
        className="w-full h-full max-w-3xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div 
          style={{ 
            backgroundColor: `#191e24`,
            color: '#ffffff'
          }}
          className="flex flex-col md:flex-row gap-6 p-6 md:p-8 "
        >
          {/* Profile Picture - Responsive container */}
          <div className="flex flex-col items-center text-center mb-6 md:mb-0 md:mr-6">
            <div className="relative mb-4">
              <img
                src={UserData?.profilePic}
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 shadow-xl"
                style={{ 
                  borderColor: primaryColor,
                  boxShadow: `0 10px 25px -5px ${primaryColor}40`
                }}
              />
            </div>
            
            {/* Bio section - Responsive layout */}
            <div className="flex flex-col md:flex-row items-center">
              <pre className='italic font-serif text-green-500 pt-0.5 mr-1'>bio:</pre>
              <pre className="italic font-serif text-base md:text-lg text-gray-300 text-center md:text-left">
                {UserData?.bio || "No bio provided"}
              </pre>
            </div>
          </div>

          {/* Profile Info - Responsive width */}
          <div className="flex-grow">
            <div className="space-y-4">
              {[
                { label: "Full Name", value: UserData?.fullName },
                { label: "Email", value: UserData?.email },
                { label: "Learning Language", value: UserData?.learningLanguage },
                { label: "Native Language", value: UserData?.nativeLanguage },
                { label: "Location", value: UserData?.location }
              ].map((field, index) => (
                <div key={index} className="group">
                  <label 
                    className="block text-sm font-medium mb-1"
                    style={{ color: 'white' }}
                  >
                    {field.label}
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={field.value || ''}
                      readOnly
                      className="w-full p-3 rounded-lg bg-[#1f242c] border border-gray-700 text-white placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <CopyButton valueToCopy={field.value} iconColor={primaryColor} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;