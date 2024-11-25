import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"todo-list-web-f059b","appId":"1:431595240142:web:f464974f01dfe985b76e9f","storageBucket":"todo-list-web-f059b.firebasestorage.app","apiKey":"AIzaSyBxOPoV9ghBZbJsecc-z66CI6SG8WSEH3k","authDomain":"todo-list-web-f059b.firebaseapp.com","messagingSenderId":"431595240142"})), provideFirestore(() => getFirestore())
  ]
};
