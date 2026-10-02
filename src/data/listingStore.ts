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
    this.create(
      "Calculus Textbook (8th Edition)",
      35,
      "books",
      "Barely used, no highlighting. Great for MATH 101.",
      "Rigby Hall, Room 204",
    );
    this.create(
      "IKEA Desk Lamp",
      12,
      "furniture",
      "Works perfectly, just don't need it anymore. Pickup only.",
      "Moore Hall Apartments",
    );
  }
}

export const listingStore = new ListingStore();
