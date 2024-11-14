const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const fs = require("fs");
const { register, login } = require("../controllers/authController");
const productController = require("../controllers/productController");

// Import dữ liệu từ data.json vào MongoDB
router.post("/import", async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("data.json", "utf8"));
    await Product.insertMany(data);
    res.status(200).send("Data imported successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Lấy tất cả sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.post("/login", login);
router.post("/register", register);
module.exports = router;
