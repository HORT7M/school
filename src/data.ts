import { SchoolInfo, GalleryItem, AcademicProgram, Announcement } from './types';

export const schoolData: SchoolInfo = {
  name: {
    km: 'អនុវិទ្យាល័យអូរត្នោត',
    en: 'Ou Tnaot Secondary School',
  },
  subName: {
    km: 'ឃុំងន ស្រុកសណ្តាន់ ខេត្តកំពង់ធំ',
    en: 'Ngon Commune, Sandan District, Kampong Thom Province',
  },
  schoolType: {
    km: 'សាលារដ្ឋ (Government School)',
    en: 'Government School',
  },
  location: {
    km: 'សាលា ឃុំងន ស្រុកសណ្តាន់ ខេត្តកំពង់ធំ ព្រះរាជាណាចក្រកម្ពុជា',
    en: 'Ngon Commune, Sandan District, Kampong Thom Province, Cambodia',
  },
  commune: {
    km: 'ឃុំងន ស្រុកសណ្តាន់',
    en: 'Ngon Commune, Sandan District',
  },
  phone: '+855978110470',
  phoneDisplay: '+855 97 811 0470',
  hours: {
    km: 'ចន្ទ - សៅរ៍: 6:00 ព្រឹក - 6:00 ល្ងាច (អាទិត្យ: បិទ)',
    en: 'Monday - Saturday: 6:00 AM - 6:00 PM (Sunday: Closed)',
  },
  mapUrl: 'https://www.google.com/maps/place/%E1%9E%A2%E1%9E%93%E1%9E%BB%E1%9E%9C%E1%9E%B7%E1%9E%91%E1%9F%92%E1%9E%99%E1%9E%B6%E1%9E%9B%E1%9F%90%E1%9E%99%E1%9E%A2%E1%9E%BC%E1%9E%9A%E1%9E%8F%E1%9F%92%E1%9E%93%E1%9F%84%E1%9E%8F/@0,-2.6367187,7z/data=!4m6!3m5!1s0x2abef580e6383b97:0xf74cd97c884226f7!8m2!3d12.1454395!4d104.9824451!16s%2Fg%2F11n9v6z4hc?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D',
  description: {
    km: 'អនុវិទ្យាល័យអូរត្នោត ជាគ្រឹះស្ថានអប់រំរដ្ឋ ស្ថិតក្នុងឃុំងន ស្រុកសណ្តាន់ ខេត្តកំពង់ធំ ប្តេជ្ញាផ្តល់នូវការអប់រំប្រកបដោយគុណភាព សីលធម៌ល្អ និងបរិស្ថានស្អាតបៃតង ដើម្បីអភិវឌ្ឍន៍សក្តានុពលកុលបុត្រកុលធីតាគ្រប់រូប។',
    en: 'Ou Tnaot Secondary School is a public government school in Ngon Commune, Sandan District, Kampong Thom, dedicated to quality education, ethical values, and a clean learning environment.',
  },
  stats: {
    students: '520+',
    teachers: '24',
    classrooms: '12',
    satisfaction: '98%',
  },
};

