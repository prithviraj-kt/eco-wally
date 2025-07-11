import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Upload, Leaf, Calculator, Zap } from 'lucide-react';
import main from "./Model"
function ProductUpload() {
  const { dispatch, addGreenCoins, user } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: 'Electronics',
    description: '',
    stock: '',
    image: ''
  });
  
  const [aiGenerated, setAiGenerated] = useState({
    ecoRating: 0,
    carbonFootprint: 0,
    greenCoins: 0
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateEcoData = async () => {
    setIsGenerating(true);
    const result = JSON.parse(await main(JSON.stringify({name: formData['name'], category: formData['category'], description: formData['description']})))
    console.log(result)
    
    // Simulate AI processing
    // setTimeout(() => {
      
      let ecoRating = result['eco_rating'];
      let carbonFootprint = result['generated_co2'] - result['average_co2'];
      var greenCoins = 0
      if (ecoRating >2) {
      greenCoins = Math.max(1, ecoRating * 5);
      } else {
        greenCoins = 0; // Set eco rating to 0 for low-rated products
      }
      
      setAiGenerated({
        ecoRating,
        carbonFootprint: Number(carbonFootprint.toFixed(1)),
        greenCoins
      });
      
      setIsGenerating(false);
    // }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProduct = {
      id: Date.now(),
      ...formData,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice) || Number(formData.price),
      stock: Number(formData.stock),
      ...aiGenerated,
      seller: user?.name || 'Unknown Seller',
      image: formData.image || 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400'
    };
    
    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    
    // Award green coins to seller for eco-friendly products
    if (aiGenerated.ecoRating >= 3) {
      addGreenCoins(10, 'uploading eco-friendly product');
    }
    
    // Reset form
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      category: 'Electronics',
      description: '',
      stock: '',
      image: ''
    });
    
    setAiGenerated({
      ecoRating: 0,
      carbonFootprint: 0,
      greenCoins: 0
    });
  };

  const sampleImages = [
    'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=400'
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Upload className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Product Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Organic Cotton T-Shirt"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Beauty">Beauty</option>
                <option value="Books">Books</option>
                <option value="Sports">Sports</option>
                <option value="Toys">Toys</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price (if discounted)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 50"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your product, its features, and sustainability benefits..."
            />
          </div>

          {/* Sample Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image (Select Sample)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {sampleImages.map((img, index) => (
                <label key={index} className="cursor-pointer">
                  <input
                    type="radio"
                    name="image"
                    value={img}
                    checked={formData.image === img}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <img
                    src={img}
                    alt={`Sample ${index + 1}`}
                    className={`w-full h-16 object-cover rounded border-2 ${
                      formData.image === img ? 'border-blue-500' : 'border-gray-300'
                    }`}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* AI Generation */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span>AI Eco Analysis</span>
              </h3>
              
              <button
                type="button"
                onClick={generateEcoData}
                disabled={isGenerating || !formData.name}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Calculator className="h-4 w-4" />
                <span>{isGenerating ? 'Analyzing...' : 'Generate'}</span>
              </button>
            </div>

            {isGenerating && (
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <span className="text-blue-800">AI is analyzing your product's environmental impact...</span>
                </div>
              </div>
            )}

            {aiGenerated.ecoRating  && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Eco Rating</span>
                  </div>
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Leaf
                        key={i}
                        className={`h-4 w-4 ${
                          i < aiGenerated.ecoRating ? 'text-green-500' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calculator className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Carbon Impact</span>
                  </div>
                  <span className={`font-semibold ${
                    aiGenerated.carbonFootprint < 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {aiGenerated.carbonFootprint < 0 ? 'Saves' : 'Adds'} {Math.abs(aiGenerated.carbonFootprint)} kg CO₂
                  </span>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Green Coins</span>
                  </div>
                  <span className="font-semibold text-yellow-600">
                    +{aiGenerated.greenCoins} per sale
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!formData.name || !formData.price || aiGenerated.ecoRating === 0}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Upload className="h-5 w-5" />
              <span>Add Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductUpload;