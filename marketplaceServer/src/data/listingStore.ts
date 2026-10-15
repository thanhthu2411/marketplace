import type { Listing } from "../types/listing.ts";

class ListingStore {
  private listings: Listing[] = [];
  private nextId = 1;

  getAll(): Listing[] {
    return this.listings;
  }

  getById(id: Number): Listing | undefined {
    const listing = this.listings.find((l) => l.id === id);
    return listing;
  }

  create(
    title: string,
    price: number,
    category: Listing["category"],
    description: string,
    address: string,
  ): Listing {
    const newListing = {
      id: this.nextId++,
      title,
      price,
      category,
      description,
      address,
      isSold: false,
      createdAt: new Date(),
    };
    this.listings.push(newListing);
    return newListing;
  }

  remove(id: number): boolean {
    const index = this.listings.findIndex((l) => l.id === id);
    if (index === -1) return false;
    this.listings.splice(index, 1);
    return true;
  }

  seed(): void {
  // Books
  this.create(
    "Calculus Textbook (8th Edition)",
    35,
    "books",
    "Barely used, no highlighting. Great for MATH 101.",
    "Rigby Hall, Room 204",
  );
  this.create(
    "Intro to Psychology Textbook",
    28,
    "books",
    "Some highlighting in the first three chapters. Includes the study guide.",
    "Hart Building Lobby",
  );
  this.create(
    "Organic Chemistry Model Kit",
    15,
    "books",
    "Complete molecular model set with the instruction booklet. Used for one semester.",
    "Romney Building, Room 118",
  );

  // Furniture
  this.create(
    "IKEA Desk Lamp",
    12,
    "furniture",
    "Works perfectly, just don't need it anymore. Pickup only.",
    "Moore Hall Apartments",
  );
  this.create(
    "Small Study Desk",
    60,
    "furniture",
    "Sturdy desk, 40 inches wide. A few scratches on the surface but very stable.",
    "Campus View Apartments, Unit 12",
  );
  this.create(
    "Bean Bag Chair",
    25,
    "furniture",
    "Large grey bean bag. Cover is washable. Very comfy for reading.",
    "Hyde Hall, Front Desk",
  );

  // Electronics
  this.create(
    "Wireless Mouse",
    10,
    "electronics",
    "Works great, needs one AA battery. Selling because I got a new one.",
    "Taylor Library, Main Entrance",
  );
  this.create(
    "27-inch Monitor",
    120,
    "electronics",
    "1080p, HDMI cable included. No dead pixels. Perfect for a dorm desk.",
    "Maple Hall, Room 305",
  );
  this.create(
    "Used Laptop (2019 MacBook Air)",
    350,
    "electronics",
    "Runs well, battery holds about 5 hours. Comes with charger. Reset and ready to go.",
    "Student Center, Second Floor",
  );

  // Other
  this.create(
    "Mini Fridge",
    45,
    "other",
    "Works perfectly, fits under a desk. Must be picked up before the end of the month.",
    "Sunset Heights Apartments",
  );
  this.create(
    "Winter Jacket (Size M)",
    30,
    "other",
    "Warm and waterproof. Worn one winter. Dark blue.",
    "Student Center, Front Desk",
  );
  this.create(
    "Bike Lock",
    5,
    "other",
    "U-lock with two keys. Still works well.",
    "Bike Racks by the Library",
  );
}
}

export const listingStore = new ListingStore();