export const academicPrograms: AcademicProgram[] = [
  {
    id: 'secondary',
    title: {
      km: 'កម្រិតអនុវិទ្យាល័យ (ថ្នាក់ទី ៧ - ទី ៩)',
      en: 'Lower Secondary Education (Grades 7 - 9)',
    },
    grades: {
      km: 'អាយុ ១២ - ១៥ ឆ្នាំ',
      en: 'Ages 12 - 15',
    },
    icon: 'graduation-cap',
    description: {
      km: 'ពង្រឹងចំណេះដឹងវិទ្យាសាស្ត្រ បច្ចេកវិទ្យា គណិតវិទ្យា ភាសាខ្មែរ ភាសាបរទេស និងការរៀបចំខ្លួនឆ្ពោះទៅកម្រិតវិទ្យាល័យ។',
      en: 'Strengthening scientific inquiry, STEM foundation, Khmer literature, English language, and high school readiness.',
    },
    features: {
      km: [
        'វិទ្យាសាស្ត្រធម្មជាតិ រូបវិទ្យា គីមីវិទ្យា ជីវវិទ្យា',
        'ភាសាអង់គ្លេស និងជំនាញបច្ចេកវិទ្យាព័ត៌មានវិទ្យា',
        'ត្រៀមប្រឡងសញ្ញាបត្រមធ្យមសិក្សាបឋមភូមិ (ឌីប្លូម)',
      ],
      en: [
        'STEM foundation (Physics, Chemistry, Biology, Math)',
        'English communication & digital literacy',
        'National Lower Secondary Diploma exam preparation',
      ],
    },
  },
  {
    id: 'primary',
    title: {
      km: 'មូលដ្ឋានគ្រឹះបឋមសិក្សា (ថ្នាក់ទី ១ - ទី ៦)',
      en: 'Foundational Primary Education (Grades 1 - 6)',
    },
    grades: {
      km: 'អាយុ ៦ - ១១ ឆ្នាំ',
      en: 'Ages 6 - 11',
    },
    icon: 'book-open',
    description: {
      km: 'ផ្តោតលើមូលដ្ឋានគ្រឹះនៃអំណាន សំណេរ គណិតវិទ្យា វិទ្យាសាស្ត្រសង្គម និងការអប់រំចរិយាធម៌។',
      en: 'Focusing on foundational literacy, numeracy, social science, creative arts, and moral discipline.',
    },
    features: {
      km: [
        'រៀនអក្សរខ្មែរ និងគណិតវិទ្យាមូលដ្ឋានច្បាស់លាស់',
        'សកម្មភាពកម្សាន្ត និងអនាម័យសុខភាពកុមារ',
        'ការបណ្តុះទម្លាប់អានសៀវភៅ និងវិន័យថ្លៃថ្នូរ',
      ],
      en: [
        'Khmer literacy & foundational mathematics',
        'Hygiene education (WASH) & healthy habits',
        'Reading culture and good social manners',
      ],
    },
  },
  {
    id: 'activities',
    title: {
      km: 'សកម្មភាពក្រៅម៉ោង និងកីឡា',
      en: 'Extra-Curricular & Sports',
    },
    grades: {
      km: 'គ្រប់កម្រិតថ្នាក់',
      en: 'All Students',
    },
    icon: 'activity',
    description: {
      km: 'លើកកម្ពស់សុខភាពផ្លូវកាយ និងចិត្ត តាមរយៈការលេងកីឡា បរិស្ថានបៃតង និងការងារស្ម័គ្រចិត្ត។',
      en: 'Promoting physical well-being, teamwork, environmental stewardship, and community leadership.',
    },
    features: {
      km: [
        'បាល់ទាត់ បាល់ទះ និងកីឡាប្រពៃណីខ្មែរ',
        'យុទ្ធនាការដាំដើមឈើ និងបរិស្ថានសាលាស្អាតបៃតង',
        'សកម្មភាពយុវជនកាកបាទក្រហម និងកាយរឹទ្ធិកម្ពុជា',
      ],
      en: [
        'Football, volleyball & athletic competitions',
        'Tree planting & eco-friendly green school projects',
        'Red Cross youth & Scout movements',
      ],
    },
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: 101,
    title: {
      km: 'ការណែនាំ និងការសិក្សាផ្ទាល់ជាមួយលោកគ្រូ (Google Maps)',
      en: 'Teacher Mentorship & Student Guidance (Google Maps)',
    },
    category: 'classroom',
    imageUrl: '/images/hero-photo-1.jpg',
    description: {
      km: 'រូបភាពជាក់ស្តែងពី Google Maps៖ លោកគ្រូកំពុងណែនាំលទ្ធផល និងមេរៀនយ៉ាងយកចិត្តទុកដាក់ដល់សិស្ស។',
      en: 'Authentic photo from Google Maps: Teacher guiding student through academic progress and exercises.',
    },
  },
  {
    id: 102,
    title: {
      km: 'ការិយាល័យរដ្ឋបាល និងលោកគ្រូទទួលបន្ទុក (Google Maps)',
      en: 'Administration Office & Faculty Workspace (Google Maps)',
    },
    category: 'facilities',
    imageUrl: '/images/hero-photo-2.jpg',
    description: {
      km: 'រូបភាពជាក់ស្តែងពី Google Maps៖ ទិដ្ឋភាពការិយាល័យរដ្ឋបាលសាលា កុំព្យូទ័រ និងឯកសាររៀបចំយ៉ាងមានសណ្តាប់ធ្នាប់។',
      en: 'Authentic photo from Google Maps: School administration office with workstation, records, and learning materials.',
    },
  },
  {
    id: 1,
    title: {
      km: 'ខ្លោងទ្វារចូលអនុវិទ្យាល័យអូរត្នោត',
      en: 'Main Entrance Gate - Ou Tnaot Secondary School',
    },
    category: 'campus',
    imageUrl: '/images/unnamed (1).png',
    description: {
      km: 'ច្រកចូលអនុវិទ្យាល័យអូរត្នោត ឃុំងន ស្រុកសណ្តាន់ ស្វាគមន៍លោកគ្រូអ្នកគ្រូ និងសិស្សានុសិស្ស។',
      en: 'The welcoming main gateway to Ou Tnaot Secondary School in Ngon Commune, Sandan District.',
    },
  },
  {
    id: 2,
    title: {
      km: 'អគារ សម្តេចតេជោ ហ៊ុន សែន',
      en: 'Samdech Techo Hun Sen Academic Building',
    },
    category: 'campus',
    imageUrl: '/images/unnamed (14).jpg',
    description: {
      km: 'អគារសិក្សារដ្ឋមាំមួន ដំបូលប្រក់ក្បឿង បរិស្ថានស្រស់បំព្រង។',
      en: 'Spacious classrooms with traditional tiled roof and shaded open campus.',
    },
  },
  {
    id: 3,
    title: {
      km: 'ការបង្រៀននៅក្នុងថ្នាក់រៀន',
      en: 'Active Classroom Instruction',
    },
    category: 'classroom',
    imageUrl: '/images/unnamed (17).jpg',
    description: {
      km: 'លោកគ្រូបង្រៀនយ៉ាងយកចិត្តទុកដាក់ដល់សិស្សានុសិស្ស។',
      en: 'Dedicated teacher guiding students through interactive daily curriculum.',
    },
  },
  {
    id: 4,
    title: {
      km: 'ការប្រជុំជួរសិស្សានុសិស្សពេលព្រឹក',
      en: 'Morning Assembly & Roll Call',
    },
    category: 'students',
    imageUrl: '/images/unnamed (10).jpg',
    description: {
      km: 'សិស្សានុសិស្សស្លៀកពាក់ឯកសណ្ឋានរៀបរយត្រៀមគោរពទង់ជាតិ។',
      en: 'Neatly organized students assembled for daily morning ceremonies.',
    },
  },
  {
    id: 5,
    title: {
      km: 'ទីធ្លាគោរពទង់ជាតិ និងសួនច្បារ',
      en: 'Flagpole Plaza & Campus Courtyard',
    },
    category: 'campus',
    imageUrl: '/images/unnamed (11).jpg',
    description: {
      km: 'ទីលានរៀបចំពិធីគោរពទង់ជាតិ ព័ទ្ធជុំវិញដោយដើមឈើម្លប់ត្រឈឹងត្រឈៃ។',
      en: 'The central paved flagpole court surrounded by lush green trees and flowers.',
    },
  },
  {
    id: 6,
    title: {
      km: 'របៀងអគារសិក្សារៀបរយស្អាតបាត',
      en: 'Tiled Classrooms Hallway',
    },
    category: 'facilities',
    imageUrl: '/images/unnamed (9).jpg',
    description: {
      km: 'របៀងមុខថ្នាក់រៀនរៀបចំការ៉ូស្អាតភ្លឺរលោង និងមានសណ្តាប់ធ្នាប់។',
      en: 'Clean polished tile corridors connecting spacious, well-ventilated classrooms.',
    },
  },
  {
    id: 7,
    title: {
      km: 'ពិធីបើកបវេសនកាលឆ្នាំសិក្សាថ្មី',
      en: 'New Academic Year Opening Ceremony',
    },
    category: 'events',
    imageUrl: '/images/unnamed (3).jpg',
    description: {
      km: 'កម្មវិធីអបអរសាទរបើកបវេសនកាលថ្មី ដោយមានការចូលរួមពីលោកគ្រូអ្នកគ្រូ និងសិស្ស។',
      en: 'Celebratory opening of the new school year with school leaders and students.',
    },
  },
  {
    id: 8,
    title: {
      km: 'ការណែនាំ និងការស្តាប់ការអប់រំ',
      en: 'Student Guidance & Study Session',
    },
    category: 'students',
    imageUrl: '/images/unnamed (8).jpg',
    description: {
      km: 'សិស្សានុសិស្សអង្គុយរៀន និងស្តាប់ការណែនាំក្រោមម្លប់ដើមឈើត្រជាក់។',
      en: 'Students attentively participating in an open outdoor educational session.',
    },
  },
  {
    id: 9,
    title: {
      km: 'កន្លែងលាងដៃ និងទឹកស្អាតអនាម័យ WASH',
      en: 'WASH Clean Water & Sanitation Station',
    },
    category: 'facilities',
    imageUrl: '/images/unnamed (13).jpg',
    description: {
      km: 'កន្លែងលាងសម្អាតដៃធានានូវអនាម័យល្អ និងសុខភាពសម្រាប់សិស្សានុសិស្ស។',
      en: 'Dedicated hygiene handwashing facilities providing clean water for children.',
    },
  },
  {
    id: 10,
    title: {
      km: 'ការប្រជុំគណៈគ្រប់គ្រង និងគ្រូបង្រៀន',
      en: 'Faculty & Administrative Council Meeting',
    },
    category: 'events',
    imageUrl: '/images/unnamed (19).jpg',
    description: {
      km: 'ការប្រជុំពិភាក្សាផែនការអប់រំ និងការប្រើប្រាស់បច្ចេកវិទ្យាកុំព្យូទ័រក្នុងការងារសាលា។',
      en: 'School administration and teachers collaborating on educational plans and digital tools.',
    },
  },
  {
    id: 11,
    title: {
      km: 'ទិដ្ឋភាពទង់ជាតិកម្ពុជាក្នុងបរិវេណសាលា',
      en: 'Cambodian Flag over Ou Tnaot Campus',
    },
    category: 'campus',
    imageUrl: '/images/unnamed (18).jpg',
    description: {
      km: 'ទង់ជាតិព្រះរាជាណាចក្រកម្ពុជាបក់រវិចៗលើមេឃស្រឡះកណ្តាលទីធ្លាសាលា។',
      en: 'The national flag fluttering in the breeze above the peaceful school courtyard.',
    },
  },
  {
    id: 12,
    title: {
      km: 'សិស្សានុសិស្សត្រៀមចូលរៀន',
      en: 'Students Prepared for Lessons',
    },
    category: 'students',
    imageUrl: '/images/unnamed (15).jpg',
    description: {
      km: 'ស្នាមញញឹម និងស្មារតីឧស្សាហ៍ព្យាយាមរបស់ក្មួយៗសិស្សានុសិស្ស។',
      en: 'Eager and disciplined students prepared for another inspiring day of learning.',
    },
  },
];

