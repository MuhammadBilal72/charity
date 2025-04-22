import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-4 mt-8">
      <div className="text-center text-sm">
        &copy; {new Date().getFullYear()} CharityConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
