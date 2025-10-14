export default function Navbar() {
  return (
    <div className="sidebar__nav-wrap">
      <ul className="sidebar__nav">
        <li className="sidebar__nav-item">
          <a
            href="catalog.html"
            className="sidebar__nav-link sidebar__nav-link--active"
          >
            <i className="ti ti-movie" /> <span>Catalog</span>
          </a>
        </li>
        <li className="sidebar__nav-item">
          <a href="users.html" className="sidebar__nav-link">
            <i className="ti ti-users" /> <span>Users</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
