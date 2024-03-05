import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-purple-600 to-indigo-600 text-white py-4">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} ChitChat Central</p>
      </div>
    </footer>
  );
};

export default Footer;