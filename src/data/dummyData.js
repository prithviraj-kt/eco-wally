export const dummyUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    greenCoins: 35,
    carbonReduction: 12.5,
    selectedCoupons: [],
    referralCode: 'JOHN123',
    isSeller: false
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    greenCoins: 80,
    carbonReduction: 25.3,
    selectedCoupons: [],
    referralCode: 'JANE456',
    isSeller: true
  }
];

export const dummyProducts = [
  {
    id: 1,
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Clothing',
    ecoRating: 5,
    carbonFootprint: -2.5,
    description: 'Made from 100% organic cotton with sustainable farming practices.',
    greenCoins: 15,
    stock: 50,
    seller: 'EcoFashion Co.'
  },
  {
    id: 2,
    name: 'Bamboo Smartphone Case',
    price: 24.99,
    originalPrice: 29.99,
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Electronics',
    ecoRating: 4,
    carbonFootprint: -1.2,
    description: 'Biodegradable bamboo case for ultimate protection.',
    greenCoins: 12,
    stock: 30,
    seller: 'GreenTech Solutions'
  },
  {
    id: 3,
    name: 'Solar Power Bank',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Electronics',
    ecoRating: 5,
    carbonFootprint: -5.0,
    description: 'Charge your devices with clean solar energy.',
    greenCoins: 25,
    stock: 25,
    seller: 'SolarPower Inc.'
  },
  {
    id: 4,
    name: 'Reusable Water Bottle',
    price: 19.99,
    originalPrice: 24.99,
    image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Home & Garden',
    ecoRating: 4,
    carbonFootprint: -3.0,
    description: 'Stainless steel bottle that keeps drinks cold for 24 hours.',
    greenCoins: 10,
    stock: 100,
    seller: 'HydroLife'
  },
  {
    id: 5,
    name: 'Regular Plastic Bottle',
    price: 2.99,
    originalPrice: 2.99,
    image: 'https://images.pexels.com/photos/3737639/pexels-photo-3737639.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Home & Garden',
    ecoRating: 1,
    carbonFootprint: 2.5,
    description: 'Standard plastic bottle.',
    greenCoins: 1,
    stock: 200,
    seller: 'PlasticCorp'
  },
  {
    id: 6,
    name: 'LED Energy Efficient Bulb',
    price: 12.99,
    originalPrice: 15.99,
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Home & Garden',
    ecoRating: 5,
    carbonFootprint: -8.0,
    description: 'Uses 80% less energy than traditional bulbs.',
    greenCoins: 20,
    stock: 75,
    seller: 'EcoLight'
  },
  {
    id: 7,
    name: 'Organic Skincare Set',
    price: 45.99,
    originalPrice: 59.99,
    image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Beauty',
    ecoRating: 4,
    carbonFootprint: -1.8,
    description: 'Natural ingredients, cruelty-free, biodegradable packaging.',
    greenCoins: 18,
    stock: 40,
    seller: 'Natural Beauty Co.'
  },
  {
    id: 8,
    name: 'Fast Fashion Shirt',
    price: 9.99,
    originalPrice: 9.99,
    image: 'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Clothing',
    ecoRating: 2,
    carbonFootprint: 4.2,
    description: 'Cheap polyester shirt made with fast fashion practices.',
    greenCoins: 2,
    stock: 150,
    seller: 'FastFashion LLC'
  }
];

export const categories = [
  'all',
  'Clothing',
  'Electronics',
  'Home & Garden',
  'Beauty',
  'Books',
  'Sports',
  'Toys'
];

export const coupons = [
  {
    id: 1,
    title: '20% Off Next Purchase',
    description: 'Get 20% discount on your next order',
    discount: 20,
    type: 'percentage'
  },
  {
    id: 2,
    title: 'Free Shipping',
    description: 'Free shipping on any order size',
    discount: 0,
    type: 'shipping'
  },
  {
    id: 3,
    title: '$10 Off $50+',
    description: 'Save $10 on orders over $50',
    discount: 10,
    type: 'fixed'
  }
];

export const leaderboardData = [
  { id: 1, name: 'EcoHero Sarah', carbonReduction: 45.2, rank: 1, location: 'Downtown' },
  { id: 2, name: 'GreenChamp Mike', carbonReduction: 38.7, rank: 2, location: 'Suburbs' },
  { id: 3, name: 'ClimateWarrior Lisa', carbonReduction: 32.1, rank: 3, location: 'Midtown' },
  { id: 4, name: 'EcoFriend Tom', carbonReduction: 28.5, rank: 4, location: 'Downtown' },
  { id: 5, name: 'GreenLifestyle Anna', carbonReduction: 24.8, rank: 5, location: 'Uptown' },
  { id: 6, name: 'SustainableSam', carbonReduction: 22.3, rank: 6, location: 'Suburbs' },
  { id: 7, name: 'EcoMinded Kate', carbonReduction: 19.7, rank: 7, location: 'Downtown' },
  { id: 8, name: 'CarbonCutter Jim', carbonReduction: 17.2, rank: 8, location: 'Midtown' },
  { id: 9, name: 'GreenGuru Max', carbonReduction: 15.8, rank: 9, location: 'Uptown' },
  { id: 10, name: 'EcoAdvocate Emma', carbonReduction: 13.4, rank: 10, location: 'Suburbs' }
];