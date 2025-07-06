# 📊 React Spreadsheet Application

A pixel-perfect React spreadsheet application built as per the internship assignment requirements.

## 🎯 Project Overview

This is a static, front-end-only React prototype that visually matches the provided Figma design for a spreadsheet view. The application provides a Google Sheets/Excel-like experience with interactive features and clean, maintainable code.

## 🚀 Features

### Core Features
- **Pixel-perfect Figma implementation** - Matches the design specifications exactly
- **Excel-like spreadsheet experience** - Cell selection, editing, and navigation
- **Interactive UI elements** - All buttons and tabs are functional
- **Responsive design** - Works across different screen sizes
- **TypeScript strict mode** - Type-safe code throughout

### Spreadsheet Functionality
- ✅ Cell selection and highlighting
- ✅ Double-click to edit cells
- ✅ Keyboard navigation (Enter, Escape)
- ✅ Status badges with custom styling
- ✅ Priority indicators
- ✅ Currency formatting with rupee symbol
- ✅ Hover effects and visual feedback

### UI Components
- 📋 Dynamic toolbar with functional buttons
- 🔍 Search functionality
- 👤 User profile section
- 📊 Status indicators and priority badges
- 🎨 Color-coded column headers
- 📱 Bottom navigation tabs

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Strict mode enabled
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast development and build tool
- **Lucide React** - Beautiful icons

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/react-spreadsheet-app.git

# Navigate to project directory
cd react-spreadsheet-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 📱 Live Demo

🔗 **[Live Application](https://react-spreadsheet-delta.vercel.app/)**

## 🎨 Design Reference

The application is built to match the Figma design specifications:
- [Figma Design Link](https://www.figma.com/design/3nywpu5sz45RrCmwe68QZP/Intern-Design-Assigment?node-id=2-2535&t=DJGGMt8I4fiZjoIB-1)

## 📁 Project Structure

```
src/
├── components/
│   └── SpreadsheetApp.tsx    # Main spreadsheet component
├──Index.html           # TypeScript interfaces
├── App.tsx                   # Root component
└── main.tsx                  # Application entry point
```

## 🎯 Implementation Details

### Key Components

1. **SpreadsheetApp** - Main component containing all spreadsheet logic
2. **Cell Rendering** - Dynamic cell rendering with different types (text, status, priority, currency)
3. **Interactive Elements** - Toolbar buttons, search, user profile
4. **Status Management** - Visual status indicators with custom styling

### Technical Decisions

- **State Management**: Used React's built-in useState for local state management
- **Styling**: Tailwind CSS for utility-first styling approach
- **Type Safety**: TypeScript interfaces for all data structures
- **Performance**: Optimized rendering with proper key props and event handling

## 🔧 Trade-offs & Considerations

### Design Decisions
- **Static Data**: Used mock data instead of API integration for this prototype
- **Image Assets**: Referenced placeholder images for icons (would need actual assets)
- **Responsive Design**: Focused on desktop experience as per requirements
- **Performance**: Prioritized code clarity over micro-optimizations

### Known Limitations
- Images are referenced but not included in repository
- No data persistence (changes reset on refresh)
- Limited keyboard navigation (basic implementation)
- No column resizing (stretch goal not implemented due to time)

## 🎪 Features Implemented

### ✅ Core Requirements
- [x] Pixel-perfect Figma implementation
- [x] Excel-like spreadsheet experience
- [x] Interactive buttons and tabs
- [x] Clean, linted code
- [x] TypeScript strict mode
- [x] Tailwind CSS styling

### ⚡ Stretch Goals
- [x] Basic keyboard navigation (Enter/Escape)
- [ ] Column resize functionality
- [ ] Column hide/show toggles
- [ ] Advanced keyboard navigation (arrow keys)




## 🙏 Acknowledgments

- Design provided by Inscripts team
- Built with modern React and TypeScript
- Styled with Tailwind CSS
- Some Icons by Lucide React

---

**Built with ❤️ and lots of ☕ by [NIKHIL RAI]**