# ✍️ Thread Blog - Modern Publishing Platform

**Thread Blog** è una piattaforma di publishing moderna e minimale, progettata per offrire un'esperienza di storytelling fluida e focalizzata sui contenuti. 

L'applicazione permette agli utenti di pubblicare articoli tramite un editor rich-text, gestire una propria community attraverso i commenti e scoprire contenuti filtrati per categorie, il tutto supportato da un sistema di autenticazione robusto che integra i social login più diffusi.

---

## 🚀 Demo
L'applicazione è distribuita su Vercel: [https://threadblog.vercel.app](https://threadblog.vercel.app)

## ✨ Funzionalità Principali

- **Social Auth (OAuth 2.0)**: Accesso rapido e sicuro tramite **Google** e **GitHub**, integrati con **Passport.js** per una gestione professionale dei profili social.
- **Rich-Text Editor**: Creazione di contenuti formattati per una narrazione visiva chiara e professionale.
- **Esperienza di Lettura Ottimizzata**: Focus su tipografia pulita e indicazione del **tempo di lettura** per ogni articolo.
- **Gestione Media (Cloudinary)**: Caricamento e hosting delle immagini di copertina tramite integrazione con il servizio cloud **Cloudinary**.
- **Community Interattiva**: Sistema di commenti integrato che permette il confronto e il feedback diretto tra lettori e autori.
- **Filtri & Categorie**: Esplora i contenuti del blog filtrandoli per **categoria**, facilitando la scoperta di nuovi argomenti di interesse.
- **Sicurezza Avanzata**: Validazione costante del **JWT** lato database per garantire l'integrità delle sessioni e la protezione dei dati utente.

---

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), React Router Dom, **React-Bootstrap**, Lucide React (Icone).
- **Backend**: Node.js, Express, MongoDB (**Mongoose**).
- **Authentication**: **Passport.js** (Google & GitHub strategies), **JWT** (JSON Web Token) per sessioni stateless ma validate nel database.
- **File Management**: **Multer**, **Cloudinary SDK** per l'upload e la gestione delle immagini di copertina.
- **Utility**: **React Dropzone** (gestione file), **React Hot Toast** (notifiche UI), **JWT-Decode** (protezione rotte frontend).

---

## 🇺🇸 English version

**Thread Blog** is a modern publishing platform designed for seamless storytelling. It features a rich-text editor, content categorization, and an interactive community where users can engage through comments and social authentication.

### ✨ Key Features
- **OAuth 2.0 Authentication**: Seamless login via **Google** and **GitHub** powered by **Passport.js**.
- **Rich-Text Publishing**: A professional editor to create well-formatted and engaging blog posts.
- **Optimized Reading**: Clean typography and **reading time** information for a better user experience.
- **Cloud Media Hosting**: Direct integration with **Cloudinary** for fast and reliable cover image uploads.
- **Interactive Comments**: Engage with authors and other readers through a dedicated feedback system.
- **Category-Based Feed**: Easily browse and filter articles by specific topics and categories.
- **Robust Security**: Real-time **JWT validation** against the database to ensure session integrity and user safety.

---

## 🚀 Upcoming Features (Roadmap)
- [ ] **Advanced Search**: Sistema di ricerca degli articoli per titolo, categoria o autore.
- [ ] **User Profile Management**: Possibilità per gli utenti di aggiornare i propri dati.
- [ ] **Favorites System**: Sistema di bookmark per salvare gli articoli e leggerli in seguito.
- [ ] **Post Management**: Funzionalità di modifica ed eliminazione per i propri articoli.

---

## 👤 Author
**Alessandro**
- GitHub: [https://github.com/Alessandro01-dev/thread_blog](https://github.com/Alessandro01-dev/thread_blog)
- Live Demo: [https://threadblog.vercel.app](https://threadblog.vercel.app)