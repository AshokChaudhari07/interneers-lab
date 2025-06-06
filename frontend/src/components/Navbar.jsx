const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-lg sticky-top">
      <div className="container">
        <a className="navbar-brand fw-bold fs-3 text-primary" href="/">
          Ripp<span className="text-dark">Kart</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About Us
              </a>
            </li>
          </ul>

          <form
            className="d-flex ms-lg-3 mt-2 mt-lg-0"
            role="search"
            style={{ maxWidth: "400px", width: "100%" }}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-primary" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
