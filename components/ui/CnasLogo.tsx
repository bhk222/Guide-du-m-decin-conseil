import React from 'react';

interface CnasLogoProps extends React.SVGProps<SVGSVGElement> {}

export const CnasLogo: React.FC<CnasLogoProps> = (props) => {
  const blue = "#006FB8";
  const darkBlue = "#004A7C";
  return (
    <svg 
      viewBox="0 0 500 500" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="cnasBlueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0080D0" />
          <stop offset="100%" stopColor="#004A7C" />
        </linearGradient>
        {/* Arc paths for text */}
        <path 
          id="CnasArabicArc" 
          fill="none" 
          d="M 75,250 a 175,175 0 1,1 350,0" 
        />
        <path 
          id="CnasFrenchArc" 
          fill="none" 
          d="M 60,250 a 190,190 0 0,0 380,0" 
        />
      </defs>

      {/* Outer blue ring */}
      <circle cx="250" cy="250" r="248" fill="url(#cnasBlueGrad)" />
      {/* White fill */}
      <circle cx="250" cy="250" r="232" fill="white" />
      {/* Inner decorative ring */}
      <circle cx="250" cy="250" r="178" fill="none" stroke={blue} strokeWidth="2.5" opacity="0.6" />
      <circle cx="250" cy="250" r="174" fill="none" stroke={blue} strokeWidth="1" opacity="0.3" />

      {/* Arabic text on upper arc */}
      <text style={{ fontSize: '32px', fill: darkBlue, fontFamily: "'Noto Sans Arabic', 'Geeza Pro', 'Traditional Arabic', Arial, sans-serif", fontWeight: 600 }} textAnchor="middle">
        <textPath href="#CnasArabicArc" startOffset="50%">
          الصندوق الوطني للتأمينات الاجتماعية للعمال الأجراء
        </textPath>
      </text>

      {/* French text on lower arc */}
      <text style={{ fontSize: '16px', fill: darkBlue, fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '1px', fontWeight: 600 }} textAnchor="middle">
        <textPath href="#CnasFrenchArc" startOffset="50%">
          CAISSE NATIONALE DES ASSURANCES SOCIALES
        </textPath>
      </text>

      {/* Central pictogram: Family protected by hand */}
      <g transform="translate(250, 220)">
        {/* Large protective hand/arc */}
        <path 
          d="M -100,45 C -90,10 -60,-30 0,-45 C 60,-30 90,10 100,45" 
          fill="none" stroke={blue} strokeWidth="8" strokeLinecap="round"
        />
        
        {/* Adult figure (center-left) */}
        <circle cx="-30" cy="-5" r="16" fill={blue} />
        <path d="M -30,11 L -30,50 M -30,25 L -50,15 M -30,25 L -10,15 M -30,50 L -45,75 M -30,50 L -15,75" 
              stroke={blue} strokeWidth="5" strokeLinecap="round" fill="none" />

        {/* Adult figure (center-right) */}
        <circle cx="30" cy="-5" r="16" fill={blue} />
        <path d="M 30,11 L 30,50 M 30,25 L 10,15 M 30,25 L 50,15 M 30,50 L 15,75 M 30,50 L 45,75" 
              stroke={blue} strokeWidth="5" strokeLinecap="round" fill="none" />

        {/* Child figure (center) */}
        <circle cx="0" cy="15" r="11" fill={blue} />
        <path d="M 0,26 L 0,55 M 0,36 L -14,28 M 0,36 L 14,28 M 0,55 L -10,75 M 0,55 L 10,75" 
              stroke={blue} strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>

      {/* CNAS text */}
      <text x="250" y="400" style={{ fontSize: '62px', fontWeight: 'bold', fill: blue, fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '8px' }} textAnchor="middle">
        CNAS
      </text>

      {/* Decorative double line */}
      <line x1="160" y1="410" x2="340" y2="410" stroke={blue} strokeWidth="2" opacity="0.4" />
      <line x1="175" y1="416" x2="325" y2="416" stroke={blue} strokeWidth="1.5" opacity="0.25" />

      {/* Stars */}
      <circle cx="165" cy="370" r="4" fill={blue} opacity="0.5" />
      <circle cx="335" cy="370" r="4" fill={blue} opacity="0.5" />
    </svg>
  );
};
