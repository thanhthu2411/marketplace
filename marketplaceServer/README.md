# Campus Marketplace

This is a web app for students to buy and sell things with each other.

## Instructions for Build and Use

Steps to build and/or run the software:

1. Clone or download this repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the server (this also watches and rebuilds the client-side TypeScript)
4. Open `http://localhost:3000/listings` in your browser

Instructions for using the software:

1. Click "+ Add New Listing" to open the form and post an item for sale
2. Fill in the title, description, price, category, and address, then submit
3. Click a listing's title to view its full details
4. Click "Delete" on a listing (from the list or detail page) to remove it

## Development Environment

To recreate the development environment, you need the following software and/or libraries with the specified versions:

* Node.js (v18 or higher)
* TypeScript
* Express.js
* EJS (templating engine)
* tsx (runs TypeScript directly during development)
* concurrently (runs the server and client build at the same time)

## Useful Websites to Learn More

I found these websites useful in developing this software:

* [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
* [Express.js Documentation](https://expressjs.com/)
* [EJS Documentation](https://ejs.co/)

## Future Work

The following items I plan to fix, improve, and/or add to this project in the future:

* [ ] Use React to avoid full page reload
* [ ] Integrate a database (MongoDB) to keep data persistent
* [ ] Add user accounts and authentication
* [ ] Add likes and comments on listings
* [ ] Add image upload for listings