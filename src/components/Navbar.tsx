import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Team', href: '/#team' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Admin', href: '/admin' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center text-white">
              <Smile size={24} />
            </div>
            <span className="text-xl font-bold font-display tracking-tight text-gray-900">
              Dr. Mehrotra Dental
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href.startsWith('/#') ? link.href.substring(1) : link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-blue",
                  location.pathname === link.href ? "text-brand-blue" : "text-gray-600"
                )}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#booking"
              className="bg-brand-blue text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-brand-dark transition-all transform hover:scale-105"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-brand-light rounded-lg"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4">
                <a
                  href="#booking"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-brand-blue text-white px-5 py-3 rounded-xl font-semibold"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
