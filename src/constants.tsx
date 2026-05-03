import { Activity, Stethoscope, Zap, Heart, Shield, Award } from 'lucide-react';
import { Service, TeamMember, Testimonial, BeforeAfterImage } from './types';

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Dental Implants',
    description: 'Highest quality dental implants at an affordable price, specializing in surgery and prosthetic replacements.',
    icon: 'Shield',
  },
  {
    id: '2',
    title: 'Oral & Maxillofacial Surgery',
    description: 'Expert surgical solutions for complex dental and facial conditions by specialized surgeons.',
    icon: 'Stethoscope',
  },
  {
    id: '3',
    title: 'Cosmetic Dentistry',
    description: 'Transform your smile with our advanced cosmetic procedures designed for aesthetic perfection.',
    icon: 'Award',
  },
  {
    id: '4',
    title: 'Root Canal Therapy',
    description: 'Cutting-edge RCT treatments to save your natural teeth with minimal discomfort.',
    icon: 'Activity',
  },
  {
    id: '5',
    title: 'Teeth Whitening',
    description: 'Professional whitening services to remove stains and brighten your smile significantly.',
    icon: 'Zap',
  },
  {
    id: '6',
    title: 'Complete Dental Solutions',
    description: 'One-stop care for all age groups, providing personalized treatments for over 60 years.',
    icon: 'Heart',
  },
];

export const TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Nikhil Mehrotra',
    role: 'MBBS, BDS, MDS - Oral & Maxillofacial Surgery, Implantology (Manipal)',
    image: 'https://www.lucknowdentalimplant.com/uploads/4/4/9/8/44980463/1469298034.png',
  },
  {
    id: '2',
    name: 'Dr. Prakhar Mehrotra',
    role: 'BDS (KGMC, LKO-Gold Medalist), DDS (Columbia University, NY, USA), MD (New York University, NY, USA) - Dr. Mehrotra is a Board certified, dual degree Oral & Maxillofacial Surgeon',
    image: 'https://www.lucknowdentalimplant.com/uploads/4/4/9/8/44980463/mehrotra-prakhar-stylo.jpg',
  },
  {
    id: '3',
    name: 'Dr. V.P. Sharma',
    role: 'BB.D.S, M.D.S (Orthodontics), Retd. Dean and Head of Dept. Orthodontics',
    image: 'https://www.lucknowdentalimplant.com/uploads/4/4/9/8/44980463/6586720.gif?117',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Alexander Harris',
    rating: 5,
    comment: 'I have always been self-conscious about my teeth, but they gave me my confidence back. The whitening treatment was incredible, and the staff made me feel comfortable.',
    avatar: 'https://picsum.photos/seed/user1/100/100',
  },
  {
    id: '2',
    name: 'Matthew Lewis',
    rating: 5,
    comment: 'I brought my kids to Smile Bright, and they had such a positive experience! The team is so patient and great with children. Thank making dentistry fun.',
    avatar: 'https://picsum.photos/seed/user2/100/100',
  },
  {
    id: '3',
    name: 'Samuel Walker',
    rating: 4,
    comment: 'I was nervous about going to the dentist, but Smile Bright changed everything. My cleanings are always quick and painless. Highly recommend!',
    avatar: 'https://picsum.photos/seed/user3/100/100',
  },
  {
    id: '4',
    name: 'Kristin Watson',
    rating: 5,
    comment: 'The entire team at Smile Bright is fantastic! They take the time to explain everything. I\'ve never felt more informed about my dental health.',
    avatar: 'https://picsum.photos/seed/user4/100/100',
  },
];

export const TRANSFORMATIONS: BeforeAfterImage[] = [
  {
    id: '1',
    title: 'Full Aesthetic Reconstruction',
    description: 'A complete rehabilitation using digital smile design and E-Max porcelain veneers.',
    before: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800&h=800',
    after: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800&h=800',
    category: 'Restorative',
    duration: '3 Weeks',
    complexity: 'Advanced',
  },
  {
    id: '2',
    title: 'Laser-Assisted Whitening',
    description: 'Boutique whitening utilizing cold-light laser technology for zero-sensitivity results.',
    before: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800&h=800',
    after: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800&h=800',
    category: 'Cosmetic',
    duration: '45 Mins',
    complexity: 'Standard',
  },
  {
    id: '3',
    title: 'Comprehensive Alignment',
    description: 'Transforming complex malocclusions into a perfectly functional and aesthetic smile using innovative orthodontic techniques.',
    before: 'https://69f174391c78705e2c4aa3c5.imgix.net/1000296863%20(1).jpg?w=1816&h=1013',
    after: 'https://69f174391c78705e2c4aa3c5.imgix.net/1000296863.jpg?w=1816&h=1026',
    category: 'Orthodontics',
    duration: '14 Months',
    complexity: 'Advanced',
  },
];

export const FAQS = [
  {
    question: 'What is the best way to whiten my teeth?',
    answer: 'The most effective way to whiten your teeth is through professional treatments at your dentist\'s office. They use safe, high-concentration bleaching agents that deliver noticeable results in just one visit.',
  },
  {
    question: 'How do I know if I need braces or Invisalign?',
    answer: 'A consultation with our orthodontist is the best way to determine which option is right for you. We\'ll evaluate your bite, alignment, and personal preferences to create a customized treatment plan.',
  },
  {
    question: 'How do I know if I need a root canal?',
    answer: 'Common signs include persistent tooth pain, sensitivity to hot and cold, swelling, or a darkened tooth. If you experience any of these, schedule an exam immediately.',
  },
  {
    question: 'What should I do if I have a toothache?',
    answer: 'Rinse your mouth with warm water, gently floss to remove any trapped food, and contact us for an emergency appointment if the pain persists.',
  },
];
