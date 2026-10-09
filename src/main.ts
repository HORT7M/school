import './style.css';
import { rateLimiter } from './rateLimiter';
import {
  schoolData,
  academicPrograms,
  galleryItems,
  announcements,
  translations,
} from './data';
import { Language, GalleryItem, FeedbackMessage } from './types';

// App State
let currentLang: Language = (localStorage.getItem('sandan_lang') as Language) || 'km';
let currentTheme: 'light' | 'dark' =
  (localStorage.getItem('sandan_theme') as 'light' | 'dark') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
let activeCategory: string = 'all';
let currentLightboxIndex: number = 0;
let filteredGalleryItems: GalleryItem[] = [...galleryItems];
let currentNavPosition: 'bottom' | 'top' =
  (localStorage.getItem('sandan_nav_pos') as 'bottom' | 'top') || 'bottom';

// DOM Elements
const htmlEl = document.documentElement;
const mainHeader = document.getElementById('main-header') as HTMLElement;
const posToggleBtn = document.getElementById('pos-toggle-btn') as HTMLButtonElement;
const posIcon = document.getElementById('pos-icon') as HTMLSpanElement;
const posLabel = document.getElementById('pos-label') as HTMLSpanElement;
const langToggleBtn = document.getElementById('lang-toggle-btn') as HTMLButtonElement;
const langFlag = document.getElementById('lang-flag') as HTMLSpanElement;
const langLabel = document.getElementById('lang-label') as HTMLSpanElement;
const themeToggleBtn = document.getElementById('theme-toggle-btn') as HTMLButtonElement;
const themeIcon = document.getElementById('theme-icon') as HTMLSpanElement;

const mobileMenuBtn = document.getElementById('mobile-menu-btn') as HTMLButtonElement;
const mobileMenu = document.getElementById('mobile-menu') as HTMLDivElement;

const programsContainer = document.getElementById('programs-container') as HTMLDivElement;
const galleryGrid = document.getElementById('gallery-grid') as HTMLDivElement;
const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
const announcementsContainer = document.getElementById('announcements-container') as HTMLDivElement;

const lightboxModal = document.getElementById('lightbox-modal') as HTMLDivElement;
const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;
const lightboxTitle = document.getElementById('lightbox-title') as HTMLHeadingElement;
const lightboxDesc = document.getElementById('lightbox-desc') as HTMLParagraphElement;
const lightboxCounter = document.getElementById('lightbox-counter') as HTMLSpanElement;
const lightboxCloseBtn = document.getElementById('lightbox-close-btn') as HTMLButtonElement;
const lightboxPrevBtn = document.getElementById('lightbox-prev-btn') as HTMLButtonElement;
const lightboxNextBtn = document.getElementById('lightbox-next-btn') as HTMLButtonElement;

const contactForm = document.getElementById('contact-form') as HTMLFormElement;
const formAlert = document.getElementById('form-alert') as HTMLDivElement;
const backToTopBtn = document.getElementById('back-to-top') as HTMLButtonElement;

// 1. Theme Management
function initTheme(): void {
  if (currentTheme === 'dark') {
    htmlEl.classList.add('dark');
    themeIcon.textContent = '☀️';
  } else {
    htmlEl.classList.remove('dark');
    themeIcon.textContent = '🌙';
  }
}

themeToggleBtn?.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('sandan_theme', currentTheme);
  initTheme();
});

// 2. Language Management
function setLanguage(lang: Language): void {
  currentLang = lang;
  localStorage.setItem('sandan_lang', lang);
  htmlEl.lang = lang;

  if (lang === 'km') {
    langFlag.textContent = '🇰🇭';
    langLabel.textContent = 'ខ្មែរ';
  } else {
    langFlag.textContent = '🇬🇧';
    langLabel.textContent = 'English';
  }

  applyTranslations();
  applyNavPosition(currentNavPosition);
  renderPrograms();
  renderGallery();
  renderAnnouncements();
}

langToggleBtn?.addEventListener('click', () => {
  const nextLang: Language = currentLang === 'km' ? 'en' : 'km';
  setLanguage(nextLang);
});

