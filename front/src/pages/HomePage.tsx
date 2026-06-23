import { Header } from "../components/Header";
import { Carousel } from "../components/Carousel";
import { Products } from "../components/Products";
import { useSearch } from "../hooks/useSearch";

export function HomePage () {
  const { search, setSearch, debouncedSearch, handleSearchSubmit } = useSearch(300);

  return (
    <div className="home-page">
      <Header 
        search={search}
        setSearch={setSearch}
        handleSearchSubmit={handleSearchSubmit}
      />
      <main className="main-content">
        <Carousel />
        <Products search={debouncedSearch} />
      </main>
    </div>
  )
}