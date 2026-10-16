# Campus Marketplace

This is a web app for students to buy and sell things with each other. The server is an Express API written in TypeScript, and the client is a React app (also TypeScript) that talks to it.

## Instructions for Build and Use

Steps to build and/or run the software:

1. Clone or download this repository
2. Start the server (runs on `http://localhost:3000`):
   - `cd server`
   - `npm install`
   - `npm run dev`
3. In a second terminal, start the client (runs on `http://localhost:5173`):
   - `cd client`
   - `npm install`
   - `npm run dev`
4. Open `http://localhost:5173` in your browser

Note: listings are stored in memory, so they reset to the sample data every time the server restarts.

Instructions for using the software:

1. The home page shows recently added listings. Click "View all" to see every listing
2. On the All Listings page, use the search bar to find items by title
3. Click "Create Listing" or "Sell an Item" to open the form and post an item for sale
4. Fill in the title, description, price, category, and address, then submit
5. Click a listing to view its full details
6. Use the sun/moon button in the header to switch between light and dark theme

## Development Environment

To recreate the development environment, you need the following software and/or libraries with the specified versions:

* Node.js (v18 or higher)
* TypeScript
* Server: Express.js, cors, tsx (runs TypeScript directly during development)
* Client: React, Vite, React Router, lucide-react (icons)

## Useful Websites to Learn More

I found these websites useful in developing this software:

* [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
* [Express.js Documentation](https://expressjs.com/)
* [React Documentation](https://react.dev/)
* [Vite Documentation](https://vite.dev/guide/)
* [React Router Documentation](https://reactrouter.com/)

## Future Work

The following items I plan to fix, improve, and/or add to this project in the future:

* [ ] Integrate a database (MongoDB) to keep data persistent
* [ ] Add category and price range filters to the search
* [ ] Delete listings from the detail page
* [ ] Add user accounts and authentication
* [ ] Add likes and comments on listings
* [ ] Add image upload for listings