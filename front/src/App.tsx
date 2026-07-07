import './App.css';
// import { NotFound } from './components/NotFound/NotFound';
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductPageDetail } from './pages/ProductPageDetail';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/products' element={<ProductsPage />} />
      <Route path='/products/:id' element={<ProductPageDetail />} />
      {/* <Route path='*' element={<NotFound />} /> */}
    </Routes>
  )
}

export default App
