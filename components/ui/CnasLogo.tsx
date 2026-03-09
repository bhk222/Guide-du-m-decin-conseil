import React from 'react';

interface CnasLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export const CnasLogo: React.FC<CnasLogoProps> = ({ className, style }) => {
  return (
    <img
      src="/cnas-logo.svg"
      alt="Logo CNAS"
      className={className}
      style={style}
      draggable={false}
    />
  );
};
