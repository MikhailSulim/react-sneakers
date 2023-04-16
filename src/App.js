import "./App.css";
import Header from "./components/Header";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import React from "react";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch("https://643a71f5bd3623f1b9b37efb.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setItems(res);
      });
  }, []); 

  const onAddToCart = (obj) => {
    setCartItems([...cartItems, obj]);
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}

      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((item) => (
            <Card
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onPlus={(obj) => onAddToCart(obj)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
