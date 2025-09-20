import React, { useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { BsKeyboard } from 'react-icons/bs';

const VoiceAssistant = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    // Add actual recording logic here
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Add logic to stop recording and process audio
  };

  const handleTypeInstead = () => {
    // Add logic to switch to text input mode
    console.log('Switch to text input');
  };

  // Wave animation styles
  const waveStyle = (index) => ({
    width: '4px',
    backgroundColor: '#3b82f6',
    borderRadius: '2px',
    animation: `waveAnimation 2.2s ease-in-out infinite`,
    animationDelay: `${index * 0.1}s`,
    height: '8px',
  });

  return (
    <>
      <style>
        {`
          @keyframes waveAnimation {
            0%, 40%, 100% {
              height: 8px;
              background-color: rgba(59, 130, 246, 0.4);
            }
            20% {
              height: 32px;
              background-color: rgb(59, 130, 246);
            }
          }
        `}
      </style>

      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-[#1a2332] text-white p-8 rounded-lg relative overflow-hidden">

        <div className="flex flex-col items-center justify-center z-10 w-full max-w-[600px] text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Hey! I'm your AI Financial Co-Pilot</h1>

          <p className="text-lg text-gray-300 mb-12">Tell me about your expenses or ask for any financial advice</p>

          {/* Microphone button with 3D effect */}
          <div className="relative mb-16">
            <button
              className={`w-32 h-32 rounded-full bg-gradient-to-tr from-[#0078d4] to-[#1e90ff] flex items-center justify-center cursor-pointer transform transition-all duration-300
              ${isRecording ? 'animate-pulse scale-95' : 'hover:-translate-y-1'}
              shadow-[0_10px_25px_rgba(0,120,212,0.4),inset_0_-5px_15px_rgba(255,255,255,0.1),inset_0_5px_15px_rgba(0,0,0,0.2)]`}
            // onClick={isRecording ? handleStopRecording : handleStartRecording}
            >
              <FaMicrophone className="text-5xl text-white drop-shadow-lg" />

              {/* Highlight overlay */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_70%)]"></div>
            </button>

            {/* Wave animation for recording state */}
            {isRecording && (
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex justify-center items-center gap-1">
                {[0, 1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    style={waveStyle(index)}
                  ></div>
                ))}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 mt-2">
            <button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className="px-6 py-3 rounded-full bg-gradient-to-tr from-[#0078d4] to-[#1e90ff] text-white flex items-center gap-2 font-medium shadow-lg hover:-translate-y-0.5 transition-transform duration-200"
            >
              <FaMicrophone />
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            <button
              onClick={handleTypeInstead}
              className="px-6 py-3 rounded-full bg-white/10 text-white flex items-center gap-2 font-medium border border-white/20 backdrop-blur-sm hover:-translate-y-0.5 transition-transform duration-200"
            >
              <BsKeyboard /> Type Instead
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoiceAssistant;