import { motion } from 'motion/react';
import { ChevronRight, Star, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-white pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-brand-light rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-brand-light rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-brand-light text-brand-blue px-4 py-1.5 rounded-full mb-6">
              <span className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/32?img=${i + 10}`}
                    alt="Patient"
                    className="w-6 h-6 rounded-full border-2 border-brand-light"
                  />
                ))}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider">16k+ Satisfied Patients</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
              Dr. Mehrotra's <span className="text-brand-blue">🦷</span> <br />
              <span className="relative">
                Dental & Implant Center
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-blue/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="8" />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
              Making Lucknow's smile more beautiful! Established in 1954, we provide expert dental care, specialized implants, and oral surgery with over 60 years of trust.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#services"
                className="bg-brand-blue text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-dark transition-all transform hover:translate-y-[-2px] shadow-lg shadow-brand-blue/20 flex items-center justify-center space-x-2"
              >
                <span>View Services</span>
                <ChevronRight size={20} />
              </a>
              <a
                href="#booking"
                className="border-2 border-brand-light bg-white text-brand-blue px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-light transition-all flex items-center justify-center"
              >
                Schedule a Call
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <motion.img
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=400&h=500"
                  alt="Dental Office"
                  className="rounded-3xl shadow-xl w-full object-cover aspect-[4/5]"
                />
                <div className="bg-brand-blue p-6 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                      <Users size={24} />
                    </div>
                    <div className="text-3xl font-extrabold">86+</div>
                    <div className="text-sm opacity-90">Skilled Dentists</div>
                  </div>
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
                </div>
              </div>
              <div className="space-y-4">
                <img
                  src="https://69f174391c78705e2c4aa3c5.imgix.net/%F0%9F%8E%AF%20Maximize%20Patient%20Bookings%20with%20Winning%20Dental%20Clinic%20Ads!%20%F0%9F%A6%B7%F0%9F%92%A1.jpeg?w=736&h=1104"
                  alt="Treatment"
                  className="rounded-3xl shadow-xl w-full object-cover aspect-square"
                />
                <img
                  src="https://69f174391c78705e2c4aa3c5.imgix.net/Tooth%20Fairy%20Pediatric%20and%20Family%20Dental%20Clinic.jpeg?w=736&h=552"
                  alt="Smiling Patient"
                  className="rounded-3xl shadow-xl w-full object-cover aspect-[4/5]"
                />
              </div>
            </div>

            {/* Floating Achievement */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 hidden md:block"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
                  <Star fill="currentColor" size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Top Rated Clinic</div>
                  <div className="text-xs text-gray-500">Official Award 2024</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
