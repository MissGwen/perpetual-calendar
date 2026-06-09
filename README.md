<div align="center">

# 🌌 Modern Chinese Perpetual Calendar

A beautifully crafted, responsive perpetual calendar web application that elegantly blends modern design with rich traditional Chinese calendar features.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript)

<!-- TODO: Add your awesome product screenshot here -->
<!-- ![App Screenshot](./public/screenshot.png) -->
<br/>
*A perfect harmony of Gregorian calendar, Lunar calendar, and traditional Chinese Almanac (Huangli).*

</div>

---

## ✨ Product Highlights & Experience

### 📅 Comprehensive Calendar System

Not just a simple date viewer. We deeply integrated the `lunar-javascript` library to provide a highly accurate **Lunar Calendar (Nongli)**, complete with **Solar Terms (Jieqi)**, **traditional festivals**, and **public holiday arrangements**. The grid is intelligently marked, giving you a clear overview of the month at a single glance.

### 🤖 AI-Powered Fortune Analysis

Experience traditional culture with a modern twist. By leveraging **DeepSeek AI**, the application interprets complex traditional Almanac data (such as Five Elements, Stem-Branch, and 28 Mansions) and generates a **personalized, easy-to-understand daily fortune analysis**. It provides gentle, actionable advice for your daily life, work, and emotions.

### 📔 Traditional Chinese Almanac (Huangli) Visualized

Dive into the rich details of Chinese numerology without the clutter. The sidebar elegantly visualizes:

- **Daily Aura & Numerology**: Detailed analysis of daily Five Elements (Wu Xing), Na Yin, and the state of vigor and decline (Wang Shuai).
- **Auspicious & Inauspicious (Yi & Ji)**: Clear indicators of what to do and what to avoid today.
- **Twelve Establishments & 28 Mansions**: Deep insights into the "Day Value" and "Day God" (Yellow/Black Road).

### ✍️ Daily Mindfulness Journal

A cozy corner for yourself. The built-in local-storage-based text area allows you to leave a short message or reflection for your "today-self". A small interaction that brings warmth to your daily routine.

### 🎨 Ultimate Visual & Acoustic Experience

- **Glassmorphism UI**: A stunning frosted-glass aesthetic combined with smooth Tailwind CSS animations.
- **Ambient Music**: An integrated background music player that creates an immersive, tranquil atmosphere while you plan your days.
- **Fully Responsive**: Carefully adapted for both mobile and desktop. Features an exclusive compact layout on mobile to solve screen space constraints, while providing a spacious panoramic view on PC.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router) / [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (with `clsx` & `tailwind-merge` for dynamic classes)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Core Algorithm**: [lunar-javascript](https://github.com/6tail/lunar-javascript)

---

## 🚀 Quick Start

Get the project up and running locally in just a few steps:

### 1. Clone & Install

It is recommended to use `pnpm` (or `npm`) to install dependencies:

```bash
# Install dependencies
pnpm install
```

### 2. Start the Development Server

```bash
pnpm dev
```

After starting, visit [http://localhost:3000](http://localhost:3000) in your browser to experience the application.

### 3. Build for Production

```bash
pnpm build
pnpm start
```

---

## 📂 Core Architecture

```text
.
├── app/                  # Next.js App Router routes and main pages
│   ├── api/              # API Routes (including AI analysis endpoints)
│   ├── font/             # Custom local fonts
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout (SEO optimized)
│   └── page.tsx          # Home page main view
├── src/
│   ├── components/       # UI Components
│   │   ├── Calendar.tsx      # Main calendar grid component
│   │   ├── DateDetail.tsx    # Sidebar details (Almanac, AI, etc.)
│   │   ├── BGMPlayer.tsx     # Ambient music player
│   │   └── MonthNavigator.tsx# Month navigation bar
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Core logic & Utility functions
```

---

## 🤝 Contributing & Feedback

Issues and Pull Requests are always welcome! Whether it's a bug report, a feature suggestion, or a typo fix, feel free to help improve this project.

## 📄 License

This project is open-sourced under the **MIT License**.
