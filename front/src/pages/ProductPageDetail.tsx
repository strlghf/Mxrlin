import { Footer } from "../components/Footer";
import { Header } from "../components/Header"
import { ProductDetails } from "../components/ProductDetails/ProductDetails";
import { useCustomParams } from "../hooks/useCustomParams";
import { useSearch } from "../hooks/useSearch"

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
      <ProductDetails product={} />
      <Footer />
    </div>
  )
}