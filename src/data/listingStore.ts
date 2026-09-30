import type { Listing } from "../types/listing.ts";

const listings: Listing[] = [];
let nextId = 1;

const getAll = (): Listing[] => {
  return listings;
};

const getById = (id: number): Listing | undefined => {
  return listings.find((l) => l.id === id);
};

const create = (
  title: string,
  price: number,
  category: Listing["category"],
  description: string,
  address: string
): Listing => {
  const newListing: Listing = {
    id: nextId++,
    title,
    price,
    category,
    description,
    address,
    isSold: false,
    createdAt: new Date(),
  };
  listings.push(newListing);
  return newListing;
};

const remove = (id: number): boolean => {
  const index = listings.findIndex((l) => l.id === id);
  if (index === -1) return false;
  listings.splice(index, 1);
  return true;
};

const seed = () => {
  create(
    "Calculus Textbook (8th Edition)",
    35,
    "books",
    "Barely used, no highlighting. Great for MATH 101.",
    "Rigby Hall, Room 204"
  );
  create(
    "IKEA Desk Lamp",
    12,
    "furniture",
    "Works perfectly, just don't need it anymore. Pickup only.",
    "Moore Hall Apartments"
  );
};

export { getAll, getById, create, remove, seed };