function applyTranslations(): void {
  const t = translations[currentLang];

  // Topbar
  const topbarWelcome = document.getElementById('topbar-welcome');
  if (topbarWelcome) {
    topbarWelcome.textContent =
      currentLang === 'km'
        ? 'អនុវិទ្យាល័យអូរត្នោត ឃុំងន ស្រុកសណ្តាន់ ខេត្តកំពង់ធំ (Government School)'
        : 'Ou Tnaot Secondary School, Ngon Commune, Sandan District (Government School)';
  }

  const topbarStatus = document.getElementById('topbar-status');
  if (topbarStatus) topbarStatus.textContent = t.openStatus;

  // Brand
  const brandTitle = document.getElementById('brand-title');
  if (brandTitle) brandTitle.textContent = schoolData.name[currentLang];

  const brandSubtitle = document.getElementById('brand-subtitle');
  if (brandSubtitle) {
    brandSubtitle.textContent =
      currentLang === 'km'
        ? `${schoolData.subName.km} • Ou Tnaot Secondary School`
        : `${schoolData.subName.en} • Government School`;
  }

  // Nav links
  document.querySelectorAll('[data-nav]').forEach((el) => {
    const key = el.getAttribute('data-nav') as keyof typeof t;
    if (key && t[key]) {
      el.textContent = t[key];
    }
  });

  // Hero Section
  const heroTag = document.getElementById('hero-tag');
  if (heroTag) heroTag.textContent = t.heroTag;

  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) heroTitle.textContent = schoolData.name[currentLang];

  const heroSub = document.getElementById('hero-sub');
  if (heroSub) heroSub.textContent = t.heroSub;

  const btnCallText = document.getElementById('btn-call-text');
  if (btnCallText) {
    btnCallText.textContent = `${t.btnCallNow}: 097 811 0470`;
  }

  const btnMapText = document.getElementById('btn-map-text');
  if (btnMapText) {
    btnMapText.textContent = t.btnViewMap;
  }

  // Stats Labels
  const statStudents = document.getElementById('stat-label-students');
  if (statStudents) statStudents.textContent = t.statsStudents;

  const statTeachers = document.getElementById('stat-label-teachers');
  if (statTeachers) statTeachers.textContent = t.statsTeachers;

  const statClassrooms = document.getElementById('stat-label-classrooms');
  if (statClassrooms) statClassrooms.textContent = t.statsClassrooms;

  const statSatisfaction = document.getElementById('stat-label-satisfaction');
  if (statSatisfaction) statSatisfaction.textContent = t.statsSatisfaction;

  // About Section
  const aboutHeading = document.getElementById('about-heading');
  if (aboutHeading) aboutHeading.textContent = t.aboutHeading;

  const aboutText1 = document.getElementById('about-text-1');
  if (aboutText1) aboutText1.textContent = t.aboutText1;

  const aboutText2 = document.getElementById('about-text-2');
  if (aboutText2) aboutText2.textContent = t.aboutText2;

  // Programs Section
  const programsHeading = document.getElementById('programs-heading');
  if (programsHeading) programsHeading.textContent = t.programsHeading;

  const programsSub = document.getElementById('programs-sub');
  if (programsSub) programsSub.textContent = t.programsSub;

  // Gallery Section
  const galleryHeading = document.getElementById('gallery-heading');
  if (galleryHeading) galleryHeading.textContent = t.galleryHeading;

  const gallerySub = document.getElementById('gallery-sub');
  if (gallerySub) gallerySub.textContent = t.gallerySub;

  // News Section
  const newsHeading = document.getElementById('news-heading');
  if (newsHeading) newsHeading.textContent = t.newsHeading;

  const newsSub = document.getElementById('news-sub');
  if (newsSub) newsSub.textContent = t.newsSub;

  // Contact Section
  const contactHeading = document.getElementById('contact-heading');
  if (contactHeading) contactHeading.textContent = t.contactHeading;

  const contactSub = document.getElementById('contact-sub');
  if (contactSub) contactSub.textContent = t.contactSub;

  const lblName = document.getElementById('lbl-name');
  if (lblName) lblName.textContent = t.formName + ' *';

  const lblPhone = document.getElementById('lbl-phone');
  if (lblPhone) lblPhone.textContent = t.formPhone + ' *';

  const lblSubject = document.getElementById('lbl-subject');
  if (lblSubject) lblSubject.textContent = t.formSubject;

  const lblMessage = document.getElementById('lbl-message');
  if (lblMessage) lblMessage.textContent = t.formMessage + ' *';

  const btnSubmitMessage = document.getElementById('btn-submit-message');
  if (btnSubmitMessage) {
    btnSubmitMessage.querySelector('span')!.textContent = t.formSubmit;
  }

  const contactAddrTitle = document.getElementById('contact-addr-title');
  if (contactAddrTitle) contactAddrTitle.textContent = t.contactAddressTitle;

  const contactAddrVal = document.getElementById('contact-addr-val');
  if (contactAddrVal) contactAddrVal.textContent = schoolData.location[currentLang];

  const contactPhoneTitle = document.getElementById('contact-phone-title');
  if (contactPhoneTitle) contactPhoneTitle.textContent = t.contactPhoneTitle;

  const contactHoursTitle = document.getElementById('contact-hours-title');
  if (contactHoursTitle) contactHoursTitle.textContent = t.contactHoursTitle;

  const contactHoursVal = document.getElementById('contact-hours-val');
  if (contactHoursVal) contactHoursVal.textContent = schoolData.hours[currentLang];

  const footerRights = document.getElementById('footer-rights');
  if (footerRights) footerRights.textContent = t.footerRights;
}

