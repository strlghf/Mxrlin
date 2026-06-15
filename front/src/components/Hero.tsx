import "./Hero.css";
import logoImg from "../img/geforce.jpeg";

export function Hero () {
  return (
    <main className="main-content">
      <section className="hero-section">
        <div className="hero-overlay-graphic"></div>
        <div className="hero-info">
          <span className="hero-tag">Nueva Generación</span>
          <h1 className="hero-title">Los mejores</h1>
          <p className="hero-description">
            Descubre el verdadero rendimiento gráfico y la potencia de procesamiento que tu setup necesita.
          </p>
          <div className="hero-actions-btn">
            <a href="#shop" className="btn-primary">Explorar Tienda</a>
            <a href="#clases" className="btn-secondary">Clases Gratuitas</a>
          </div>
        </div>
      </section>

      <section id="shop" className="products-section">
        <div className="section-header">
          <h2 className="section-title">Componentes Destacados</h2>
          <div className="section-line"></div>
        </div>

        <div className="products-grid">
          <div className="product-card">
            <div className="product-image-container">
              <img src={logoImg} alt="Producto" className="product-image" />
              <button className="product-wishlist-btn" aria-label="Añadir a favoritos">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </button>
            </div>
            <div className="product-details">
              <span className="product-category">Tarjetas Gráficas</span>
              <h3 className="product-name">Nvidia RTX 4090 Ti FE</h3>
              <div className="product-footer">
                <span className="product-price">$1,499.00</span>
                <button className="product-add-cart-btn" aria-label="Añadir al carrito">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}