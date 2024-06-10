import { Document, Schema, model } from "mongoose";

export type productImage = { url: string, id: string };

export interface ProductDocument extends Document {
    owner: Schema.Types.ObjectId;
    name: string;
    price: number;
    purchasingDate: Date;
    category: string;
    images: productImage[];
    thumbnail: string;
    description: string;
}

export interface Owner {
    _id: string;
    email: string;
    name: string;
    avatar?: { url: string, id: string }
}

export interface Product {
    _id: string;
    owner: Owner;
    name: string;
    price: number;
    purchasingDate: Date;
    category: string;
    images: productImage[];
    thumbnail: string;
    description: string;
}

export type ProductListings = {
    products: Product[]
}
