# Debug React-DND with Cyclomedia StreetSmart API

Using React-DND with the Cyclomedia StreetSmart API leads to this error: `Cannot have two HTML5 backends at the same time`. This issue arises because the Cyclomedia StreetSmart API also uses React-DND internally, which conflicts with the React-DND setup in our own application.

This repository contains a isolated example that reproduces this issue.

## How to Reproduce the Issue
To reproduce the issue, follow these steps.
* First install the dependencies:
```bash
npm install
```
* Copy the `.env` to `.env.local` and fill in the required values for logging in to the Cyclomedia StreetSmart API. 
* Start the development server:
```bash
npm run dev
```
* Open your browser and navigate to `http://localhost:5173`.

The error should be visible in the browser console. 

## Make the error go away
Commenting out the `<DndExample />` component in `src/App.tsx` should be enough to load StreetSmart correctly and make the error go away. <br />
*Note: you then might have to refresh the page in the browser (F5), as hot reload sometimes has an issue with reinitializing the API in this setup.*