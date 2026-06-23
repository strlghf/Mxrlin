import './App.css'
import { Header, Products } from './components';
import { Carousel } from './components/Carousel';
import { Hero } from './components/Hero';
import { useSearch } from './hooks/useSearch';

function App() {
  const { search, setSearch, debouncedSearch, handleSearchSubmit } = useSearch(300);
  
  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        handleSearchSubmit={handleSearchSubmit}
      />
      <main className='main-content'>
        <Carousel />
        <Products search={debouncedSearch} />
      </main>
      <Hero />
    </>
  )
}

export default App
