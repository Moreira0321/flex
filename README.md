# Flex Living Reviews Dashboard

A comprehensive reviews management system for Flex Living, allowing managers to review, approve, and manage guest reviews from the Hostaway API.

## 🌐 Live Demo

- **Frontend**: [https://flex-test-frontend.vercel.app/](https://flex-test-frontend.vercel.app/)
- **Backend API**: [https://flex-test-backend.vercel.app](https://flex-test-backend.vercel.app)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flex
   ```

2. **Start the Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Backend runs on `http://localhost:3001`

3. **Start the Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

## 📱 Features

- **Manager Dashboard**: Review management with approval controls
- **Public Review Display**: Guest-facing review showcase
- **Advanced Filtering**: Filter by rating, category, property, and status
- **Real-time Statistics**: Live dashboard analytics
- **Responsive Design**: Works on desktop and mobile
- **API Integration**: Hostaway API with mock data fallback

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **API**: Hostaway Reviews API integration

## 📁 Project Structure

```
flex/
├── backend/          # Node.js/Express API server
├── frontend/         # React application
└── README.md
```

## 🔗 Application Routes

- `/` - Homepage with feature overview
- `/dashboard` - Manager dashboard for review management
- `/reviews` - Public review display for guests

## 📖 Documentation

For detailed implementation information, see [IMPLEMENTATION.md](./IMPLEMENTATION.md).

## 🚀 Development

- **Backend**: `npm run dev` (with hot reload)
- **Frontend**: `npm run dev` (Vite dev server)
- **Frontend Build**: `npm run build`
- **Frontend Lint**: `npm run lint`

## 📄 License

ISC