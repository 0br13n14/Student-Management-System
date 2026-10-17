# Student Management

A basic React app for keeping student records in the browser. It starts with no records or preset course list. Student data is saved in `localStorage`; there is no backend.

## Run locally

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Use the local URL printed by Vite. Run `npm run build` to create a production build in `dist`.

## Student records

Add a student with the **Add student** button. New records start blank; enter a positive whole-number student ID and course as text. No student or course details are preloaded.

Required fields are student ID, full name, age, email, and course. IDs must be unique positive integers, and email addresses must use a valid format. Age must be a whole number of at least 16.

Records can be edited or deleted from the table. Changes are stored in the browser and remain after refresh on the same device and browser.

## Live application url 

```
https://student-management-nicholas.netlify.app/
```
