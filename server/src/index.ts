import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

const PORT = 8080;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Get products
app.get("/products", async (req, res) => {
  const products = prisma.product.findMany();
  res.json(products);
});

// Add a product
app.post("/add-product", async (req, res) => {
  const { name, description, status, price, tags, ownerId } = req.body;
  const result = await prisma.product.create({
    data: { name, description, status, price, tags, ownerId },
  });
  res.json(result);
});

// Update a product
app.put("/update-product/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, status, price, tags } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: id },
      data: { name, description, status, price, tags },
    });

    res.json(product);
  } catch (error) {
    res.json({
      error: `Post with ID ${id} does not exist in the database`,
    });
  }
});

// Delete a product
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const product = prisma.product.delete({
    where: { id: id },
  });
  res.json(product);
});

// Search products by name or tag
app.get("/search-product", async (req, res) => {
  const { query } = req.query;

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query as string,
              mode: "insensitive", // Case insensitive search
            },
          },
          {
            tags: {
              contains: query as string,
              mode: "insensitive", // Case insensitive search
            },
          },
        ],
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to search products." });
  }
});

// Define a route handler for the root endpoint
app.get("/", (req, res) => {
  res.send("Hello World! This is your basic Node.js API endpoint.");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
