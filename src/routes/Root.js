import { Link, Outlet } from "react-router-dom";

export default function Root() {
  console.log(window.location.href)
  if (sessionStorage.getItem('token') === null && window.location.href !== "http://localhost:3000/login" && window.location.href !== "http://localhost:3000/signup" ) {
    window.location.href = '/login'
  }
  return (
    <>
      <nav id="navbar">
        <ul>
          <li>
            <Link to="/">Homepage</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
