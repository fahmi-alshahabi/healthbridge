# HealthBridge

A web-based healthcare appointment booking platform that connects patients with doctors. Patients can browse available doctors and book appointments, doctors can apply to join the platform and manage their schedules, and administrators can review doctor applications and manage users.

Built with **React**, **Redux Toolkit**, **Ant Design** and **Firebase (Cloud Firestore)**.

## Features

- **User accounts** – registration and login, with passwords encrypted before storage
- **Doctor directory** – browse approved doctors, their specialisations, fees and working hours
- **Appointment booking** – check a doctor's availability for a given date and time, then book a slot
- **Doctor applications** – users can apply to become a doctor on the platform
- **Doctor dashboard** – view incoming appointments and approve or reject them
- **Profile** – view personal details and appointment history
- **Admin panel** – approve or block doctor applications and view all registered users
- **Protected routes** – pages are restricted to logged-in users, with role-based access for admins

## Tech stack

| Area | Technology |
|------|------------|
| Frontend | React 18, React Router 7 |
| State management | Redux Toolkit, React Redux |
| UI components | Ant Design 5 |
| Database | Firebase Cloud Firestore |
| Hosting | Firebase Hosting |
| Utilities | Moment.js, crypto-js |

## Project structure

```
src/
├── apicalls/        # Firestore queries for users, doctors and appointments
├── components/      # Shared components (ProtectedRoute, Spinner)
├── pages/           # Home, Login, Register, Profile, BookAppointment,
│                    # DoctorForm, Admin, Contact and landing pages
├── redux/           # Redux store and loader slice
├── firebaseConfig.js
└── App.js           # Routes
```

## Getting started

### Prerequisites

- Node.js 18+
- A Firebase project with Cloud Firestore enabled

### Installation

```bash
git clone https://github.com/<your-username>/healthbridge.git
cd healthbridge
npm install
```

### Configuration

Copy the example environment file and fill in your own Firebase project settings (found in the Firebase console under **Project settings → Your apps**):

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `REACT_APP_FIREBASE_*` | Firebase web app configuration values |
| `REACT_APP_PASSWORD_SECRET` | Secret used to encrypt user passwords before they are stored |

### Run locally

```bash
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Build and deploy

```bash
npm run build
firebase deploy
```

## Possible improvements

- Replace reversible password encryption with Firebase Authentication or one-way hashing
- Add Firestore security rules to restrict access by user role
- Email notifications for appointment confirmations
