# 💕 Our Story 💕 - React + Vite + Tailwind

A beautiful love story website converted to React with Vite and Tailwind CSS.

## Features

- ✨ Modern React architecture
- 🎨 Tailwind CSS for styling
- 🖼️ Image lightbox functionality
- 📱 Fully responsive design
- 🔒 Password protection
- ⚡ Fast development with Vite

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
react-app/
├── public/          # Static assets (images)
│   ├── Angry/      # Angry bird images
│   ├── New/        # New year images
│   ├── funny/      # Funny images
│   ├── love/       # Love images
│   └── images/     # Other images
├── src/
│   ├── components/ # React components
│   │   ├── Navbar.jsx
│   │   ├── Home.jsx
│   │   ├── AngryBird.jsx
│   │   ├── NewYear.jsx
│   │   ├── Funny.jsx
│   │   ├── ImportantDates.jsx
│   │   ├── Lightbox.jsx
│   │   └── PasswordPrompt.jsx
│   ├── App.jsx     # Main app component
│   ├── main.jsx    # Entry point
│   └── index.css   # Global styles with Tailwind
└── package.json
```

## Technologies Used

- React 19
- Vite 7
- Tailwind CSS 4
- PostCSS
- Autoprefixer

## Notes

- All images are stored in the `public` folder
- Password prompt appears on first load (password: "Yes")
- Click any image to open it in a lightbox
- Smooth scrolling navigation between sections

