import "./Header.css";
import { useRef, type ChangeEvent, type Dispatch, type FormEvent } from "react";
import logoImg from "../../img/kl.jpg";
import { useScrolling } from "../../hooks/useScrolling";
import { Link } from "react-router";

interface HeaderProps {
  search: string;
  setSearch: Dispatch<React.SetStateAction<string>>;
  handleSearchSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function Header ({ search, setSearch, handleSearchSubmit }: HeaderProps) {
  const { visible } = useScrolling();
  const inputRef = useRef<HTMLInputElement>(null);

  // CAMBIAR FOCUS INPUT
  const handleClick = () => {
    inputRef.current?.focus();
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearch(value);
  }

  return (
    <header className={`main-header ${!visible ? "header-hidden" : ""}`}>
      <Link to={"/"} className="header-logo">
        <img src={logoImg} alt="Home" />
      </Link>
      <form className="header-search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={search}
          ref={inputRef}
          onChange={handleChange}
          className="header-search-input"
          placeholder="Search products, brands..."
        />
        <button type="submit" className="header-search-btn" onClick={handleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>
      <ul className="header-actions">
        <li>
          <a href="/wishlist" className="header-action-btn" aria-label="Mis Favoritos">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </a>
        </li>
        <li>
          <a href="/account" className="header-action-btn" aria-label="Mi Cuenta">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </a>
        </li>
        <li>
          <a href="/cart" className="header-action-btn header-cart-toggle" aria-label="Ver Carrito">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="cart-badge"></span>
        </a>
        </li>
      </ul>
    </header>
  )
}