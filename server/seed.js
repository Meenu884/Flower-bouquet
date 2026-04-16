require('dotenv').config();
const mongoose = require('mongoose');
const Bouquet = require('./models/Bouquet');

const sampleBouquets = [
  {
    name: "Rose Romance",
    desc: "12 red roses with baby's breath.",
    price: 1499,
    imageUrl: "images/images1.jpg",
    category: "romance"
  },
  {
    name: "Sunshine Mix",
    desc: "Bright sunflowers and yellow daisies.",
    price: 1299,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSqA0RaRCMBi1MyzVGp9MPPreN6y5DSyHJ_47uyGJL5Q&s",
    category: "cheerful"
  },
  {
    name: "Purple Dream",
    desc: "Lavender and lilac bouquet.",
    price: 1599,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSqA0RaRCMBi1MyzVGp9MPPreN6y5DSyHJ_47uyGJL5Q&s",
    category: "elegant"
  },
  {
    name: "White Elegance",
    desc: "White lilies and roses.",
    price: 1799,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOp-lHBom86YyolErN0U1n3VoCtaJ7OLbI1mGQ9eTPug&s",
    category: "elegant"
  },
  {
    name: "Birthday Blast",
    desc: "Colorful mixed flowers with confetti.",
    price: 1399,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjQeu148tSPhb4H_wgJTNw8N9UAr72MNzfUMlBnTL8Ug&s",
    category: "birthday"
  },
  {
    name: "Thank You Bouquet",
    desc: "Soft pinks and whites.",
    price: 1199,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Z04fY8Z5gBcB4ViN06NcBwLBbUwagadzCav3jzIykg&s",
    category: "gratitude"
  },
  {
    name: "Anniversary Special",
    desc: "Red and white roses with premium ribbon.",
    price: 2199,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOp-lHBom86YyolErN0U1n3VoCtaJ7OLbI1mGQ9eTPug&s",
    category: "romance"
  },
  {
    name: "Get Well Soon",
    desc: "Cheerful mixed blooms to brighten the day.",
    price: 1349,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1rOH3U1DYeKcmhlqb3Th3_GzKSEKtFydqWugQSyctmw&s",
    category: "cheerful"
  },

];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Bouquet.deleteMany({});
  await Bouquet.insertMany(sampleBouquets);
  console.log('Bouquets seeded successfully.');
  await mongoose.disconnect();
}

seed().catch(console.error);