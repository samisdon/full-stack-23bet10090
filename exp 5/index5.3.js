async function insertSampleProducts() {
  await Product.deleteMany({}); // Clean collection before inserting

  const products = [
    {
      name: "T-Shirt",
      price: 499,
      category: "Clothing",
      variants: [
        { color: "Red", size: "M", stock: 10 },
        { color: "Blue", size: "L", stock: 5 }
      ]
    },
    {
      name: "Sneakers",
      price: 2999,
      category: "Footwear",
      variants: [
        { color: "White", size: "8", stock: 20 },
        { color: "Black", size: "9", stock: 15 }
      ]
    },
    {
      name: "Laptop",
      price: 55000,
      category: "Electronics",
      variants: [
        { color: "Gray", size: "15 inch", stock: 7 },
        { color: "Silver", size: "13 inch", stock: 4 }
      ]
    }
  ];

  await Product.insertMany(products);
  console.log("Sample products inserted!");
}

insertSampleProducts();
