import './App.css'
import { Header, Hero } from './components';
import { Carousel } from './components/Car';
import { Products } from './components/Products';
import { useSearch } from './hooks/useSearch';

function App() {
  const { search, setSearch } = useSearch();
  
  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <main className='main-content'>
        <Carousel />
        <Products search={search} />
      </main>
      <Hero />
    </>
  )
}

export default App
