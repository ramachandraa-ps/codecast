# CodeCast - Developer Video Platform

CodeCast is a modern video platform specifically designed for developers to share, learn, and engage with coding-related content. Built with React, TypeScript, and modern web technologies, it provides a seamless experience for both content creators and learners.

## 🌟 Features

- **Video Content Management**

  - Upload and host coding tutorials
  - Organize content by topics and difficulty levels
  - Support for code snippets and timestamps
  - Video playback with developer-friendly controls

- **User Experience**

  - Responsive design for all devices
  - Dark/Light theme support
  - Advanced search and filtering
  - Watch later functionality
  - Progress tracking

- **Creator Dashboard**

  - Analytics and metrics
  - Content management tools
  - Audience engagement insights
  - Upload and edit capabilities

- **Authentication & Security**
  - Secure user authentication
  - Profile management
  - Role-based access control

## 🚀 Tech Stack

- **Frontend Framework**: React 18.x
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Build Tool**: Vite
- **State Management**: React Query
- **Form Handling**: React Hook Form + Zod
- **UI Components**:
  - Radix UI primitives
  - Custom components
  - Responsive layouts

## 📦 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── auth/          # Authentication related components
│   ├── common/        # Shared components
│   ├── creator/       # Creator dashboard components
│   ├── dashboard/     # Analytics and metrics components
│   ├── layout/        # Layout components
│   └── ui/            # UI component library
├── contexts/          # React contexts
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and constants
├── pages/             # Application pages
└── types/             # TypeScript type definitions
```

## 🛠️ Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/ramachandraa-ps/codecast.git
   cd codecast
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

- `vite.config.ts` - Vite configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
