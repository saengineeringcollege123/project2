import type { Shop, Product, Review, Offer } from "../types";
import { DEFAULT_IMAGE_URL } from "../config/constants";

const BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:5174/api";

type ApiShop = {
  id: number;
  name: string;
  address: string;
  phone: string;
  category: string;
  rating: number;
  verified: boolean;
  image: string;
  description: string;
  lat: number;
  lng: number;
};

type ApiProduct = {
  id: number;
  shop: number;
  name: string;
  price: string;
  image: string;
  description: string;
};

type ApiReview = {
  id: number;
  shop: number;
  customer_name: string;
  rating: number;
  comment: string;
  date: string;
};

type ApiOffer = {
  id: number;
  shop: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  discount: string;
  image: string;
};

function mapShop(api: ApiShop): Shop {
  return {
    id: String(api.id),
    name: api.name,
    address: api.address,
    phone: api.phone,
    category: api.category,
    rating: api.rating,
    verified: api.verified,
    image: api.image,
    description: api.description,
    coordinates: { lat: api.lat, lng: api.lng },
  };
}

function mapProduct(api: ApiProduct): Product {
  return {
    id: String(api.id),
    shopId: String(api.shop),
    name: api.name,
    price: parseFloat(api.price),
    image: api.image,
    description: api.description,
  };
}

function mapReview(api: ApiReview): Review {
  return {
    id: String(api.id),
    shopId: String(api.shop),
    customerName: api.customer_name,
    rating: api.rating,
    comment: api.comment,
    date: api.date,
  };
}

function mapOffer(api: ApiOffer, shopName?: string): Offer {
  return {
    id: String(api.id),
    shopId: String(api.shop),
    title: api.title,
    description: api.description,
    startDate: api.start_date,
    endDate: api.end_date,
    discount: api.discount,
    image: api.image,
    shopName: shopName || "",
  };
}

let authToken: string | null = null;
export function setAuthToken(token: string | null) {
  authToken = token;
}

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Token ${authToken}` } : {}),
    },
    ...init,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getShops(): Promise<Shop[]> {
  const data = await http<ApiShop[]>("/shops/");
  return data.map(mapShop);
}

export async function getShop(id: string): Promise<Shop> {
  const data = await http<ApiShop>(`/shops/${id}/`);
  return mapShop(data);
}

export async function createShop(
  payload: Omit<Shop, "id" | "rating" | "verified" | "coordinates"> & {
    coordinates?: { lat?: number; lng?: number };
    image?: string;
  }
): Promise<Shop> {
  const body = JSON.stringify({
    name: payload.name,
    address: payload.address,
    phone: payload.phone,
    category: payload.category,
    description: payload.description,
    image: payload.image || DEFAULT_IMAGE_URL,
  });
  const data = await http<ApiShop>("/shops/", { method: "POST", body });
  return mapShop(data);
}

export async function createProduct(
  shopId: string,
  payload: { name: string; price: number; description?: string; image?: string }
): Promise<Product> {
  const body = JSON.stringify({
    shop: Number(shopId),
    name: payload.name,
    price: payload.price,
    description: payload.description || "",
    image: payload.image || "",
  });
  const data = await http<ApiProduct>("/products/", { method: "POST", body });
  return mapProduct(data);
}

export async function getProducts(shopId: string): Promise<Product[]> {
  const data = await http<ApiProduct[]>(`/products/?shop=${shopId}`);
  return data.map(mapProduct);
}

export async function getReviews(shopId: string): Promise<Review[]> {
  const data = await http<ApiReview[]>(`/reviews/?shop=${shopId}`);
  return data.map(mapReview);
}

export async function addReview(
  shopId: string,
  payload: { customerName: string; rating: number; comment: string }
): Promise<Review> {
  const body = JSON.stringify({
    shop: Number(shopId),
    customer_name: payload.customerName,
    rating: payload.rating,
    comment: payload.comment,
  });
  const data = await http<ApiReview>("/reviews/", { method: "POST", body });
  return mapReview(data);
}

export async function getOffers(): Promise<Offer[]> {
  const data = await http<ApiOffer[]>("/offers/");
  return data.map((o) => mapOffer(o));
}

export async function getOffersByShop(shopId: string): Promise<Offer[]> {
  const data = await http<ApiOffer[]>(`/offers/?shop=${shopId}`);
  return data.map((o) => mapOffer(o));
}

export async function createOffer(payload: {
  shopId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  discount: string;
  image?: string;
}): Promise<Offer> {
  const body = JSON.stringify({
    shop: Number(payload.shopId),
    title: payload.title,
    description: payload.description,
    start_date: payload.startDate,
    end_date: payload.endDate,
    discount: payload.discount,
    image: payload.image || DEFAULT_IMAGE_URL,
  });
  const data = await http<ApiOffer>("/offers/", { method: "POST", body });
  return mapOffer(data);
}

export async function deleteShop(id: string): Promise<void> {
  await http<void>(`/shops/${id}/`, { method: "DELETE" });
}

export async function deleteOffer(id: string): Promise<void> {
  await http<void>(`/offers/${id}/`, { method: "DELETE" });
}
