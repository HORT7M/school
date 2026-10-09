export type Language = 'km' | 'en';

export interface SchoolInfo {
  name: { km: string; en: string };
  subName: { km: string; en: string };
  schoolType: { km: string; en: string };
  location: { km: string; en: string };
  commune: { km: string; en: string };
  phone: string;
  phoneDisplay: string;
  hours: { km: string; en: string };
  mapUrl: string;
  description: { km: string; en: string };
  stats: {
    students: string;
    teachers: string;
    classrooms: string;
    satisfaction: string;
  };
}

export interface GalleryItem {
  id: number;
  title: { km: string; en: string };
  category: 'campus' | 'students' | 'classroom' | 'events' | 'facilities';
  imageUrl: string;
  description: { km: string; en: string };
}

export interface AcademicProgram {
  id: string;
  title: { km: string; en: string };
  grades: { km: string; en: string };
  icon: string;
  description: { km: string; en: string };
  features: { km: string[]; en: string[] };
}

export interface Announcement {
  id: string;
  date: string;
  badge: { km: string; en: string };
  title: { km: string; en: string };
  content: { km: string; en: string };
}

export interface FeedbackMessage {
  id: string;
  name: string;
  emailOrPhone: string;
  subject: string;
  message: string;
  createdAt: string;
}
