# MediaRecs-AI  
**AI-Powered Content Recommendation Platform**

🎬 **Live Demo:** https://youtu.be/993TdfYBSVM  

**MediaRecs-AI** is an AI-powered recommendation platform that helps users discover movies and content using natural language.  
It combines a modern streaming-style UI with OpenAI-driven recommendations and real-time data from TMDB.

This project is built as a **production-ready SaaS-style application** with authentication, protected routes, API integrations, and scalable frontend architecture — designed to demonstrate how AI-driven recommendation systems can be used in real products.

## 🚀 What This App Does

MediaRecs-AI allows users to:

- Sign up and log in securely  
- Browse trending and popular content  
- Ask AI what to watch using natural language  
- Instantly receive personalized recommendations  
- View trailers and movie details  
- Switch languages dynamically  

It demonstrates how **AI can be embedded into a modern web product** to drive user engagement and discovery.

## ✨ Key Features

### 🔐 Authentication & User Accounts
- Firebase authentication (sign up / sign in)
- Protected routes for logged-in users
- Profile management (name & avatar)
- Persistent login sessions

### 🎥 Content Discovery UI
- Trending, Now Playing & Popular content feeds  
- Dynamic movie data from TMDB  
- YouTube trailer integration  
- Fully responsive Netflix-style interface  

### 🤖 AI Recommendation Engine
- Natural-language search powered by OpenAI  
- Users can describe what they want to watch  
- GPT generates intelligent recommendations  
- Results are matched with real TMDB movie data  

### 🌍 Multi-Language Support
- App-wide language switching  
- GPT responses adapt to selected language  
- UI text updates dynamically  

### ⚡ Performance & Architecture
- Redux Toolkit for state management  
- Custom React hooks for API & AI logic  
- Memoized calls for performance  
- Modular, scalable frontend structure  

## 🧠 Why This Project Matters

MediaRecs-AI is not just a UI clone — it demonstrates how to build:

- AI-powered user experiences  
- Authenticated SaaS-style frontends  
- Real-time API-driven dashboards  
- Scalable React architecture  

It can be adapted for:
- Streaming platforms  
- E-learning platforms  
- E-commerce product recommendations  
- Content and media startups  

## 🛠 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS  
- **State Management:** Redux Toolkit  
- **Authentication:** Firebase  
- **AI:** OpenAI (ChatGPT API)  
- **Content API:** TMDB  
- **Hosting:** Vercel / Firebase Hosting  

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Vishrut19/MediaRecs-AI.git
cd MediaRecs-AI
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a .env file in the root folder:
```bash
VITE_REACT_APP_OPENAI_KEY=YOUR_OPENAI_API_KEY
VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY
```

### 2. Run the app
```bash
npm run dev
```
