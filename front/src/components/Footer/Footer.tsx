import "./Footer.css";

export function Footer () {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/about" className="footer-link-item">About us</a>
            <span className="footer-separator">•</span>
          <a href="/contact" className="footer-link-item">Contact</a>
        </div>
        <p className="copyright-text">
          &copy; 2026 strlghf. All rights reserved.
        </p>
      </div>
    </footer>
  )
}