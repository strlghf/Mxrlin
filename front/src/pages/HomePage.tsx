import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Products } from "../components/Products";
import { Footer } from "../components/Footer";
import { useSearch } from "../hooks/useSearch";

export function HomePage () {
  const { search, setSearch, handleSearchSubmit } = useSearch();

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
          <h2 className="best-seller">Te recomendamos</h2>
          <div className="products-grid">
            <Products search="" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}