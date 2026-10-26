import type {
  Listing,
  Category,
  ListingDoc,
  Details,
} from "../types/listing.ts";
import { ObjectId, type WithId } from "mongodb";
import mongodb from "../config/db.js";

type ListingInput = Pick<
  ListingDoc,
  "title" | "price" | "category" | "description" | "address" | "details"
>;

const toListing = (doc: WithId<ListingDoc>): Listing => {
  const { _id, ...rest } = doc;
  return { id: _id.toHexString(), ...rest };
};

class ListingStore {
  private collection() {
    return mongodb.getDb().collection<ListingDoc>("listings");
  }

  async getAll(): Promise<Listing[]> {
    const docs = await this.collection().find().toArray();
    return docs.map(toListing);
  }

  async getById(id: string): Promise<Listing | null> {
    if (!ObjectId.isValid(id)) return null;
    const doc = await this.collection().findOne({ _id: new ObjectId(id) });
    return doc ? toListing(doc) : null;
  }

  async create(
    title: string,
    price: number,
    category: Category,
    description: string,
    address: string,
    details: Details = {},
  ): Promise<Listing> {
    const doc: ListingDoc = {
      title,
      price,
      category,
      description,
      address,
      details,
      isSold: false,
      createdAt: new Date(),
    };

    const result = await this.collection().insertOne(doc);
    return { id: result.insertedId.toHexString(), ...doc };
  }

  async remove(id: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) return false;
    const result = await this.collection().deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }

  async update(id: string, data: ListingInput): Promise<Listing | null> {
    if (!ObjectId.isValid(id)) return null;
    const result = await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: data },
    );
    if (result.matchedCount === 0) return null;
    return this.getById(id);
  }

  async seed(): Promise<void> {
    const count = await this.collection().countDocuments();
    if (count > 0) return;
    // Books
    await this.create(
      "Calculus Textbook (8th Edition)",
      35,
      "books",
      "Barely used, no highlighting. Great for MATH 101.",
      "Rigby Hall, Room 204",
    );
    await this.create(
      "Intro to Psychology Textbook",
      28,
      "books",
      "Some highlighting in the first three chapters. Includes the study guide.",
      "Hart Building Lobby",
    );
    await this.create(
      "Organic Chemistry Model Kit",
      15,
      "books",
      "Complete molecular model set with the instruction booklet. Used for one semester.",
      "Romney Building, Room 118",
    );

    // Furniture
    await this.create(
      "IKEA Desk Lamp",
      12,
      "furniture",
      "Works perfectly, just don't need it anymore. Pickup only.",
      "Moore Hall Apartments",
    );
    await this.create(
      "Small Study Desk",
      60,
      "furniture",
      "Sturdy desk, 40 inches wide. A few scratches on the surface but very stable.",
      "Campus View Apartments, Unit 12",
    );
    await this.create(
      "Bean Bag Chair",
      25,
      "furniture",
      "Large grey bean bag. Cover is washable. Very comfy for reading.",
      "Hyde Hall, Front Desk",
    );

    // Electronics
    await this.create(
      "Wireless Mouse",
      10,
      "electronics",
      "Works great, needs one AA battery. Selling because I got a new one.",
      "Taylor Library, Main Entrance",
    );
    await this.create(
      "27-inch Monitor",
      120,
      "electronics",
      "1080p, HDMI cable included. No dead pixels. Perfect for a dorm desk.",
      "Maple Hall, Room 305",
    );
    await this.create(
      "Used Laptop (2019 MacBook Air)",
      350,
      "electronics",
      "Runs well, battery holds about 5 hours. Comes with charger. Reset and ready to go.",
      "Student Center, Second Floor",
    );

    // Other
    await this.create(
      "Mini Fridge",
      45,
      "other",
      "Works perfectly, fits under a desk. Must be picked up before the end of the month.",
      "Sunset Heights Apartments",
    );
    await this.create(
      "Winter Jacket (Size M)",
      30,
      "other",
      "Warm and waterproof. Worn one winter. Dark blue.",
      "Student Center, Front Desk",
    );
    await this.create(
      "Bike Lock",
      5,
      "other",
      "U-lock with two keys. Still works well.",
      "Bike Racks by the Library",
    );
  }
}

export const listingStore = new ListingStore();
