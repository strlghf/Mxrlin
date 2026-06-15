import logoImg from "../img/geforce.jpeg"
import "./ESlide.css"

export function ESlide () {
  return (
    <div className="carousel-slide slide-upgrade-elite">
      <div className="hero-slide-left">
        <div className="brand-accent-tag">Performance Pro</div>
        <h1 className="hero-slide-title">
          UPGRADE <span className="text-highlight-green">ELITE</span>
        </h1>
        <p className="hero-slide-subtitle">El PC que crece contigo</p>
        
        <div className="hero-slide-actions">
          <a href="#build" className="btn-build-pc">Armar Presupuesto</a>
        </div>
      </div>

      <div className="hero-slide-center">
        <div className="product-showcase-wrapper">
          <img src={logoImg} alt="Hardware Elite 1" className="hardware-render primary-render" />
          <img src={logoImg} alt="Hardware Elite 2" className="hardware-render secondary-render" />
        </div>
      </div>

      <div className="hero-slide-right">
        <div className="combo-mini-card">
          <div className="combo-info">
            <h3>Combo Core</h3>
            <p>Placa Madre + CPU + RAM</p>
            <span className="combo-note">(Ideal si ya tienes tu GPU)</span>
          </div>
          <div className="combo-price-tag">
            <span className="price-prefix">Desde</span>
            <span className="price-amount">$333.868</span>
          </div>
        </div>

        <div className="combo-mini-card featured-combo">
          <div className="combo-info">
            <h3>Combo Power</h3>
            <p>Placa Madre + CPU + RAM + GPU</p>
            <span className="combo-note">(Potencia gráfica inmediata)</span>
          </div>
          <div className="combo-price-tag">
            <span className="price-prefix">Desde</span>
            <span className="price-amount">$648.850</span>
          </div>
        </div>
      </div>
    </div>
  )
}