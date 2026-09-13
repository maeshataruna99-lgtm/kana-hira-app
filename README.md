# Kana Learning Companion

A mobile-first web app for learning Hiragana and Katakana, with a calm pastel interface and an on-screen learning companion.

## Current progress

The project foundation and responsive application shell are in place:

- Vue 3, TypeScript, Vite, Tailwind CSS, and Vue Router
- Home, Learn, Quiz, Progress, and Settings routes
- Mobile bottom navigation and desktop sidebar navigation
- All 92 basic Hiragana and Katakana, grouped with romaji
- Flashcards with flip interaction and local vocabulary associations
- Configurable quiz with mixed scripts/directions and 10, 20, or 50 questions
- LocalStorage progress, mastery levels, weak-kana review priority, and reset control
- Companion portrait and contextual dialogue for quiz events

## Development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Roadmap

Next, the app can receive UI polish, optional audio, daily practice/streaks, and deployment to Vercel.

## Deployment

The app is ready to deploy as a Vite static site. Import this GitHub repository into Vercel; the default build command is `npm run build` and the output directory is `dist`. The included `vercel.json` routes direct visits to Vue Router pages back to the app shell.
