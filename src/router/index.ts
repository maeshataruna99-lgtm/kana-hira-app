import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LearnView from '../views/LearnView.vue'
import FlashcardView from '../views/FlashcardView.vue'
import ProgressView from '../views/ProgressView.vue'
import QuizView from '../views/QuizView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/learn', name: 'learn', component: LearnView },
    { path: '/flashcards', name: 'flashcards', component: FlashcardView },
    { path: '/quiz', name: 'quiz', component: QuizView },
    { path: '/progress', name: 'progress', component: ProgressView },
    { path: '/settings', name: 'settings', component: SettingsView },
  ],
})

export default router
