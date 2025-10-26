import { motion as m } from 'motion/react';

export const UIFrame = () => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.26, 0.05, 0.25, 1] }}
      className="pointer-events-none fixed inset-0 z-19">
      <style>{`
        @keyframes floatUpDown1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3%); }
        }
        @keyframes floatUpDown2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3%); }
        }
        @keyframes floatLeftRight1 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3%); }
        }
        @keyframes floatLeftRight2 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-3%); }
        }
        @keyframes pulseOpacity1 {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }
        @keyframes pulseOpacity2 {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        @keyframes pulseOpacity3 {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes pulseOpacity4 {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.85; }
        }
        @keyframes pulseOpacity5 {
          0%, 100% { opacity: 0.65; }
          50% { opacity: 0.95; }
        }
        @keyframes pulseOpacity6 {
          0%, 100% { opacity: 0.57; }
          50% { opacity: 0.87; }
        }
        @keyframes pulseOpacity7 {
          0%, 100% { opacity: 0.58; }
          50% { opacity: 0.88; }
        }
        @keyframes pulseOpacity8 {
          0%, 100% { opacity: 0.53; }
          50% { opacity: 0.83; }
        }
        @keyframes pulseOpacity9 {
          0%, 100% { opacity: 0.68; }
          50% { opacity: 0.98; }
        }
        @keyframes pulseOpacity10 {
          0%, 100% { opacity: 0.52; }
          50% { opacity: 0.82; }
        }
        @keyframes pulseOpacity11 {
          0%, 100% { opacity: 0.62; }
          50% { opacity: 0.92; }
        }
        @keyframes pulseOpacity12 {
          0%, 100% { opacity: 0.56; }
          50% { opacity: 0.86; }
        }
        @keyframes pulseOpacity13 {
          0%, 100% { opacity: 0.59; }
          50% { opacity: 0.89; }
        }
        @keyframes pulseOpacity14 {
          0%, 100% { opacity: 0.61; }
          50% { opacity: 0.91; }
        }
        @keyframes pulseOpacity15 {
          0%, 100% { opacity: 0.54; }
          50% { opacity: 0.84; }
        }
        @keyframes pulseOpacity16 {
          0%, 100% { opacity: 0.51; }
          50% { opacity: 0.81; }
        }
        @keyframes pulseOpacity17 {
          0%, 100% { opacity: 0.64; }
          50% { opacity: 0.94; }
        }
        @keyframes pulseOpacity18 {
          0%, 100% { opacity: 0.63; }
          50% { opacity: 0.93; }
        }
        .animate-float-1 { animation: floatUpDown1 3.5s ease-in-out infinite, pulseOpacity1 3.5s ease-in-out infinite; }
        .animate-float-2 { animation: floatUpDown1 4s ease-in-out infinite, pulseOpacity2 4s ease-in-out infinite; }
        .animate-float-3 { animation: floatUpDown1 5s ease-in-out infinite, pulseOpacity3 5s ease-in-out infinite; }
        .animate-float-4 { animation: floatUpDown2 4.8s ease-in-out infinite, pulseOpacity4 4.8s ease-in-out infinite; }
        .animate-float-5 { animation: floatUpDown1 5.2s ease-in-out infinite, pulseOpacity1 5.2s ease-in-out infinite; }
        .animate-float-6 { animation: floatUpDown1 4.3s ease-in-out infinite, pulseOpacity5 4.3s ease-in-out infinite; }
        .animate-float-7 { animation: floatUpDown2 5s ease-in-out infinite, pulseOpacity2 5s ease-in-out infinite; }
        .animate-float-8 { animation: floatUpDown2 4.6s ease-in-out infinite, pulseOpacity7 4.6s ease-in-out infinite; }
        .animate-float-9 { animation: floatUpDown1 5.5s ease-in-out infinite, pulseOpacity8 5.5s ease-in-out infinite; }
        .animate-float-10 { animation: floatUpDown2 4.2s ease-in-out infinite, pulseOpacity6 4.2s ease-in-out infinite; }
        .animate-float-11 { animation: floatUpDown2 5.8s ease-in-out infinite, pulseOpacity9 5.8s ease-in-out infinite; }
        .animate-float-12 { animation: floatUpDown1 4.4s ease-in-out infinite, pulseOpacity10 4.4s ease-in-out infinite; }
        .animate-float-13 { animation: floatUpDown2 5.1s ease-in-out infinite, pulseOpacity1 5.1s ease-in-out infinite; }
        .animate-float-14 { animation: floatUpDown1 4.7s ease-in-out infinite, pulseOpacity11 4.7s ease-in-out infinite; }
        .animate-float-15 { animation: floatUpDown2 5.3s ease-in-out infinite, pulseOpacity12 5.3s ease-in-out infinite; }
        .animate-float-16 { animation: floatUpDown1 4.9s ease-in-out infinite, pulseOpacity13 4.9s ease-in-out infinite; }
        .animate-float-17 { animation: floatUpDown2 6s ease-in-out infinite, pulseOpacity2 6s ease-in-out infinite; }
        .animate-float-18 { animation: floatUpDown1 5.4s ease-in-out infinite, pulseOpacity14 5.4s ease-in-out infinite; }
        .animate-float-19 { animation: floatLeftRight1 4.1s ease-in-out infinite, pulseOpacity15 4.1s ease-in-out infinite; }
        .animate-float-20 { animation: floatLeftRight2 5.6s ease-in-out infinite, pulseOpacity16 5.6s ease-in-out infinite; }
        .animate-float-21 { animation: floatLeftRight1 4.5s ease-in-out infinite, pulseOpacity2 4.5s ease-in-out infinite; }
        .animate-float-22 { animation: floatLeftRight2 5.7s ease-in-out infinite, pulseOpacity17 5.7s ease-in-out infinite; }
        .animate-float-23 { animation: floatLeftRight1 4.8s ease-in-out infinite, pulseOpacity4 4.8s ease-in-out infinite; }
        .animate-float-24 { animation: floatLeftRight2 5.2s ease-in-out infinite, pulseOpacity7 5.2s ease-in-out infinite; }
        .animate-float-25 { animation: floatLeftRight1 4.4s ease-in-out infinite, pulseOpacity18 4.4s ease-in-out infinite; }
        .animate-float-26 { animation: floatLeftRight2 5.9s ease-in-out infinite, pulseOpacity12 5.9s ease-in-out infinite; }
        .animate-float-27 { animation: floatLeftRight1 5.5s ease-in-out infinite, pulseOpacity1 5.5s ease-in-out infinite; }
        .animate-float-28 { animation: floatLeftRight2 4.6s ease-in-out infinite, pulseOpacity1 4.6s ease-in-out infinite; }
        .animate-float-29 { animation: floatLeftRight1 5.3s ease-in-out infinite, pulseOpacity14 5.3s ease-in-out infinite; }
        .animate-float-30 { animation: floatLeftRight2 4.7s ease-in-out infinite, pulseOpacity6 4.7s ease-in-out infinite; }
        .animate-float-31 { animation: floatLeftRight1 5.1s ease-in-out infinite, pulseOpacity13 5.1s ease-in-out infinite; }
        .animate-float-32 { animation: floatLeftRight2 4.9s ease-in-out infinite, pulseOpacity15 4.9s ease-in-out infinite; }
        .animate-float-33 { animation: floatLeftRight1 5.4s ease-in-out infinite, pulseOpacity12 5.4s ease-in-out infinite; }
        .animate-float-34 { animation: floatLeftRight2 4.3s ease-in-out infinite, pulseOpacity11 4.3s ease-in-out infinite; }
      `}</style>
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none">
        <defs>
          {/* Glowing filter for the tendrils */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Stronger glow for outer edges */}
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left flowing tendrils - hidden on mobile */}
        <path
          className="max-sm:hidden"
          d="M 0,0 Q 8,15 0,20 Q 12,25 0,30 Q 10,35 0,40 Q 15,45 0,50 Q 10,55 0,60 Q 12,65 0,70 Q 8,75 0,80 Q 12,85 0,90 Q 10,95 0,100 L 20,100 Q 18,95 20,90 Q 22,85 20,80 Q 18,75 20,70 Q 22,65 20,60 Q 18,55 20,50 Q 22,45 20,40 Q 18,35 20,30 Q 22,25 20,20 Q 18,15 20,10 L 20,0 Z"
          fill="none"
          stroke="rgba(0, 180, 255, 0.35)"
          strokeWidth="0.15"
          filter="url(#glow)"
        />

        {/* Right flowing tendrils - hidden on mobile */}
        <path
          className="max-sm:hidden"
          d="M 100,0 Q 92,15 100,20 Q 88,25 100,30 Q 90,35 100,40 Q 85,45 100,50 Q 90,55 100,60 Q 88,65 100,70 Q 92,75 100,80 Q 88,85 100,90 Q 90,95 100,100 L 80,100 Q 82,95 80,90 Q 78,85 80,80 Q 82,75 80,70 Q 78,65 80,60 Q 82,55 80,50 Q 78,45 80,40 Q 82,35 80,30 Q 78,25 80,20 Q 82,15 80,10 L 80,0 Z"
          fill="none"
          stroke="rgba(0, 180, 255, 0.35)"
          strokeWidth="0.15"
          filter="url(#glow)"
        />

        {/* Top flowing tendrils - visible only on mobile */}
        <path
          className="sm:hidden"
          d="M 0,0 Q 15,8 20,0 Q 25,12 30,0 Q 35,10 40,0 Q 45,15 50,0 Q 55,10 60,0 Q 65,12 70,0 Q 75,8 80,0 Q 85,12 90,0 Q 95,10 100,0 L 100,20 Q 95,18 90,20 Q 85,22 80,20 Q 75,18 70,20 Q 65,22 60,20 Q 55,18 50,20 Q 45,22 40,20 Q 35,18 30,20 Q 25,22 20,20 Q 15,18 10,20 L 0,20 Z"
          fill="none"
          stroke="rgba(0, 180, 255, 0.35)"
          strokeWidth="0.15"
          filter="url(#glow)"
        />

        {/* Bottom flowing tendrils - visible only on mobile */}
        <path
          className="sm:hidden"
          d="M 0,100 Q 15,92 20,100 Q 25,88 30,100 Q 35,90 40,100 Q 45,85 50,100 Q 55,90 60,100 Q 65,88 70,100 Q 75,92 80,100 Q 85,88 90,100 Q 95,90 100,100 L 100,80 Q 95,82 90,80 Q 85,78 80,80 Q 75,82 70,80 Q 65,78 60,80 Q 55,82 50,80 Q 45,78 40,80 Q 35,82 30,80 Q 25,78 20,80 Q 15,82 10,80 L 0,80 Z"
          fill="none"
          stroke="rgba(0, 180, 255, 0.35)"
          strokeWidth="0.15"
          filter="url(#glow)"
        />

        {/* Inner corner accents - top left */}
        <path
          d="M 5,5 Q 8,8 5,12 Q 10,10 15,8 Q 12,12 18,15"
          fill="none"
          stroke="rgba(100, 200, 255, 0.6)"
          strokeWidth="0.2"
          filter="url(#strongGlow)"
        />

        {/* Inner corner accents - top right */}
        <path
          d="M 95,5 Q 92,8 95,12 Q 90,10 85,8 Q 88,12 82,15"
          fill="none"
          stroke="rgba(100, 200, 255, 0.6)"
          strokeWidth="0.2"
          filter="url(#strongGlow)"
        />

        {/* Inner corner accents - bottom left */}
        <path
          d="M 5,95 Q 8,92 5,88 Q 10,90 15,92 Q 12,88 18,85"
          fill="none"
          stroke="rgba(100, 200, 255, 0.6)"
          strokeWidth="0.2"
          filter="url(#strongGlow)"
        />

        {/* Inner corner accents - bottom right */}
        <path
          d="M 95,95 Q 92,92 95,88 Q 90,90 85,92 Q 88,88 82,85"
          fill="none"
          stroke="rgba(100, 200, 255, 0.6)"
          strokeWidth="0.2"
          filter="url(#strongGlow)"
        />

        {/* Floating organic particles - no blur filter */}
        {/* Left column circles - hidden on mobile */}
        <circle className="max-sm:hidden animate-float-1" cx="8" cy="15" r="0.25" fill="rgba(150, 220, 255, 0.6)" />
        <circle className="max-sm:hidden animate-float-2" cx="15" cy="25" r="0.3" fill="rgba(150, 220, 255, 0.5)" />
        <circle className="max-sm:hidden animate-float-3" cx="12" cy="35" r="0.22" fill="rgba(100, 200, 255, 0.7)" />
        <circle className="max-sm:hidden animate-float-4" cx="18" cy="45" r="0.28" fill="rgba(150, 220, 255, 0.55)" />
        <circle className="max-sm:hidden animate-float-5" cx="10" cy="55" r="0.26" fill="rgba(120, 210, 255, 0.6)" />
        <circle className="max-sm:hidden animate-float-6" cx="16" cy="65" r="0.24" fill="rgba(150, 220, 255, 0.65)" />
        <circle className="max-sm:hidden animate-float-7" cx="12" cy="75" r="0.3" fill="rgba(150, 220, 255, 0.5)" />
        <circle className="max-sm:hidden animate-float-8" cx="14" cy="85" r="0.27" fill="rgba(130, 215, 255, 0.58)" />
        <circle className="max-sm:hidden animate-float-9" cx="8" cy="92" r="0.23" fill="rgba(150, 220, 255, 0.53)" />

        {/* Right column circles - hidden on mobile */}
        <circle className="max-sm:hidden animate-float-10" cx="92" cy="15" r="0.29" fill="rgba(140, 218, 255, 0.57)" />
        <circle className="max-sm:hidden animate-float-11" cx="85" cy="25" r="0.26" fill="rgba(150, 220, 255, 0.68)" />
        <circle className="max-sm:hidden animate-float-12" cx="88" cy="35" r="0.32" fill="rgba(145, 219, 255, 0.52)" />
        <circle className="max-sm:hidden animate-float-13" cx="90" cy="45" r="0.25" fill="rgba(150, 220, 255, 0.6)" />
        <circle className="max-sm:hidden animate-float-14" cx="84" cy="55" r="0.23" fill="rgba(135, 217, 255, 0.62)" />
        <circle className="max-sm:hidden animate-float-15" cx="92" cy="65" r="0.28" fill="rgba(150, 220, 255, 0.56)" />
        <circle className="max-sm:hidden animate-float-16" cx="88" cy="75" r="0.26" fill="rgba(148, 221, 255, 0.59)" />
        <circle className="max-sm:hidden animate-float-17" cx="85" cy="85" r="0.3" fill="rgba(150, 220, 255, 0.5)" />
        <circle className="max-sm:hidden animate-float-18" cx="92" cy="92" r="0.24" fill="rgba(142, 216, 255, 0.61)" />

        {/* Top row circles - visible only on mobile */}
        <circle className="sm:hidden animate-float-19" cx="15" cy="8" r="0.27" fill="rgba(150, 220, 255, 0.54)" />
        <circle className="sm:hidden animate-float-20" cx="25" cy="12" r="0.31" fill="rgba(147, 219, 255, 0.51)" />
        <circle className="sm:hidden animate-float-21" cx="35" cy="10" r="0.3" fill="rgba(150, 220, 255, 0.5)" />
        <circle className="sm:hidden animate-float-22" cx="45" cy="14" r="0.22" fill="rgba(138, 214, 255, 0.64)" />
        <circle className="sm:hidden animate-float-23" cx="55" cy="12" r="0.29" fill="rgba(150, 220, 255, 0.55)" />
        <circle className="sm:hidden animate-float-24" cx="65" cy="8" r="0.26" fill="rgba(143, 218, 255, 0.58)" />
        <circle className="sm:hidden animate-float-25" cx="75" cy="10" r="0.23" fill="rgba(150, 220, 255, 0.63)" />
        <circle className="sm:hidden animate-float-26" cx="85" cy="12" r="0.28" fill="rgba(146, 217, 255, 0.56)" />

        {/* Bottom row circles - visible only on mobile */}
        <circle className="sm:hidden animate-float-27" cx="15" cy="92" r="0.25" fill="rgba(150, 220, 255, 0.6)" />
        <circle className="sm:hidden animate-float-28" cx="25" cy="88" r="0.25" fill="rgba(150, 220, 255, 0.6)" />
        <circle className="sm:hidden animate-float-29" cx="35" cy="90" r="0.24" fill="rgba(141, 215, 255, 0.61)" />
        <circle className="sm:hidden animate-float-30" cx="45" cy="92" r="0.27" fill="rgba(150, 220, 255, 0.57)" />
        <circle className="sm:hidden animate-float-31" cx="55" cy="88" r="0.26" fill="rgba(148, 219, 255, 0.59)" />
        <circle className="sm:hidden animate-float-32" cx="65" cy="92" r="0.3" fill="rgba(150, 220, 255, 0.54)" />
        <circle className="sm:hidden animate-float-33" cx="75" cy="90" r="0.28" fill="rgba(145, 217, 255, 0.56)" />
        <circle className="sm:hidden animate-float-34" cx="85" cy="88" r="0.23" fill="rgba(150, 220, 255, 0.62)" />
      </svg>
    </m.div>
  );
};
