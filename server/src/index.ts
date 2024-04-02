import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const PORT = 8080;
const app = express();
const prisma = new PrismaClient();

app.use(cors());

app.use(express.json());

// Get products
app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany({ include: { tags: true } });
  res.json(products);
});

// Add a product
app.post("/add-product", async (req, res) => {
  const { name, description, status, price, tags } = req.body;

  const result = await prisma.product.create({
    data: {
      name,
      description,
      status,
      price,
      tags: {
        connectOrCreate: tags?.map((tag: string) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
    include: { tags: true },
  });
  res.json(result);
});

// Update a product
app.put("/update-product/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, status, price, tags } = req.body;
  try {
    const previousProduct = await prisma.product.findFirst({
      where: { id: id },
      include: { tags: true },
    });

    const productTagsToDelete = previousProduct?.tags?.reduce<string[]>(
      (acc, { name }) => {
        if (!tags.find((tag: string) => tag === name)) {
          acc.push(name);
        }
        return acc;
      },
      []
    );

    const product = await prisma.product.update({
      where: { id: id },
      data: {
        name,
        description,
        status,
        price,
        tags: {
          deleteMany: productTagsToDelete?.map((tag) => ({ name: tag })),
          upsert: tags?.map((tag: string) => ({
            where: { name: tag },
            create: {
              name: tag,
            },
            update: {},
          })),
        },
      },
      include: { tags: true },
    });

    res.json(product);
  } catch (error) {
    res.json({
      error: `product with ID ${id} does not exist in the database`,
    });
  }
});

// Delete a product
app.delete("/delete-product/:id", async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.delete({
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
              some: {
                name: {
                  contains: query as string,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
      include: {
        tags: true,
        // tags: {
        //   where: {
        //     name: {
        //       contains: query as string,
        //     },
        //   },
        // },
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

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