export const announcements: Announcement[] = [
  {
    id: 'ann-1',
    date: '2026-10-01',
    badge: { km: 'ដំណឹងថ្មី', en: 'Notice' },
    title: {
      km: 'ការចុះឈ្មោះចូលរៀនអនុវិទ្យាល័យ',
      en: 'Student Enrollment & Registration Open',
    },
    content: {
      km: 'អនុវិទ្យាល័យអូរត្នោត បើកទទួលពាក្យសុំចុះឈ្មោះចូលរៀនសម្រាប់ថ្នាក់ទី ៧ និងផ្ទេរការសិក្សា ពីថ្ងៃចន្ទ ដល់ សៅរ៍ វេលាម៉ោង ៦:០០ ព្រឹក ដល់ ៦:០០ ល្ងាច។',
      en: 'Registration for Grade 7 admissions and school transfers is now open Monday to Saturday, 6:00 AM to 6:00 PM.',
    },
  },
  {
    id: 'ann-2',
    date: '2026-10-15',
    badge: { km: 'កម្មវិធីពិសេស', en: 'Event' },
    title: {
      km: 'យុទ្ធនាការបរិស្ថានស្អាត សាលារៀនបៃតង',
      en: 'Green Campus & Clean Environment Drive',
    },
    content: {
      km: 'សូមអញ្ជើញសិស្សានុសិស្ស និងអាណាព្យាបាលចូលរួមដាំផ្កា និងថែរក្សាបរិស្ថានក្នុងបរិវេណសាលា ដើម្បីលើកកម្ពស់សុខុមាលភាពរួម។',
      en: 'Join teachers and students in our monthly tree-planting and school beautification campaign to foster a clean, green campus.',
    },
  },
  {
    id: 'ann-3',
    date: '2026-11-02',
    badge: { km: 'ការប្រឡង', en: 'Academics' },
    title: {
      km: 'កាលវិភាគប្រឡងប្រចាំត្រីមាស',
      en: 'Quarterly Evaluation Schedule',
    },
    content: {
      km: 'ការប្រឡងវាស់ស្ទង់សមត្ថភាពប្រចាំត្រីមាសនឹងចាប់ផ្តើមនៅដើមខែក្រោយ។ សូមសិស្សានុសិស្សទាំងអស់ត្រៀមរៀបចំប៉ុស្តិ៍រៀនសូត្រឱ្យបានល្អ។',
      en: 'Quarterly academic progress assessments will take place next month. Students are encouraged to prepare their review notes.',
    },
  },
];

