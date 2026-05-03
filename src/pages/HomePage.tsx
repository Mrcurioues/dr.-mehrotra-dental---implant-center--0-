import Hero from '../components/Hero';
import Services from '../components/Services';
import AboutSection from '../components/AboutSection';
import TeamSection from '../components/TeamSection';
import Testimonials from '../components/Testimonials';
import FAQSection from '../components/FAQSection';
import GallerySection from '../components/GallerySection';
import BookingForm from '../components/BookingForm';
import { Appointment } from '../types';

interface HomePageProps {
  onBook: (app: Appointment) => void;
}

export default function HomePage({ onBook }: HomePageProps) {
  return (
    <div className="overflow-hidden">
      <Hero />
      <div id="services">
        <Services />
      </div>
      <AboutSection />
      <div id="gallery">
        <GallerySection />
      </div>
      <div id="team">
        <TeamSection />
      </div>
      <Testimonials />
      <div id="faq">
        <FAQSection />
      </div>
      <div id="booking" className="bg-brand-light py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Book Your Appointment</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Ready to achieve your dream smile? Fill out the form below and our team will get back to you shortly.
            </p>
          </div>
          <BookingForm onSubmit={onBook} />
        </div>
      </div>
    </div>
  );
}
