# 🚀 DashSync – Personalized Dashboard for Movies & News

DashSync is a *Next.js + TypeScript* web application that aggregates *trending movies* and *top news articles, personalised to each user’s **preferences* (genre + category) and *authentication*.

🙋 Built as an assignment for *Software Development Engineer – Frontend (Unthinkable Solutions)*  
🛠 Fully responsive, production-ready and extensible.

---

## ✅ Features

| Feature | Status |
|--------|--------|
| 🔐 User Authentication (Clerk) | ✅ |
| 😍 Add / Remove Favorites | ✅ Per-user (Local + Clerk) |
| ⚙ User Preference Panel | ✅ Movie & News Preferences |
| 🔥 Trending Movies Feed | ✅ |
| 📰 Top News Feed | ✅ |
| 🧠 Personalized Home | ✅ Based on Preferences |
| 🌓 Light / Soft-Dark Theme | ✅ Toggle in Navbar |
| 🔎 Debounced Movie Search | ✅ |
| 🎞 Hover Trailer (Movies) | ✅ Plays after 2s hover |
| 💬 News Modal | ✅ Opens article without redirect |
| 🛡 Protected Routes | ✅ Favorites, Movies, Settings |

---

## 🧱 Tech Stack

- *Next.js 15* (Pages router)
- *TypeScript*
- *TailwindCSS*
- *Redux Toolkit* + *RTK Query*
- *Clerk* (Auth + user management)
- *NewsAPI / TMDB API*
- *Framer Motion*
- *React hooks / debounce*

---

## ⚙ Setup

```bash
git clone https://github.com/<your-username>/dashsync-dashboard.git
cd datasync-dashboard
bun install              # or npm / yarn
bun dev                  # runs at http://localhost:3000
````
## 📁 Folder Structure
````
src/
├─ app/
│  └─ layout.tsx
├─ pages/
│  ├─ index.tsx         // Home
│  ├─ Movie.tsx
│  ├─ News.tsx
│  ├─ Favorite.tsx
│  └─ setting.tsx
├─ layouts/
│  └─ DashboardLayout.tsx
├─ components/
│  ├─ Navbar.tsx
│  ├─ MovieCard.tsx
│  ├─ NewsCard.tsx
│  ├─ NewsModal.tsx
│  ├─ ErrorBoundary.tsx
│  ├─ ProtectedPage.tsx
│  └─ Loader.tsx
└─ features/
   ├─ movies/
   ├─ news/
   ├─ favorite/
   └─ user/
````
📸 Demo

> Visit Live : 
 https://dashsync.vercel.app


---

👩‍💻 Author

Riya Kaushik – Frontend Developer

📫 riya1807pro@gmail.com
🔗 https://github.com/riya1807pro


---

⭐ If you like the project, please consider giving it a star