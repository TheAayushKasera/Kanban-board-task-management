# Kanban-board-task-management
# Alhansat Assignment - Kanban Board

A simple Kanban Board web application built with the MERN (MongoDB, Express, React, Node.js) stack.

![Kanban Board Screenshot](/Screenshot/React-App.png)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Introduction

This project is a Kanban Board web application that helps you manage your tasks across different stages of a project. It provides a visual way to track the progress of your tasks.

## Features

- Create tasks with titles and descriptions.
- Organize tasks into three categories: To-Do, Doing, and Done.
- Drag and drop tasks between categories for easy progress tracking.
- Edit task details and titles.
- Delete tasks.
- Simple and intuitive user interface.

## Demo

You can see a live demo of the Kanban Board here: [Demo Link](https://atrangi-kanban-board.onrender.com/)

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- MongoDB (You can use a cloud-hosted MongoDB service or install it locally)

### Installation

1. Clone the repository:

   
   git clone https://github.com/your-username/alhansat-assignment.git
   
  Install dependencies for both the frontend and backend:
  
    cd frontend
    npm install
    cd backend
    npm install
  
  Create a .env file in the backend directory with the following content:
  
    PORT=8000
    MONGODB_URI=your-mongodb-connection-uri
    Replace your-mongodb-connection-uri with your MongoDB connection URI.
  
  Start the backend server:
  
    cd backend
    npm start
    
  Start the frontend development server:
  
  
    cd frontend
    npm start
  Open your web browser and navigate to http://localhost:3000 to use the Kanban Board.

## Usage
  - Create tasks by entering a title and description in the "Add Task" section.
  - Drag and drop tasks between the To-Do, Doing, and Done columns to update their progress.
  - Click the "Edit" button to edit a task's title and description.
  - Click the "Delete" button to delete a task.
## API
  The backend of this project provides a simple API for managing tasks. Here are the available API endpoints:
  
  - GET /api/getdata: Fetch all tasks.
  - POST /api/postdata: Create a new task.
  - PUT /api/updateprogress: Update a task's progress.
  - PUT /api/updatetask: Update a task's title and description.
  - DELETE /api/deletedata: Delete a task.
## Contributing
  Contributions are welcome! If you have any ideas for improvements or bug fixes, please open an issue or create a pull request.

## Acknowledgments
  React
  React Beautiful DND
  Express.js
  MongoDB
