import './App.css';
import { NotFound } from './components/NotFound/NotFound';
import { HomePage } from './pages/HomePage';
import { Routes, Route } from 'react-router';
import { ProductsPage } from './pages/ProductsPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/api/products' element={<ProductsPage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
