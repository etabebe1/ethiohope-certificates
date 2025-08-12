import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const formatNameForFile = (name) => {
  return name.trim().replace(/\s+/g, ' ');
};

const ConfettiParticle = ({ emoji }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
        x: Math.random() * 100 - 50,
        scale: 0.5,
      }}
      animate={{
        opacity: [0, 1, 0],
        y: [0, Math.random() * 100 + 100],
        x: Math.random() * 100 - 50,
        rotate: Math.random() * 360,
        scale: [0.5, 1.2, 0.8],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
        ease: 'easeOut',
      }}
      className="absolute text-2xl pointer-events-none"
      style={{
        top: '-10%',
        left: `${Math.random() * 100}%`,
        zIndex: 0,
      }}
    >
      {emoji}
    </motion.div>
  );
};

function AuthorizedUser() {
  const [name, setName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confettiEmojis] = useState([
    '🎉',
    '🎊',
    '✨',
    '🌟',
    '🏆',
    '🎈',
    '🥇',
    '👏',
  ]);

  const validCredentials = {
    'Ermias Abebe': 'ETH00000',
    'Ahadu Million': 'ETH00001',
    'Kaleb Ayele': 'ETH00002',
    'Mahider Asfaw': 'ETH00003',
    'Tekleab Adane': 'ETH00004',
    'Samuel Guta': 'ETH00005',
    'Yafet Kassaye': 'ETH00006',
    'Yohana Million': 'ETH00007',
    'Yonathan Tewodros': 'ETH00008',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const cleanedName = formatNameForFile(name);

    setTimeout(() => {
      if (validCredentials[cleanedName] === regNumber) {
        setIsAuthorized(true);
        setError('');
      } else {
        setIsAuthorized(false);
        setError('Invalid name or registration number.');
      }
      setIsLoading(false);
    }, 800);
  };

  const getCertificatePath = () => {
    const cleaned = formatNameForFile(name);
    return `/certificates/${cleaned}.pdf`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-500 via-blue-500 to-indigo-500 flex items-center justify-center px-4 py-12">
      <AnimatePresence mode="wait">
        {!isAuthorized ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-100 rounded-full opacity-20"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-100 rounded-full opacity-20"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 flex flex-col items-center">
                <span className="text-indigo-600 mb-2">🎓</span>
                Access Your Certificate
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name + Surename
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your full name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    required
                    placeholder="e.g. ETH12345"
                  />
                </motion.div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center ${
                      isLoading ? 'opacity-80' : ''
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      'Get Certificate'
                    )}
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 relative overflow-hidden"
          >
            {/* Enhanced Confetti effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <ConfettiParticle
                  key={i}
                  emoji={
                    confettiEmojis[
                      Math.floor(Math.random() * confettiEmojis.length)
                    ]
                  }
                />
              ))}
            </div>

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.2,
                  type: 'spring',
                  stiffness: 500,
                  damping: 15,
                }}
                className="mx-auto w-24 h-24 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-lg"
              >
                <motion.span
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  className="text-4xl"
                >
                  🏆
                </motion.span>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-center text-gray-800 mb-4"
              >
                Congratulations,{' '}
                <span className="text-indigo-600">{name.split(' ')[0]}!</span>
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-700 text-center mb-2"
              >
                You have successfully completed the
              </motion.p>

              <motion.p
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="text-indigo-600 font-bold text-center text-lg mb-6"
              >
                Basic Programming Track
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col space-y-4"
              >
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href={getCertificatePath()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 text-center font-semibold"
                >
                  View Your Certificate
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsAuthorized(false);
                    setName('');
                    setRegNumber('');
                  }}
                  className="mt-4 bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium"
                >
                  Check Another Student
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 pt-6 border-t border-gray-100 text-center"
              >
                <p className="text-sm text-gray-500">
                  Need help? Contact contact@cyaxiom.com
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AuthorizedUser;
