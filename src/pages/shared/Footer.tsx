import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-bold text-gray-700 mb-4">
              Contact Information
            </h4>
            <p className="text-gray-600">Email: contact@coworkbooker.com</p>
            <p className="text-gray-600">Phone: +123 456 7890</p>
            <p className="text-gray-600">
              Office Address: 123 Cowork St, Suite 456, City, Country
            </p>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="text-lg font-bold text-gray-700 mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Additional Links */}
          <div>
            <h4 className="text-lg font-bold text-gray-700 mb-4">
              Additional Links
            </h4>
            <div className="flex flex-col space-y-2">
              <Link
                to="/privacy-policy"
                className="text-gray-600 hover:text-gray-800"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-gray-600 hover:text-gray-800"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500">
          &copy; {new Date().getFullYear()} CoWorkBooker. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
