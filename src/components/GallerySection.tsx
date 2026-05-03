import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { TRANSFORMATIONS } from '../constants';
import { BeforeAfterImage } from '../types';

interface ComparisonSliderProps {
  item: BeforeAfterImage;
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ item }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging && event.type !== 'mousemove' && event.type !== 'touchmove') return;
    if (isDragging || event.type === 'mousemove' || event.type === 'touchmove') {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = 'touches' in event ? (event as React.TouchEvent).touches[0].clientX : (event as React.MouseEvent).clientX;
      const position = ((x - rect.left) / rect.width) * 100;

      setSliderPosition(Math.max(0, Math.min(100, position)));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 border border-gray-100"
    >
      <div 
        ref={containerRef}
        className="relative aspect-[4/3] cursor-ew-resize select-none overflow-hidden"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* After Image (Background) */}
        <img
          src={item.after}
          alt="After treatment"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={item.before}
            alt="Before treatment"
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-90"
            draggable={false}
          />
        </div>

        {/* Slider Handle */}
        <div
          className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="flex gap-1">
              <div className="w-0.5 h-3 bg-brand-blue rounded-full" />
              <div className="w-0.5 h-3 bg-brand-blue rounded-full" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-4 left-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold tracking-wider uppercase">
            Before
           </span>
        </div>
        <div className="absolute bottom-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <span className="bg-brand-blue/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold tracking-wider uppercase">
            After
           </span>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center justify-between mb-3">
          <span className="px-2.5 py-0.5 bg-blue-50 text-brand-blue text-[10px] font-bold uppercase tracking-wider rounded-md border border-blue-100">
            {item.category}
          </span>
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${
              item.complexity === 'Complex' ? 'bg-red-400' : 
              item.complexity === 'Advanced' ? 'bg-orange-400' : 'bg-green-400'
            }`} />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{item.complexity}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-blue transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          {item.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <span className="block text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">Timeframe</span>
            <span className="block text-sm font-bold text-gray-700">{item.duration}</span>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <span className="block text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">Success Rate</span>
            <span className="block text-sm font-bold text-gray-700">99.8%</span>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Patient" />
              </div>
            ))}
            <div className="w-6 h-6 rounded-full border-2 border-white bg-brand-blue flex items-center justify-center text-[8px] text-white font-bold">
              +
            </div>
          </div>
          <span className="text-[11px] font-medium text-gray-400 italic">Verified Patient Result</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Patient Stories</h2>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Our Transformation <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">Gallery</span>
              </h3>
            </motion.div>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-500 text-lg md:max-w-md"
          >
            Real people. Real results. Experience the confidence that comes with a perfectly crafted smile.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {TRANSFORMATIONS.map((img) => (
            <ComparisonSlider key={img.id} item={img} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-12 rounded-[3rem] bg-gray-50 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-bold text-gray-900 mb-2">Ready for your own transformation?</h4>
            <p className="text-gray-500">Book a cosmetic consultation today and see what's possible for you.</p>
          </div>
          <a
            href="#booking"
            className="px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-brand-blue transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gray-200"
          >
            Start Your Journey
          </a>
        </motion.div>
      </div>
    </section>
  );
}
