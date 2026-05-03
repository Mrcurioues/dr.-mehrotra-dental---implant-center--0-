export interface Appointment {
  id?: string;
  patientName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  isSynced?: boolean;
  createdAt: any;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface BeforeAfterImage {
  id: string;
  title: string;
  description: string;
  before: string;
  after: string;
  category: string;
  duration?: string;
  complexity?: 'Standard' | 'Advanced' | 'Complex';
}
