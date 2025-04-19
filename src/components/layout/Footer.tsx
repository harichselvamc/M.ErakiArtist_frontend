import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin, Heart, PenTool } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-950 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <PenTool className="h-6 w-6" />
              <div>
                <h3 className="text-xl font-display font-bold leading-none">M.ErakiArtist</h3>
                <p className="text-xs font-light tracking-wider text-primary-200">memories into painting</p>
              </div>
            </Link>
            <p className="text-primary-200 mb-6">
              Custom faceless art, calligraphy, hampers, invitations, and more. Turn your memories into beautiful art pieces.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-200 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-200 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="https://wa.me/7598068106" target="_blank" rel="noopener noreferrer" className="text-primary-200 hover:text-white transition-colors">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Information</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-1 flex-shrink-0 text-primary-200" />
                <span>+91 7598068106</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 flex-shrink-0 text-primary-200" />
                <span>harichselvamc@gmail.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-primary-200" />
                <span>Tamil Nadu, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-800 text-center text-primary-300 text-sm">
          <p>© {currentYear} M. ErakiArtist. All rights reserved.</p>
          <p className="mt-2 flex items-center justify-center">
            Made with <Heart size={14} className="mx-1 text-accent-500" /> for artistic expressions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;