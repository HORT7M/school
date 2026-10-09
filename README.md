# 🏫 គេហទំព័រសាលាបឋម និងអនុវិទ្យាល័យអូរត្នោត ឃុំសណ្តាន់
## Sandan School Official Website (TypeScript + Tailwind CSS Client)

A clean, modern, and responsive client-side school portal website built with **Tailwind CSS v4**, **TypeScript**, and **Vite**.

---

### ✨ Features
- **Modern Responsive Design**: Mobile, tablet, and desktop optimized using Tailwind CSS.
- **Bilingual Support (Khmer & English)**: 1-click toggle between ភាសាខ្មែរ and English with instant dynamic translation.
- **Dark Mode / Light Mode**: Seamless dark and light themes with preference saved in `localStorage`.
- **Interactive Photo Gallery**:
  - Categorized filters: All (ទាំងអស់), Campus (បរិវេណសាលា), Classroom (ក្នុងថ្នាក់រៀន), Students (សិស្សានុសិស្ស), Events (កម្មវិធី), Facilities (ហេដ្ឋារចនាសម្ព័ន្ធ).
  - Built-in Fullscreen Lightbox Modal with zoom, image counter, and keyboard shortcuts (`Esc`, `ArrowLeft`, `ArrowRight`).
- **Real School Photos**: Uses authentic photos from the school campus, classrooms, teachers, and student assemblies.
- **Live Stats Counters**: Animated number counters on scroll.
- **Interactive Contact Form**: Client-side validated form that saves submitted messages to `localStorage`.
- **Fast & Lightweight**: Built with Vite and TypeScript for sub-second build times and instant hot reload.

---

### 🚀 Getting Started

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

#### 3. Build for Production
```bash
npm run build
```
Production output files will be generated in the `dist/` directory.

#### 4. Preview Production Build
```bash
npm run preview
```

---

### 📁 Project Structure
```text
├── public/
│   └── images/          # Real school photos & logo
├── src/
│   ├── data.ts          # Bilingual school content, programs, gallery data
│   ├── main.ts          # Interactive client logic in TypeScript
│   ├── style.css        # Tailwind CSS imports & custom styles
│   └── types.ts         # TypeScript interfaces & types
├── index.html           # Main website HTML
├── package.json         # Dependencies & scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite + Tailwind CSS plugin setup
```
