import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  return (
    <div className="App">
      <h1>Shopping Cart Demo</h1>
      <ProductList />
      <Cart />
    </div>
  );
}

export default App;
