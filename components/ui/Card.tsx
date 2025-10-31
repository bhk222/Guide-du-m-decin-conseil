
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-primary-50 rounded-xl p-4 shadow-md ${className}`} {...props}>
      {children}
    </div>
  );
};