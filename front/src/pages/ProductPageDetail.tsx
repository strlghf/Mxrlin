import { useSearch } from "../hooks/useSearch"
import { useCustomParams } from "../hooks/useCustomParams";
import { Header } from "../components/Header";
import { ProductDetails } from "../components/ProductDetails";
import { Footer } from "../components/Footer";

export function ProductPageDetail () {
  const { searchQuery } = useCustomParams();
  const { search, setSearch, handleSearchSubmit } = useSearch(searchQuery);

  return (
    <div className="product-detail-page">
      <Header
        search={search}
        setSearch={setSearch}
        handleSearchSubmit={handleSearchSubmit}
      />
      <ProductDetails />
      <Footer />
    </div>
  )
}