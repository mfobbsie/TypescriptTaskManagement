# Task Management App (TypeScript + React + Auth0)
A clean, responsive task management application built with React, TypeScript, Auth0 authentication, and Context API for global state. The app allows users to securely log in, create tasks, sort them, and view detailed information in a dedicated task view.

This project demonstrates strong fundamentals in component architecture, state management, protected routes, and user‑focused UI design.

## ✨ Features
🔐 Secure Authentication
Auth0 login and logout flow

Protected routes for Dashboard and Task Details

Redirect handling after login

## 📝 Task Creation
Add tasks with:

Title

Description

Due date

Priority (Low, Medium, High)

UI validation prevents empty or invalid submissions

## 📋 Dashboard Overview
Displays all tasks in a clean card layout

Sorting options:

Newest added

Due date

Priority

Mark tasks as completed

Visual feedback when tasks are completed

## 🔍 Task Details View
Full task information displayed on a dedicated page

Edit mode with form validation

Update task fields (title, description, due date, priority, completion status)

Delete tasks with redirect back to Dashboard

## 🌐 Global State with Context API
Centralized task storage

Add, update, toggle completion, and delete tasks

Accessible across all authenticated routes

## 🧱 Tech Stack
React 18

TypeScript

Vite

Auth0 React SDK

React Router

Context API

CSS Modules

## 🚀 Getting Started
1. Install dependencies
bash
npm install
2. Add your Auth0 environment variables
Create a .env file:

Code
VITE_AUTH0_DOMAIN=your-domain
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-audience
3. Run the development server
bash
npm run dev
## 🧪 Core Architecture
### Context API
All task logic lives in TaskContext.tsx, including:

addTask

updateTask

toggleTaskCompleted

deleteTask

This ensures consistent state across Dashboard and Task Details.

### Protected Routes
withAuthenticationRequired ensures only logged‑in users can access:

/dashboard

/tasks/:id

### Routing Structure
Code
/
├── Login (public)
├── Dashboard (protected)
└── Task Details (protected)
##  🔮 Future Enhancements
1. Expanded Sorting Options
Currently, tasks can be sorted by:

Due date

Priority

Newest added

Planned enhancement:  
Add ascending/descending toggles for each sort type, such as:

Due Date ↑ / Due Date ↓

Priority High → Low / Low → High

Alphabetical A → Z / Z → A

This will give users more control over how they organize their workflow.

2. Redesigned Task Details Interface
The current Task Details page is functional but minimal.

Planned enhancement:  
Transform the Task Details view into a card‑based interface that visually matches the Dashboard cards, including:

A styled header with priority badge

A clean card layout for description, due date, and completion status

A more intuitive edit mode

Better spacing and typography for readability

This will create a more cohesive and polished user experience.

3. Additional Planned Features
Task search bar

Filter by completion status

Local storage or backend persistence

User profile page with saved preferences

Dark mode toggle

## 📸 Screenshots 
Welcome Page


Auth0


Dashboard  


Task Details 


## 📄 License
This project is for educational and portfolio use.
