# Task Management App

Hey there! 👋 This is a task management app I built using React and TypeScript. It helps you keep track of your tasks with a clean, modern interface. I used Ant Design for the UI components and integrated it with MockAPI for data storage.

## What Can It Do?

### Managing Tasks
- Create tasks with a title, priority level, and due date
- Edit or delete tasks whenever you need
- Mark tasks as done/not done
- Sort your tasks however you like (by title, priority, or due date)
- Filter tasks to find what you need quickly
- Search through your tasks by title or priority

### Cool UI Features
- Nice, clean design that's easy on the eyes
- Works great on phones, tablets, and desktops
- Dark and light themes (it can match your system theme too!)
- Shows loading states so you know what's happening
- Handles network issues gracefully with retry options
- Lets you know when something goes wrong (or right!)

### Under the Hood
I built this with some modern web tech:
- React 18 with TypeScript for type safety
- Ant Design for UI components
- Tailwind CSS for styling
- Axios for API calls
- Day.js for date handling
- MockAPI for data persistence

## Want to Try It Out?

1. First, install everything:
```bash
npm install
```

2. Then start it up:
```bash
npm run dev
```

3. Head over to [http://localhost:5173](http://localhost:5173) in your browser

## How It's Organized

The code is structured like this:
```
src/
├── assets/         # Images and other static files
├── components/     # All the React components
├── contexts/       # Theme handling
├── services/      # API stuff
├── types/         # TypeScript types
├── utils/         # Helper functions
└── App.tsx        # Main app component
```

## API Details

The app talks to MockAPI here:
```
Base URL: https://675b22589ce247eb1935bcff.mockapi.io/api/v1

GET    /tasks      # Gets your tasks (with pagination)
POST   /tasks      # Makes a new task
PUT    /tasks/:id  # Updates a task
DELETE /tasks/:id  # Removes a task
```

## Error Handling

I made sure the app handles problems gracefully:
- Detects when you're offline
- Shows friendly error messages
- Lets you retry failed operations
- Validates forms before submitting
- Handles API errors smoothly

## Responsive Design

The layout adjusts based on your screen size:
- On big screens (1200px+): Shows the form and task list side by side
- On medium screens: Stacks everything in a single column
- On phones: Everything's optimized for touch and smaller screens

## Current Limitations

Here are some things to keep in mind while using the app:
- The MockAPI is limited to 100 requests per minute
- Task descriptions are not supported yet
- No user authentication/authorization
- No task categories or tags
- No data export/import functionality
- No task reminders or notifications
- Limited to single user operation

## Future Improvements

Here's are list of possible improvements:
1. **Enhanced Task Features**
   - Rich text descriptions
   - File attachments
   - Task categories and tags
   - Subtasks and checklists
   - Due date reminders

2. **User Management**
   - User authentication
   - Personal task lists
   - Task sharing and collaboration
   - User preferences saving

3. **Data Management**
   - Data export to CSV/JSON
   - Bulk task operations
   - Task templates
   - Task history and activity log

4. **UI Enhancements**
   - Drag-and-drop task reordering
   - Calendar view
   - Kanban board view
   - Custom theme colors
   - Keyboard shortcuts


Hope you find this useful! Feel free to try it out and let me know if you have any questions. 😊
