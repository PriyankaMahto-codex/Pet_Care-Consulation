import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter ,Routes,Route} from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategories from './Pages/ShopCategories';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import dog_banner from './Components/Assests/dogbanner1.png';
import rabbit_banner from './Components/Assests/rabbit_banner.jpg';
import cat_food from './Components/Assests/cat_food.avif';
import Product from './Pages/Product';
import NewCollections from './Components/NewCollections/NewCollections';

function App() {
  return (
    <div >
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/Cat' element={<ShopCategories banner={cat_food} category="Cat"/>}/>
        <Route path='/Dog' element={<ShopCategories banner={dog_banner} category="Dog"/>}/>
        <Route path='/Rabbit' element={<ShopCategories banner={rabbit_banner} category="Rabbit"/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path="/latest-products" component={NewCollections} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