// 3. Navbar Position & Mobile Navigation Menu
function applyNavPosition(pos: 'bottom' | 'top'): void {
  currentNavPosition = pos;
  localStorage.setItem('sandan_nav_pos', pos);

  if (!mainHeader) return;

  if (pos === 'bottom') {
    mainHeader.classList.remove('top-0', 'border-b', 'shadow-md');
    mainHeader.classList.add('bottom-0', 'border-t', 'shadow-[0_-10px_30px_rgba(0,0,0,0.12)]');

    if (mobileMenu) {
      mobileMenu.classList.remove('top-full', 'rounded-b-2xl', 'border-b', 'shadow-xl');
      mobileMenu.classList.add('bottom-full', 'rounded-t-2xl', 'border-t', 'shadow-2xl');
    }

    document.body.classList.add('pb-24', 'sm:pb-28');

    if (backToTopBtn) {
      backToTopBtn.classList.remove('bottom-6');
      backToTopBtn.classList.add('bottom-24');
    }

    if (posIcon) posIcon.textContent = '⬆️';
    if (posLabel) {
      posLabel.textContent = currentLang === 'km' ? 'ដាក់លើ' : 'Move Top';
    }
  } else {
    mainHeader.classList.remove('bottom-0', 'border-t', 'shadow-[0_-10px_30px_rgba(0,0,0,0.12)]');
    mainHeader.classList.add('top-0', 'border-b', 'shadow-md');

    if (mobileMenu) {
      mobileMenu.classList.remove('bottom-full', 'rounded-t-2xl', 'border-t', 'shadow-2xl');
      mobileMenu.classList.add('top-full', 'rounded-b-2xl', 'border-b', 'shadow-xl');
    }

    document.body.classList.remove('pb-24', 'sm:pb-28');

    if (backToTopBtn) {
      backToTopBtn.classList.remove('bottom-24');
      backToTopBtn.classList.add('bottom-6');
    }

    if (posIcon) posIcon.textContent = '⬇️';
    if (posLabel) {
      posLabel.textContent = currentLang === 'km' ? 'ដាក់ក្រោម' : 'Move Bottom';
    }
  }
}

posToggleBtn?.addEventListener('click', () => {
  const nextPos = currentNavPosition === 'bottom' ? 'top' : 'bottom';
  applyNavPosition(nextPos);
});

