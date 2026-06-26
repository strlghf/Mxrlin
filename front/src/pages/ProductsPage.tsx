import { Header } from "../components/Header";
import { Products } from "../components/Products";
import { Footer } from "../components/Footer";
import { useSearch } from "../hooks/useSearch";
import { useCustomParams } from "../hooks/useCustomParams";

export function ProductsPage () {
  const { searchQuery } = useCustomParams();
  const { search, setSearch, handleSearchSubmit } = useSearch(searchQuery);

  return (
    <div className="products-page">
      <Header
        search={search}
        setSearch={setSearch}
        handleSearchSubmit={handleSearchSubmit}
      />
      <main className="main-content">
        <section className="products-section">
          <h2 className="hardware-catalog">
            Resultados de la búsqueda
          </h2>
          <Products search={searchQuery} />
        </section>
      </main>
      <Footer />
    </div>
  )
}