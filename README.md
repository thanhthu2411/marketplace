# Campus Marketplace

This is a web app for students to buy and sell things with each other. The server is an Express API written in TypeScript that stores data in MongoDB, and the client is a React app (also TypeScript) that talks to it.

## Instructions for Build and Use

Steps to build and/or run the software:

1. Clone or download this repository
2. Set up MongoDB: create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas), create a database user, and allow your IP address under Network Access
3. Create a file named `.env` inside the `server` folder with your connection string (see `.env.example`):
MONGODB_URI=mongodb+srv://<username>:<password>@<your-cluster>.mongodb.net/campus-marketplace
4. Start the server (runs on `http://localhost:3000`):
   - `cd server`
   - `npm install`
   - `npm run dev`
5. In a second terminal, start the client (runs on `http://localhost:5173`):
   - `cd client`
   - `npm install`
   - `npm run dev`
6. Open `http://localhost:5173` in your browser

Note: when the server starts, it adds sample listings to the database only if the listings collection is empty. Your data is saved in MongoDB, so it stays after the server restarts. To reset to the sample data, run `npm run seed` in the `server` folder (this deletes all existing listings).

Instructions for using the software:

1. The home page shows recently added listings. Click "View all" to see every listing
2. On the All Listings page, use the search bar to find items by title
3. Click "Create Listing" or "Sell an Item" to open the form and post an item for sale
4. Fill in the title, description, price, category, and address. Depending on the category, extra fields appear (for example author and edition for books, or brand and warranty for electronics), then submit
5. Click a listing to view its full details
6. On the detail page, click "Edit" to change a listing or "Delete" to remove it
7. Use the sun/moon button in the header to switch between light and dark theme

## Development Environment

To recreate the development environment, you need the following software and/or libraries with the specified versions:

* Node.js (v18 or higher)
* TypeScript
* MongoDB Atlas account (free tier works)
* Server: Express.js, MongoDB Node.js driver (`mongodb`), dotenv, cors, tsx (runs TypeScript directly during development)
* Client: React, Vite, React Router, lucide-react (icons)

## Useful Websites to Learn More

I found these websites useful in developing this software:

* [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
* [Express.js Documentation](https://expressjs.com/)
* [MongoDB Node.js Driver Documentation](https://www.mongodb.com/docs/drivers/node/current/)
* [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
* [React Documentation](https://react.dev/)
* [Vite Documentation](https://vite.dev/guide/)
* [React Router Documentation](https://reactrouter.com/)

## Future Work

The following items I plan to fix, improve, and/or add to this project in the future:

* [ ] Add category and price range filters to the search
* [ ] Add Edit and Delete buttons to the listing cards
* [ ] Add a "Mark as sold" feature
* [ ] Add user accounts and authentication, so only the seller can edit or delete a listing
* [ ] Add likes and comments on listings
* [ ] Add image upload for listings
* [ ] Analyze listing data (prices, categories, what sells) with Python