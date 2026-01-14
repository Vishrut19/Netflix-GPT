# Netflix GPT  
**AI-Powered Netflix-Style Movie Discovery App**

🎬 **Live Demo:** https://youtu.be/993TdfYBSVM  

Netflix GPT is a full-stack web application that combines a Netflix-style UI with AI-powered movie recommendations using OpenAI and TMDB. Users can sign in, browse trending movies, and ask AI to suggest what to watch based on their mood or prompt.

This project is built as a **production-grade SaaS-style application** with authentication, protected routes, AI search, and modern UI/UX.

---

## ✨ Key Features

### 🔐 Authentication & User Accounts
- Firebase Authentication (Sign up / Sign in)
- Protected routes (only logged-in users can access the app)
- Profile update (display name & avatar)
- Automatic session handling

### 🎥 Netflix-Style Browsing
- Trending, Now Playing & Popular movies
- Movie trailers embedded from YouTube
- Dynamic movie lists from TMDB API
- Responsive Netflix-style UI

### 🤖 AI Movie Search
- AI-powered movie recommendations using OpenAI
- Users can type what they want to watch (e.g. *“romantic comedy for a rainy night”*)
- GPT returns movie suggestions, which are fetched from TMDB and displayed

### 🌍 Multi-Language Support
- Language switching
- GPT results and UI adapt to selected language

### ⚡ Performance & UX
- Redux state management
- Memoized API calls
- Custom hooks for movies & GPT search
- Fully responsive (mobile, tablet, desktop)

---

## 🛠 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS  
- **State Management:** Redux Toolkit  
- **Authentication:** Firebase  
- **AI:** OpenAI (ChatGPT API)  
- **Movies API:** TMDB  
- **Hosting:** Vercel / Firebase Hosting  

---

## 📦 Installation & Setup

### 1. Clone the repository
```
git clone https://github.com/Vishrut19/Netflix-GPT.git
cd Netflix-GPT
```

### 2. Install dependencies
```
npm install 
```

### 3. Configure environment variables
Create a .env file in the root folder:
```
VITE_REACT_APP_OPENAI_KEY=YOUR_OPENAI_API_KEY
VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY
```

### 4. Run the app
```
npm run dev
```
