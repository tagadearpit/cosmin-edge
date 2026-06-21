# Cosmic Edge

A cinematic and immersive web experience showcasing cosmic phenomena with fluid animations and modern glassmorphism design. Built with cutting-edge web technologies and powered by Google's Gemini API.

**Live Demo:** [https://cosmic-edge.vercel.app](https://cosmic-edge.vercel.app)

---

## 🌌 Overview

Cosmic Edge is an interactive web application that explores the wonders of the cosmos through an elegant and responsive user interface. The project demonstrates advanced frontend techniques including smooth scrolling animations, glass-effect UI components, and seamless integration with AI-powered content generation.

---

## ✨ Key Features

- **Cinematic Animations**: Smooth, fluid animations using GSAP and Motion for captivating user interactions
- **Glassmorphism Design**: Modern, elegant UI with frosted glass effects and transparency
- **AI-Powered Content**: Integration with Google Gemini API for dynamic cosmic information
- **Smooth Scrolling**: Lenis integration for buttery-smooth scroll experiences
- **Responsive Design**: Fully responsive and mobile-optimized interface
- **Type-Safe**: Built with TypeScript for robust and maintainable code
- **Modern Stack**: Next.js 15 with React 19 for optimal performance

---

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js** 15.4.9 - React framework for production
- **React** 19.2.1 - UI library
- **TypeScript** 5.9.3 - Static typing for JavaScript

### Styling & Animation
- **Tailwind CSS** 4.1.11 - Utility-first CSS framework
- **GSAP** 3.15.0 - Industry-standard animation library
- **Motion** 12.23.24 - Animation and interaction library
- **Lenis** 1.3.23 - Smooth scroll behavior
- **Lucide React** 0.553.0 - Icon library

### AI Integration
- **Google Generative AI** (@google/genai) 2.4.0 - Gemini API integration

### Developer Tools
- **ESLint** 9.39.1 - Code linting
- **PostCSS** 8.5.6 - CSS transformations
- **Autoprefixer** 10.4.21 - Vendor prefix handling

---

## 📂 Project Structure

```
cosmin-edge/
├── app/                    # Next.js app directory
├── components/             # Reusable React components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and helpers
├── assets/                 # Static assets (images, fonts, etc.)
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tagadearpit/cosmin-edge.git
   cd cosmin-edge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Update `.env.local` with your configuration (particularly Google Gemini API credentials).

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📜 Available Scripts

- **`npm run dev`** - Start the development server with hot reload
- **`npm run build`** - Create an optimized production build
- **`npm start`** - Start the production server
- **`npm run lint`** - Run ESLint to check code quality
- **`npm run clean`** - Clean Next.js cache and build artifacts

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Google Gemini API Configuration
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

Refer to `.env.example` for all available configuration options.

---

## 🎨 Design System

The project uses **Tailwind CSS** for styling with:
- Custom color palette
- Responsive grid system
- Glassmorphism component library
- Smooth animations and transitions

### Key Dependencies for Design
- **Class Variance Authority** - Component variant management
- **clsx & tailwind-merge** - Utility class handling
- **lucide-react** - Consistent icon set

---

## 🚢 Deployment

The application is currently deployed on **Vercel** at [https://cosmic-edge.vercel.app](https://cosmic-edge.vercel.app).

### Deploy Your Own

1. Push your repository to GitHub
2. Import the project in [Vercel Dashboard](https://vercel.com)
3. Set environment variables in Vercel project settings
4. Deploy with a single click

---

## 📖 Usage

### Basic Usage

The application works out of the box once dependencies are installed and environment variables are configured. The UI is intuitive and self-guided.

### Customization

- Modify styles in component files and Tailwind configuration
- Add new routes in the `app/` directory
- Create reusable components in `components/`
- Add custom hooks in `hooks/`

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request with:
- Clear description of changes
- Properly formatted code (follows ESLint rules)
- Updated documentation if needed

### Development Guidelines
- Use TypeScript for all new code
- Follow the existing component structure
- Maintain consistent code formatting
- Test changes locally before submitting PRs

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🎯 Roadmap

- [ ] Add more cosmic content sections
- [ ] Implement user authentication
- [ ] Add dark/light theme toggle
- [ ] Performance optimizations
- [ ] Mobile app version

---

## 📧 Support & Contact

For questions, suggestions, or bug reports, please [open an issue](https://github.com/tagadearpit/cosmin-edge/issues) on GitHub.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Animations powered by [GSAP](https://greensock.com/gsap/)
- AI integration via [Google Gemini API](https://ai.google.dev/)
- Icons from [Lucide React](https://lucide.dev/)

---

**Created by [tagadearpit](https://github.com/tagadearpit)**

*"Explore the cosmos with elegance and wonder."* ✨
