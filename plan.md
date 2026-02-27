Task Management System:
Objective
Build a full-stack Task Management application using MERN stack.
Section 1: Backend Development (25 Marks)
Create REST APIs using Node.js, Express, MongoDB.
Task Model
Fields:
title (String, required)
description (String)
status (pending/completed)
createdBy (String)
createdAt (Date)
Required APIs
POST /api/auth/register
POST /api/auth/login
POST /api/tasks
GET /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
Requirements:
• Use Express Router
• Use MongoDB and Mongoose
• Proper error handling
• Use JWT authentication
• Protect task routes
Section 2: Frontend Development (25 Marks)
Create React application.
Required Pages:
• Register page
• Login page
• Dashboard page
Dashboard must allow:
• View all tasks
• Create task
• Update task status
• Delete task
Requirements:
• useState
• useEffect
• Axios or Fetch
• Proper component structure
Section 3: Integration and Authentication (20 Marks)
Students must:
• Connect frontend with backend
• Store JWT token
• Access protected routes
• Display logged-in user tasks
Section 4: Advanced Feature (15 Marks)
Implement ANY ONE:
• Filter tasks by status
OR
• Edit task
OR
• Logout functionality
Section 5: GitHub and Code Quality (15 Marks)
Students must:
• Push code to GitHub
• Proper folder structure
• Clean readable code
• Proper naming conventions