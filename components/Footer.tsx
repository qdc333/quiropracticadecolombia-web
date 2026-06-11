export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {year} Quiropráctica de Colombia · Dr. Kevin Ernesto</p>
        <div className="footer-social">
          <a
            href="https://www.instagram.com/quiropracticadecolombia?igsh=MXhzYnY2MTd1ZTJjdA=="
            target="_blank"
            rel="noopener noreferrer"
          >
            @quiropracticadecolombia
          </a>
          <a
            href="https://www.instagram.com/kevinfixme?igsh=MW82dzRuODkxb2ZxMA=="
            target="_blank"
            rel="noopener noreferrer"
          >
            @kevinfixme
          </a>
        </div>
        <a href="#inicio" className="footer-top">
          Volver arriba
        </a>
      </div>
    </footer>
  );
}
