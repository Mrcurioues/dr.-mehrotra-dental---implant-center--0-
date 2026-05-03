import { Smile, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center text-white">
                <Smile size={24} />
              </div>
              <span className="text-2xl font-bold font-display tracking-tight text-white">
                Dr. Mehrotra Dental
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Serving Lucknow since 1954 with cutting-edge dental care and advanced implant surgery.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-brand-blue hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-brand-blue rounded-full" />
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-brand-blue transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-brand-blue transition-colors">Our Services</a></li>
              <li><a href="#team" className="hover:text-brand-blue transition-colors">Team Members</a></li>
              <li><a href="#booking" className="hover:text-brand-blue transition-colors">Book Online</a></li>
              <li><a href="#faq" className="hover:text-brand-blue transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-brand-blue rounded-full" />
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-brand-blue shrink-0" />
                <span>Vidhan Sabha Marg, Hazratganj, Lucknow - 226001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-brand-blue shrink-0" />
                <span>+91 - 9336672575</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-brand-blue shrink-0" />
                <span>drnikhilmehr@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-brand-blue rounded-full" />
            </h4>
            <p className="text-gray-400 mb-6 text-sm">Subscribe to get the latest dental tips and offers.</p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your Email"
                className="bg-gray-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-blue outline-none grow"
              />
              <button className="bg-brand-blue text-white p-3 rounded-xl hover:bg-brand-dark transition-all">
                <Smile size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 space-y-4 md:space-y-0">
          <p>© 2026 Dr. Mehrotra Dental. All Rights Reserved.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-brand-blue transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-blue transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
