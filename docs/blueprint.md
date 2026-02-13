# **App Name**: ServicePulse AI

## Core Features:

- User Authentication and Roles: Firebase Authentication to manage user roles (Admin, Support Agent, Field Technician, Customer) with role-based dashboards and permissions.
- AI-Powered Ticket Analysis: AI analyzes ticket descriptions, auto-categorizes, sets priority, and suggests initial troubleshooting steps and technician dispatch using the Gemini API as a tool.
- Customer Support Request Submission: Customers can submit support requests with issue details, attachments, and location, and then receive a schedule for the technician visit and also the possibility to rate the service.
- Ticket Management and Assignment: Agents can view tickets, update status, add notes, assign technicians, and review AI recommendations within a Firestore-backed ticket management system.
- Technician Dashboard and Task Management: Technicians receive assigned tickets, customer locations, AI troubleshooting checklists, and work status update options on their dashboard.
- Real-time Notifications: Firebase Cloud Messaging provides real-time notifications for ticket creation, technician assignment, status changes, and visit schedules.
- Admin Analytics and User Management: Admin panel to manage users, track ticket metrics, monitor technician performance, and view AI accuracy statistics.

## Style Guidelines:

- Primary color: Dark slate blue (#3B5998) to reflect a sense of trust and professionalism, drawing inspiration from established tech support interfaces.
- Background color: Light gray (#F0F2F5), very desaturated, for a clean, neutral backdrop that helps the main content stand out in both light and dark mode.
- Accent color: Teal (#008080), a vibrant analogous color, to highlight key actions and information. 
- Body text: 'Inter', a grotesque-style sans-serif suitable for body text. Headlines: 'Space Grotesk' is a proportional sans-serif with a computerized, techy, scientific feel. 
- Consistent use of line icons from a modern set, providing visual clarity and easy recognition of actions and categories.
- Card-based layout for presenting information in a structured manner across all dashboards, emphasizing important metrics and tasks.
- Subtle transitions and animations to acknowledge user actions and status changes, improving the perceived performance of the application.