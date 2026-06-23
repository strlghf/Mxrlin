import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Products } from "../components/Products";
import { Footer } from "../components/Footer";
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
        <Hero />
        
        <section className="products-section">
          <h2 className="best-seller">Best Sellers</h2>
          <div className="products-grid">
            <Products search={debouncedSearch} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}