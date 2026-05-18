# Perpetual Calendar

A modern, responsive perpetual calendar web application built with **Next.js 16** and **React 19**. It not only provides basic Gregorian calendar viewing capabilities but also deeply integrates rich traditional Chinese calendar features, including the Lunar calendar, Sexagenary cycle (Stem-Branch), Chinese Zodiac, Five Elements (Wu Xing), public holidays, and solar terms.

## ✨ Key Features

- 📅 **Modern UI Design**: Features a glassmorphism style coupled with smooth Tailwind CSS animations, providing an ultimate visual experience.
- 🌙 **Professional Lunar Conversion**: Built-in `lunar-javascript` library for highly accurate Lunar calendar, Stem-Branch (GanZhi), and Zodiac data.
- 🔮 **Daily Aura & Numerology**: Detailed analysis of daily Five Elements (including Na Yin), state of vigor and decline (Wang Shuai), and terrain, along with easy-to-understand "Aura Analysis".
- 🎉 **Solar Terms & Holidays**: Smartly marks national public holidays and the 24 solar terms, with optimized layouts for both mobile and desktop views.
- 📱 **Fully Responsive**: Carefully adapted for both mobile and desktop. Features an exclusive compact layout on mobile to solve screen space constraints, while providing a spacious panoramic view on PC.
- ⚡ **Extreme Performance**: Utilizes Next.js App Router architecture and React Server Components (RSC) best practices, completely resolving Hydration mismatch issues.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router) / [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (with `clsx` & `tailwind-merge` for dynamic classes)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Core Calendar Algorithm**: [lunar-javascript](https://github.com/6tail/lunar-javascript)
- **Code Quality**: ESLint + Prettier

## 🚀 Quick Start

### 1. Clone the project and install dependencies

It is recommended to use `pnpm` or `npm` to install dependencies:

```bash
# Install dependencies
npm install
# OR
pnpm install
```

### 2. Start the development server

```bash
npm run dev
# OR
pnpm dev
```

After starting, visit [http://localhost:3000](http://localhost:3000) in your browser to preview.

### 3. Build and Production Deployment

```bash
npm run build
npm run start
```

## 📂 Core Directory Structure

```text
.
├── app/                  # Next.js App Router routes and main pages
│   ├── font/             # Custom local fonts
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page main view
├── src/
│   ├── components/       # UI Components
│   │   ├── Calendar.tsx      # Main calendar component
│   │   ├── DateCell.tsx      # Calendar grid cell
│   │   ├── DateDetail.tsx    # Sidebar details (Aura, Solar terms, etc.)
│   │   └── MonthNavigator.tsx# Month navigation bar
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
│       ├── cn.ts             # Tailwind class merge utility
│       ├── dateUtils.ts      # Core logic for date and Lunar calculations
│       └── explanations.ts   # Configuration for Five Elements/Aura copy
```

## 🤝 Contributing & Feedback

Issues and Pull Requests are welcome to help improve this project!

## 📄 License

This project is open-sourced under the MIT License.