export const translations = {
  km: {
    navHome: 'ទំព័រដើម',
    navAbout: 'អំពីសាលា',
    navPrograms: 'កម្មវិធីសិក្សា',
    navGallery: 'វិចិត្រសាលរូបភាព',
    navNews: 'សេចក្តីជូនដំណឹង',
    navContact: 'ទំនាក់ទំនង',
    heroTag: 'សាលារដ្ឋ (Government School)',
    heroSub: 'គ្រឹះស្ថានអប់រំរដ្ឋបម្រើសហគមន៍ ឃុំងន ស្រុកសណ្តាន់ ខេត្តកំពង់ធំ ប្រកបដោយគុណភាព សីលធម៌ និងបរិស្ថានស្អាតបៃតង',
    btnExplore: 'ស្វែងយល់បន្ថែម',
    btnGallery: 'មើលរូបភាពសាលា',
    btnCallNow: 'ទូរស័ព្ទមកសាលា',
    btnViewMap: 'មើលទីតាំងលើ Google Maps',
    openStatus: 'បើកដំណើរការ (Open Now)',
    statsStudents: 'សិស្សានុសិស្សសរុប',
    statsTeachers: 'លោកគ្រូអ្នកគ្រូបង្រៀន',
    statsClassrooms: 'បន្ទប់សិក្សាស្តង់ដារ',
    statsSatisfaction: 'ការពេញចិត្តរបស់អាណាព្យាបាល',
    galleryHeading: 'រូបភាពសកម្មភាព និងទិដ្ឋភាពសាលា',
    gallerySub: 'ទិដ្ឋភាពជាក់ស្តែងនៃអនុវិទ្យាល័យអូរត្នោត ឃុំងន ស្រុកសណ្តាន់',
    filterAll: 'ទាំងអស់',
    filterCampus: 'បរិវេណសាលា',
    filterClassroom: 'ក្នុងថ្នាក់រៀន',
    filterStudents: 'សិស្សានុសិស្ស',
    filterEvents: 'ពិធីបុណ្យ & កម្មវិធី',
    filterFacilities: 'ហេដ្ឋារចនាសម្ព័ន្ធ',
    aboutHeading: 'អំពីអនុវិទ្យាល័យអូរត្នោត',
    aboutSub: 'គ្រឹះស្ថានអប់រំរដ្ឋ ឃុំងន ស្រុកសណ្តាន់ ខេត្តកំពង់ធំ',
    aboutText1: 'អនុវិទ្យាល័យអូរត្នោត គឺជាសាលារដ្ឋ (Government School) ស្ថិតនៅក្នុងឃុំងន ស្រុកសណ្តាន់ ខេត្តកំពង់ធំ។ សាលាត្រូវបានបង្កើតឡើងដើម្បីផ្តល់ឱកាសស្មើគ្នាក្នុងការទទួលចំណេះដឹង និងបណ្តុះបណ្តាលយុវជនជំនាន់ក្រោយក្នុងមូលដ្ឋាន។',
    aboutText2: 'យើងមានហេដ្ឋារចនាសម្ព័ន្ធអគារសិក្សារឹងមាំ (អគារ សម្តេចតេជោ ហ៊ុន សែន) ទីធ្លាធំទូលាយ មានដើមឈើម្លប់ត្រឈឹងត្រឈៃ បន្ទប់ទឹកស្អាត កន្លែងលាងដៃ និងសម្ភារៈឧបទេសបង្រៀនគ្រប់គ្រាន់ ព្រមទាំងលោកគ្រូអ្នកគ្រូប្រកបដោយគរុកោសល្យខ្ពស់។',
    programsHeading: 'កម្មវិធីអប់រំ និងការបណ្តុះបណ្តាល',
    programsSub: 'ការរៀបចំកម្មវិធីសិក្សាតាមស្តង់ដារក្រសួងអប់រំ យុវជន និងកីឡា',
    newsHeading: 'សេចក្តីជូនដំណឹង និងព្រឹត្តិការណ៍',
    newsSub: 'ព័ត៌មានថ្មីៗ និងការវិវត្តរបស់សាលារៀន',
    contactHeading: 'ទំនាក់ទំនងមកកាន់អនុវិទ្យាល័យអូរត្នោត',
    contactSub: 'មានសំណួរ ឬត្រូវការព័ត៌មានបន្ថែម? សូមទាក់ទងមកកាន់យើងខ្ញុំ',
    formName: 'ឈ្មោះពេញរបស់អ្នក',
    formPhone: 'លេខទូរស័ព្ទ ឬអ៊ីមែល',
    formSubject: 'ប្រធានបទ',
    formMessage: 'ខ្លឹមសារសារ',
    formSubmit: 'ផ្ញើសារឥឡូវនេះ',
    formSuccess: 'សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ! យើងនឹងឆ្លើយតបយ៉ាងឆាប់រហ័ស។',
    contactAddressTitle: 'អាសយដ្ឋានសាលា',
    contactPhoneTitle: 'លេខទូរស័ព្ទទំនាក់ទំនង',
    contactHoursTitle: 'ម៉ោងធ្វើការ (Operating Hours)',
    contactHoursVal: 'ចន្ទ - សៅរ៍: 6:00 ព្រឹក - 6:00 ល្ងាច (អាទិត្យ: បិទ)',
    footerRights: 'រក្សាសិទ្ធិគ្រប់យ៉ាង © 2026 អនុវិទ្យាល័យអូរត្នោត ឃុំងន ស្រុកសណ្តាន់ ខេត្តកំពង់ធំ។',
  },
  en: {
    navHome: 'Home',
    navAbout: 'About School',
    navPrograms: 'Academic Programs',
    navGallery: 'Photo Gallery',
    navNews: 'Announcements',
    navContact: 'Contact Us',
    heroTag: 'Government School',
    heroSub: 'Public government school serving Ngon Commune, Sandan District, Kampong Thom Province with quality education and green environment',
    btnExplore: 'Learn More',
    btnGallery: 'View School Gallery',
    btnCallNow: 'Call School',
    btnViewMap: 'View on Google Maps',
    openStatus: 'Open Now',
    statsStudents: 'Enrolled Students',
    statsTeachers: 'Dedicated Faculty',
    statsClassrooms: 'Modern Classrooms',
    statsSatisfaction: 'Parent Satisfaction',
    galleryHeading: 'Campus Life & Activities Gallery',
    gallerySub: 'Authentic moments from Ou Tnaot Secondary School in Ngon Commune, Sandan',
    filterAll: 'All',
    filterCampus: 'Campus',
    filterClassroom: 'Classroom',
    filterStudents: 'Students',
    filterEvents: 'Ceremonies & Events',
    filterFacilities: 'Facilities',
    aboutHeading: 'About Ou Tnaot Secondary School',
    aboutSub: 'Public Government School in Ngon Commune, Sandan District',
    aboutText1: 'Ou Tnaot Secondary School is an official public government school located in Ngon Commune, Sandan District, Kampong Thom Province. It is committed to providing equal educational opportunities and developing future leaders.',
    aboutText2: 'Our campus features resilient classroom buildings (Samdech Techo Hun Sen Academic Building), a wide shaded compound with native trees, clean drinking water and WASH handwashing stations, and dedicated educators.',
    programsHeading: 'Academic Programs & Curriculum',
    programsSub: 'Curriculum designed according to national standards by MoEYS',
    newsHeading: 'Announcements & School News',
    newsSub: 'Latest updates, academic notices, and upcoming activities',
    contactHeading: 'Get in Touch with Ou Tnaot Secondary School',
    contactSub: 'Have questions or need assistance? Reach out to our school administration',
    formName: 'Your Full Name',
    formPhone: 'Phone Number or Email',
    formSubject: 'Subject',
    formMessage: 'Your Message',
    formSubmit: 'Send Message Now',
    formSuccess: 'Your message has been sent successfully! Our team will contact you soon.',
    contactAddressTitle: 'School Location',
    contactPhoneTitle: 'Contact Phone',
    contactHoursTitle: 'Operating Hours',
    contactHoursVal: 'Monday - Saturday: 6:00 AM - 6:00 PM (Sunday: Closed)',
    footerRights: 'All rights reserved © 2026 Ou Tnaot Secondary School, Ngon Commune, Sandan District.',
  },
};
