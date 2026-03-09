import React from 'react';

interface CnasLogoProps extends React.SVGProps<SVGSVGElement> {}

export const CnasLogo: React.FC<CnasLogoProps> = (props) => {
  const blue = "#2E86C1";

  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        {/* Arc path for Arabic text — from lower-left through top to lower-right */}
        <path
          id="cnasArabicArc"
          fill="none"
          d="M 62,320 A 218,218 0 1,1 438,320"
        />
      </defs>

      {/* ===== Double circle border ===== */}
      <circle cx="250" cy="250" r="244" fill="none" stroke={blue} strokeWidth="3.5" />
      <circle cx="250" cy="250" r="196" fill="none" stroke={blue} strokeWidth="2.5" />

      {/* ===== Arabic text along upper arc ===== */}
      <text
        style={{
          fontSize: '28px',
          fill: blue,
          fontFamily: "'Noto Sans Arabic', 'Traditional Arabic', 'Geeza Pro', 'Arabic Typesetting', Arial, sans-serif",
          fontWeight: 700,
        }}
        textAnchor="middle"
      >
        <textPath href="#cnasArabicArc" startOffset="50%">
          الصندوق الوطني للتأمينات الاجتماعية للعمال الأجراء
        </textPath>
      </text>

      {/* ===== Family silhouettes ===== */}

      {/* Large center figure (main adult — tallest, in back) */}
      <circle cx="250" cy="130" r="46" fill={blue} />
      <path
        d="M 196,178 C 196,166 304,166 304,178 L 296,278 C 294,294 206,294 204,278 Z"
        fill={blue}
      />

      {/* Medium left figure (second adult) */}
      <circle cx="178" cy="168" r="33" fill={blue} />
      <path
        d="M 142,202 C 142,192 214,192 214,202 L 210,268 C 209,280 149,280 148,268 Z"
        fill={blue}
      />

      {/* Small right figure (child) */}
      <circle cx="314" cy="183" r="27" fill={blue} />
      <path
        d="M 285,209 C 285,202 343,202 343,209 L 340,262 C 339,272 288,272 287,262 Z"
        fill={blue}
      />

      {/* ===== Protective hand / wave ===== */}
      <path
        d="M 105,268
           C 130,238 185,258 235,248
           C 280,240 340,242 395,268
           L 392,312
           C 355,296 300,306 250,308
           C 200,310 145,296 108,312
           Z"
        fill={blue}
      />

      {/* ===== CNAS text ===== */}
      <text
        x="250" y="400"
        style={{
          fontSize: '64px',
          fontWeight: 'bold',
          fill: blue,
          fontFamily: 'Arial, Helvetica, sans-serif',
          letterSpacing: '8px',
        }}
        textAnchor="middle"
      >
        CNAS
      </text>
    </svg>
  );
};
