import React from 'react';

interface CnasLogoProps extends React.SVGProps<SVGSVGElement> {}

export const CnasLogo: React.FC<CnasLogoProps> = (props) => {
  const blue = "rgb(0, 111, 184)";
  return (
    <svg 
      viewBox="0 0 500 500" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        {/* This path defines the curve for the Arabic text */}
        <path 
          id="CnasLogoArabicTextPath" 
          fill="none" 
          d="M 85, 250 a 165,165 0 1,1 330,0" 
        />
      </defs>

      {/* Background and Rings based on the provided image */}
      <circle cx="250" cy="250" r="248" fill={blue} />
      <circle cx="250" cy="250" r="238" fill="white" />
      <circle cx="250" cy="250" r="185" fill="none" stroke={blue} strokeWidth="4" />

      {/* Text Elements */}
      <text style={{ fontSize: '38px', fill: blue, fontFamily: 'Arial, sans-serif', letterSpacing: '-0.5px' }} textAnchor="middle">
        <textPath href="#CnasLogoArabicTextPath" startOffset="50%">
          الصندوق الوطني للتأمينات الإجتماعية للعمال الأجراء
        </textPath>
      </text>
      <text x="250" y="415" style={{ fontSize: '55px', fontWeight: 'bold', fill: blue, fontFamily: 'Arial, sans-serif' }} textAnchor="middle">
        CNAS
      </text>

      {/* Pictogram: Hand and Figures */}
      <g fill={blue} transform="translate(0, 20)">
        {/* Central Figure */}
        <path d="M 250 145 A 35 35 0 1 1 249.9 145 Z M 210 180 h 80 v 20 a 40 40 0 0 1 -80 0 Z" />

        {/* Left Figure */}
        <path d="M 170 180 A 25 25 0 1 1 169.9 180 Z M 140 205 h 60 v 15 a 30 30 0 0 1 -60 0 Z" />
        
        {/* Right Figure */}
        <path d="M 330 180 A 25 25 0 1 1 329.9 180 Z M 300 205 h 60 v 15 a 30 30 0 0 1 -60 0 Z" />

        {/* Hand */}
        <path d="M 90,300 C 100,285 150,260 250,260 C 350,260 400,285 410,300 C 370,340 130,340 90,300 Z" />
      </g>
      
      {/* Bottom Wavy Lines */}
      <path d="M120,440 C250,420 250,420 380,440" stroke={blue} strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M130,455 C250,435 250,435 370,455" stroke={blue} strokeWidth="8" fill="none" strokeLinecap="round" />

    </svg>
  );
};
