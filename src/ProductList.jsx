import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const plants = [
  {
    category: 'Air Purifying Plants',
    items: [
      { name: 'Snake Plant', cost: '$15', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg' },
      { name: 'Spider Plant', cost: '$12', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg' },
      { name: 'Peace Lily', cost: '$18', image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg' },
      { name: 'Boston Fern', cost: '$14', image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg' },
      { name: 'Rubber Plant', cost: '$20', image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg' },
      { name: 'Aloe Vera', cost: '$16', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg' }
    ]
  },
  {
    category: 'Aromatic Fragrant Plants',
    items: [
      { name: 'Lavender', cost: '$13', image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop' },
      { name: 'Jasmine', cost: '$17', image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop' },
      { name: 'Rosemary', cost: '$11', image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg' },
      { name: 'Mint', cost: '$10', image: 'https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg' },
      { name: 'Lemon Balm', cost: '$12', image: 'https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg' },
      { name: 'Hyacinth', cost: '$15', image: 'https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg' }
    ]
  },
  {
    category: 'Low Maintenance Plants',
    items: [
      { name: 'ZZ Plant', cost: '$19', image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop' },
      { name: 'Pothos', cost: '$14', image: 'https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg' },
      { name: 'Cast Iron Plant', cost: '$21', image: 'https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg' },
      { name: 'Succulent', cost: '$9', image: 'https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg' },
      { name: 'Aglaonema', cost: '$18', image: 'https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg' },
      { name: 'Lucky Bamboo', cost: '$13', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg' }
    ]
  }
];

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isInCart = (plantName) => {
    return cartItems.some((item) => item.name === plantName);
  };

  const handlePlantsClick = () => {
    setShowCart(false);
  };

  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="tag_home_link">
          <a href="#home" onClick={onHomeClick}>
            <h3>Paradise Nursery</h3>
          </a>
        </div>

        <div className="ul">
          <div>
            <a href="#home" onClick={onHomeClick}>Home</a>
          </div>

          <div>
            <a href="#plants" onClick={handlePlantsClick}>Plants</a>
          </div>

          <div>
            <a href="#cart" onClick={handleCartClick}>
              🛒 Cart ({totalItems})
            </a>
          </div>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid" id="plants">
          {plants.map((category) => (
            <div key={category.category}>
              <div className="plantname_heading">
                <h2 className="plant_heading">
                  {category.category}
                </h2>
              </div>

              <div className="product-list">
                {category.items.map((plant) => {
                  const added = isInCart(plant.name);

                  return (
                    <div className="product-card" key={plant.name}>
                      <img
                        className="product-image"
                        src={plant.image}
                        alt={plant.name}
                      />

                      <h3 className="product-title">
                        {plant.name}
                      </h3>

                      <p className="product-price">
                        {plant.cost}
                      </p>

                      <button
                        className={`product-button ${
                          added ? 'added-to-cart' : ''
                        }`}
                        disabled={added}
                        onClick={() => handleAddToCart(plant)}
                      >
                        {added ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