mobileMenuBtn?.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('.mobile-nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// 4. Render Academic Programs
function renderPrograms(): void {
  if (!programsContainer) return;
  programsContainer.innerHTML = '';

  academicPrograms.forEach((prog) => {
    const card = document.createElement('div');
    card.className =
      'bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/80 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between';

    const featuresList = prog.features[currentLang]
      .map(
        (f) =>
          `<li class="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <span class="text-emerald-500 font-bold shrink-0">✓</span>
            <span>${f}</span>
          </li>`
      )
      .join('');

    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between mb-4">
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            ${prog.grades[currentLang]}
          </span>
          <div class="p-2.5 rounded-xl bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
        </div>
        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
          ${prog.title[currentLang]}
        </h3>
        <p class="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
          ${prog.description[currentLang]}
        </p>
        <ul class="space-y-2.5 mb-6 pt-4 border-t border-slate-100 dark:border-slate-700">
          ${featuresList}
        </ul>
      </div>
      <a href="#contact" class="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-2">
        <span>${currentLang === 'km' ? 'សាកសួរព័ត៌មានបន្ថែម' : 'Inquire about program'}</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </a>
    `;
    programsContainer.appendChild(card);
  });
}

// 5. Render Photo Gallery with Category Filters & Lightbox
function renderGallery(): void {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = '';

  filteredGalleryItems =
    activeCategory === 'all'
      ? [...galleryItems]
      : galleryItems.filter((item) => item.category === activeCategory);

  filteredGalleryItems.forEach((item, index) => {
    const card = document.createElement('div');
    card.className =
      'group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-slate-200 dark:border-slate-700 transition-all cursor-pointer transform hover:-translate-y-1 animate-fade-in';

    card.innerHTML = `
      <div class="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src="${item.imageUrl}"
          alt="${item.title[currentLang]}"
          loading="lazy"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
          <span class="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-600 w-fit mb-1">
            ${getCategoryName(item.category)}
          </span>
          <p class="font-bold text-sm leading-tight">${item.title[currentLang]}</p>
          <p class="text-xs text-slate-300 mt-0.5 line-clamp-2">${item.description[currentLang]}</p>
        </div>
        <div class="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/></svg>
        </div>
      </div>
      <div class="p-3 text-left">
        <h4 class="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-100 truncate">
          ${item.title[currentLang]}
        </h4>
      </div>
    `;

    card.addEventListener('click', () => {
      openLightbox(index);
    });

    galleryGrid.appendChild(card);
  });
}

function getCategoryName(category: string): string {
  const map: Record<string, { km: string; en: string }> = {
    campus: { km: 'បរិវេណសាលា', en: 'Campus' },
    classroom: { km: 'ក្នុងថ្នាក់រៀន', en: 'Classroom' },
    students: { km: 'សិស្សានុសិស្ស', en: 'Students' },
    events: { km: 'កម្មវិធី & ពិធីបុណ្យ', en: 'Events' },
    facilities: { km: 'ហេដ្ឋារចនាសម្ព័ន្ធ', en: 'Facilities' },
  };
  return map[category] ? map[category][currentLang] : category;
}

// Gallery Filter Tab Clicks
galleryFilterBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const target = e.currentTarget as HTMLButtonElement;
    const filter = target.getAttribute('data-filter') || 'all';
    activeCategory = filter;

    galleryFilterBtns.forEach((b) => {
      b.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
      b.classList.add(
        'bg-white',
        'dark:bg-slate-800',
        'text-slate-700',
        'dark:text-slate-200',
        'border',
        'border-slate-300',
        'dark:border-slate-700'
      );
    });

    target.classList.remove(
      'bg-white',
      'dark:bg-slate-800',
      'text-slate-700',
      'dark:text-slate-200',
      'border-slate-300',
      'dark:border-slate-700'
    );
    target.classList.add('bg-blue-600', 'text-white', 'shadow-sm');

    renderGallery();
  });
});

// 6. Lightbox Logic
function openLightbox(index: number): void {
  if (!filteredGalleryItems[index]) return;
  currentLightboxIndex = index;
  updateLightboxContent();
  lightboxModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function updateLightboxContent(): void {
  const item = filteredGalleryItems[currentLightboxIndex];
  if (!item) return;

  lightboxImg.src = item.imageUrl;
  lightboxImg.alt = item.title[currentLang];
  lightboxTitle.textContent = item.title[currentLang];
  lightboxDesc.textContent = item.description[currentLang];
  lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${filteredGalleryItems.length}`;
}

function closeLightbox(): void {
  lightboxModal.classList.add('hidden');
  document.body.style.overflow = '';
}

function nextLightboxPhoto(): void {
  if (currentLightboxIndex < filteredGalleryItems.length - 1) {
    currentLightboxIndex++;
  } else {
    currentLightboxIndex = 0;
  }
  updateLightboxContent();
}

function prevLightboxPhoto(): void {
  if (currentLightboxIndex > 0) {
    currentLightboxIndex--;
  } else {
    currentLightboxIndex = filteredGalleryItems.length - 1;
  }
  updateLightboxContent();
}

lightboxCloseBtn?.addEventListener('click', closeLightbox);
lightboxNextBtn?.addEventListener('click', nextLightboxPhoto);
lightboxPrevBtn?.addEventListener('click', prevLightboxPhoto);

lightboxModal?.addEventListener('click', (e) => {
  if (e.target === lightboxModal) {
    closeLightbox();
  }
});

window.addEventListener('keydown', (e) => {
  if (lightboxModal.classList.contains('hidden')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextLightboxPhoto();
  if (e.key === 'ArrowLeft') prevLightboxPhoto();
});

// 7. Render Announcements
function renderAnnouncements(): void {
  if (!announcementsContainer) return;
  announcementsContainer.innerHTML = '';

  announcements.forEach((ann) => {
    const card = document.createElement('div');
    card.className =
      'bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between';

    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
            ${ann.badge[currentLang]}
          </span>
          <span class="text-xs text-slate-400 font-medium">📅 ${ann.date}</span>
        </div>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
          ${ann.title[currentLang]}
        </h3>
        <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          ${ann.content[currentLang]}
        </p>
      </div>
      <div class="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <span class="text-xs text-slate-500 dark:text-slate-400">
          ${currentLang === 'km' ? 'គណៈគ្រប់គ្រងសាលា' : 'School Administration'}
        </span>
        <button class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
          ${currentLang === 'km' ? 'អានលម្អិត' : 'Read details'} →
        </button>
      </div>
    `;

    announcementsContainer.appendChild(card);
  });
}

// 8. Contact Form Handling
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  // Rate Limiting & Anti-DDoS check (Max 5 req/s)
  if (!rateLimiter.checkRateLimit()) {
    return;
  }

  const nameInput = document.getElementById('form-input-name') as HTMLInputElement;
  const phoneInput = document.getElementById('form-input-phone') as HTMLInputElement;
  const subjectInput = document.getElementById('form-input-subject') as HTMLInputElement;
  const messageInput = document.getElementById('form-input-message') as HTMLTextAreaElement;

  const newFeedback: FeedbackMessage = {
    id: Date.now().toString(),
    name: nameInput.value.trim(),
    emailOrPhone: phoneInput.value.trim(),
    subject: subjectInput.value.trim() || 'General Inquiry',
    message: messageInput.value.trim(),
    createdAt: new Date().toISOString(),
  };

  // Save to localStorage
  const existingList: FeedbackMessage[] = JSON.parse(
    localStorage.getItem('sandan_messages') || '[]'
  );
  existingList.push(newFeedback);
  localStorage.setItem('sandan_messages', JSON.stringify(existingList));

  // Show success alert
  formAlert.className =
    'p-4 rounded-xl text-sm font-medium bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 mb-4 animate-fade-in block';
  formAlert.textContent = translations[currentLang].formSuccess;

  // Clear inputs
  contactForm.reset();

  setTimeout(() => {
    formAlert.className = 'hidden';
  }, 6000);
});

// 9. Back To Top Button
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn?.classList.remove('hidden');
  } else {
    backToTopBtn?.classList.add('hidden');
  }
});

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 10. Number Counting Animation for Stats
function initCounterObserver(): void {
  const statElements = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statElements.forEach((el) => {
            const target = parseInt(el.getAttribute('data-target') || '0', 10);
            const isPercent = el.textContent?.includes('%');
            const isPlus = el.textContent?.includes('+');
            let current = 0;
            const step = Math.max(1, Math.floor(target / 40));
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              el.textContent = `${current}${isPercent ? '%' : isPlus ? '+' : ''}`;
            }, 30);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.querySelector('.stat-number');
  if (statsSection && statsSection.parentElement) {
    observer.observe(statsSection.parentElement);
  }
}

// Initialization on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setLanguage(currentLang);
  applyNavPosition(currentNavPosition);
  initCounterObserver();
});

// Immediate invocation
applyNavPosition(currentNavPosition);

