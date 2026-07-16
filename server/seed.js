require("dotenv").config();
const connectDB = require("./config/db"); // Tumhara database connection path
const Product = require("./models/Product"); // Tumhara Product model path

const products = [
  { name: "Premium Teddy Bear", description: "Soft and cuddly teddy bear made from premium plush fabric.", price: 999, offerPrice: 799, category: "Soft Toys", ageGroup: "3-5 Years", images: ["https://picsum.photos/seed/teddy1/600/600"], stock: 25, sku: "ST001", brand: "KidsToys", ratings: 4.8, numReviews: 125, isFeatured: true },
  { name: "Remote Control Sports Car", description: "Fast RC sports car with rechargeable battery.", price: 1799, offerPrice: 1499, category: "Vehicles", ageGroup: "6-8 Years", images: ["https://picsum.photos/seed/car1/600/600"], stock: 18, sku: "VH001", brand: "SpeedX", ratings: 4.7, numReviews: 82, isFeatured: true },
  { name: "Building Blocks Set", description: "Creative building blocks with 150 colorful pieces.", price: 899, offerPrice: 699, category: "Educational", ageGroup: "3-5 Years", images: ["https://picsum.photos/seed/block1/600/600"], stock: 30, sku: "ED001", brand: "BlockFun", ratings: 4.9, numReviews: 210, isFeatured: true },
  { name: "Princess Doll House", description: "Beautiful doll house with furniture set.", price: 2499, offerPrice: 1999, category: "Girls Toys", ageGroup: "6-8 Years", images: ["https://picsum.photos/seed/doll1/600/600"], stock: 15, sku: "GT001", brand: "DreamHouse", ratings: 4.6, numReviews: 74, isFeatured: true },
  { name: "Wooden Puzzle", description: "Educational wooden animal puzzle.", price: 499, offerPrice: 399, category: "Educational", ageGroup: "3-5 Years", images: ["https://picsum.photos/seed/puzzle1/600/600"], stock: 50, sku: "ED002", brand: "BrainPlay", ratings: 4.5, numReviews: 48, isFeatured: false },
  { name: "Kids Cricket Kit", description: "Plastic cricket bat, ball and wickets.", price: 1299, offerPrice: 999, category: "Sports", ageGroup: "9-12 Years", images: ["https://picsum.photos/seed/cricket1/600/600"], stock: 20, sku: "SP001", brand: "Champion", ratings: 4.7, numReviews: 93, isFeatured: true },
  { name: "Police Jeep", description: "Toy police jeep with lights and sounds.", price: 1199, offerPrice: 999, category: "Vehicles", ageGroup: "6-8 Years", images: ["https://picsum.photos/seed/jeep1/600/600"], stock: 22, sku: "VH002", brand: "ToyDrive", ratings: 4.4, numReviews: 39, isFeatured: false },
  { name: "Kitchen Play Set", description: "Complete pretend play kitchen set.", price: 2199, offerPrice: 1799, category: "Pretend Play", ageGroup: "3-5 Years", images: ["https://picsum.photos/seed/kitchen1/600/600"], stock: 12, sku: "PP001", brand: "LittleChef", ratings: 4.8, numReviews: 88, isFeatured: true },
  { name: "Alphabet Learning Board", description: "Interactive alphabet learning toy.", price: 799, offerPrice: 599, category: "Educational", ageGroup: "3-5 Years", images: ["https://picsum.photos/seed/alpha1/600/600"], stock: 35, sku: "ED003", brand: "LearnKids", ratings: 4.9, numReviews: 167, isFeatured: true },
  { name: "Soft Elephant Toy", description: "Cute elephant plush toy for kids.", price: 699, offerPrice: 549, category: "Soft Toys", ageGroup: "0-2 Years", images: ["https://picsum.photos/seed/elephant1/600/600"], stock: 40, sku: "ST002", brand: "KidsToys", ratings: 4.6, numReviews: 54, isFeatured: false },
  { name: "Mini Train Set", description: "Battery operated toy train set.", price: 1899, offerPrice: 1599, category: "Vehicles", ageGroup: "6-8 Years", images: ["https://picsum.photos/seed/train1/600/600"], stock: 16, sku: "VH003", brand: "RailFun", ratings: 4.7, numReviews: 62, isFeatured: true },
  { name: "Robot Warrior", description: "Walking robot with LED lights.", price: 2299, offerPrice: 1899, category: "Robots", ageGroup: "9-12 Years", images: ["https://picsum.photos/seed/robot1/600/600"], stock: 14, sku: "RB001", brand: "RoboKids", ratings: 4.8, numReviews: 112, isFeatured: true },
  { name: "Magic Drawing Board", description: "Reusable drawing board for kids.", price: 599, offerPrice: 449, category: "Educational", ageGroup: "3-5 Years", images: ["https://picsum.photos/seed/draw1/600/600"], stock: 45, sku: "ED004", brand: "SmartKids", ratings: 4.5, numReviews: 41, isFeatured: false },
  { name: "Basketball Hoop Set", description: "Indoor basketball set for children.", price: 1499, offerPrice: 1199, category: "Sports", ageGroup: "6-8 Years", images: ["https://picsum.photos/seed/basket1/600/600"], stock: 17, sku: "SP002", brand: "PlayMax", ratings: 4.4, numReviews: 36, isFeatured: false },
  { name: "Doctor Play Kit", description: "Pretend doctor kit with medical accessories.", price: 999, offerPrice: 799, category: "Pretend Play", ageGroup: "3-5 Years", images: ["https://picsum.photos/seed/doctor1/600/600"], stock: 28, sku: "PP002", brand: "LittleDoctor", ratings: 4.8, numReviews: 71, isFeatured: true },
  { name: "Musical Piano", description: "Mini electronic piano with lights.", price: 1599, offerPrice: 1299, category: "Musical Toys", ageGroup: "3-5 Years", images: ["https://picsum.photos/seed/piano1/600/600"], stock: 19, sku: "MT001", brand: "MusicFun", ratings: 4.7, numReviews: 63, isFeatured: true },
  { name: "Toy Helicopter", description: "Battery powered helicopter toy.", price: 1399, offerPrice: 1099, category: "Vehicles", ageGroup: "9-12 Years", images: ["https://picsum.photos/seed/heli1/600/600"], stock: 13, sku: "VH004", brand: "SkyFly", ratings: 4.5, numReviews: 45, isFeatured: false },
  { name: "Animal Figure Set", description: "12 realistic wild animal figures.", price: 899, offerPrice: 699, category: "Educational", ageGroup: "3-5 Years", images: ["https://picsum.photos/seed/animal1/600/600"], stock: 32, sku: "ED005", brand: "NatureKids", ratings: 4.8, numReviews: 86, isFeatured: false },
  { name: "Mini Football", description: "Soft football for indoor and outdoor play.", price: 699, offerPrice: 549, category: "Sports", ageGroup: "6-8 Years", images: ["https://picsum.photos/seed/football1/600/600"], stock: 34, sku: "SP003", brand: "PlayMax", ratings: 4.6, numReviews: 59, isFeatured: false },
  { name: "Unicorn Plush Toy", description: "Colorful unicorn soft toy.", price: 899, offerPrice: 749, category: "Soft Toys", ageGroup: "0-2 Years", images: ["https://picsum.photos/seed/unicorn1/600/600"], stock: 27, sku: "ST003", brand: "MagicKids", ratings: 4.9, numReviews: 144, isFeatured: true },
];

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany(); // Purana data udaa diya

    const productsWithSlug = products.map((product) => ({
      ...product,
      slug: product.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
    }));

    await Product.insertMany(productsWithSlug);
    console.log("✅ 20 Products Inserted Successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

importData();