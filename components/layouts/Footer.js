export default function Footer() {
  return (
    <div className="fixed-bottom d-inline bg_navbar rounded">
      <div className="wrapper text-center">
        <a href="#" className="icon facebook mx-2">
          <div className="tooltip">Facebook</div>
          <span>
            <i className="fab fa-facebook-f"></i>
          </span>
        </a>
        <a href="#" className="icon twitter mx-2">
          <div className="tooltip">Twitter</div>
          <span>
            <i className="fab fa-twitter"></i>
          </span>
        </a>
        <a href="#" className="icon instagram mx-2">
          <div className="tooltip">Instagram</div>
          <span>
            <i className="fab fa-instagram"></i>
          </span>
        </a>
        <a href="#" className="icon github mx-2">
          <div className="tooltip">Github</div>
          <span>
            <i className="fab fa-github"></i>
          </span>
        </a>
        <a href="#" className="icon youtube mx-2">
          <div className="tooltip">Youtube</div>
          <span>
            <i className="fab fa-youtube"></i>
          </span>
        </a>
      </div>
      <footer className="text-center">Binar FSW Kelompok 1</footer>
    </div>
  );
}
