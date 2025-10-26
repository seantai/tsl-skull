import { motion as m } from 'motion/react';
import { useSceneLoadedStore } from '../store';

export const LoadingIndicator = () => {
  const { isSceneLoaded } = useSceneLoadedStore();

  return (
    <m.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isSceneLoaded ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.26, 0.05, 0.25, 1] }}
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
      style={{ display: isSceneLoaded ? 'none' : 'flex' }}>
      <div className="relative">
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes scaleUp {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          .spinner-ring {
            animation: spin 2s linear infinite;
          }
          .spinner-core {
            animation: pulse 2s ease-in-out infinite, scaleUp 2s ease-in-out infinite;
          }
        `}</style>

        {/* Outer rotating ring */}
        <div className="spinner-ring absolute inset-0 h-24 w-24">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="loadingGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(0, 180, 255, 0.4)"
              strokeWidth="2"
              strokeDasharray="220 80"
              strokeLinecap="round"
              filter="url(#loadingGlow)"
            />
          </svg>
        </div>

        {/* Inner pulsing core */}
        <div className="spinner-core flex h-24 w-24 items-center justify-center">
          <svg
            className="h-12 w-12"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="rgba(100, 200, 255, 0.3)"
              filter="url(#loadingGlow)"
            />
            <circle
              cx="50"
              cy="50"
              r="15"
              fill="rgba(150, 220, 255, 0.6)"
              filter="url(#loadingGlow)"
            />
          </svg>
        </div>
      </div>
    </m.div>
  );
};
