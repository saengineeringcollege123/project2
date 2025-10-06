import { Router } from "express";
import { offers, products, reviews, shops } from "./data";
import { nanoid } from "nanoid";

const router = Router();

// Shops
router.get("/shops", (_req, res) => {
  res.json(shops);
});

router.get("/shops/:id", (req, res) => {
  const shop = shops.find((s) => s.id === req.params.id);
  if (!shop) return res.status(404).json({ message: "Shop not found" });
  res.json(shop);
});

router.post("/shops", (req, res) => {
  const { name, address, phone, category, description } = req.body ?? {};
  if (!name || !address || !phone || !category || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const newShop = {
    id: nanoid(8),
    name,
    address,
    phone,
    category,
    description,
    rating: 0,
    verified: false,
    image: "https://placehold.co/600x400",
    coordinates: { lat: 0, lng: 0 },
  } as const;
  shops.push(newShop as any);
  res.status(201).json(newShop);
});

// Products
router.get("/shops/:id/products", (req, res) => {
  const list = products.filter((p) => p.shopId === req.params.id);
  res.json(list);
});

// Reviews
router.get("/shops/:id/reviews", (req, res) => {
  const list = reviews.filter((r) => r.shopId === req.params.id);
  res.json(list);
});

router.post("/shops/:id/reviews", (req, res) => {
  const { customerName, rating, comment } = req.body ?? {};
  if (!customerName || !rating || !comment) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const review = {
    id: nanoid(8),
    shopId: req.params.id,
    customerName,
    rating: Number(rating),
    comment,
    date: new Date().toISOString().slice(0, 10),
  };
  reviews.push(review);
  res.status(201).json(review);
});

// Offers
router.get("/offers", (_req, res) => {
  res.json(offers);
});

router.get("/shops/:id/offers", (req, res) => {
  const list = offers.filter((o) => o.shopId === req.params.id);
  res.json(list);
});

export default router;
