import './App.css'
import { Header, Hero } from './components';
import { Carousel } from './components/Carousel';
import { Products } from './components/Products';
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
