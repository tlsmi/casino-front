import { Link, Outlet } from "react-router-dom";

export default function Root() {
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
          <li>
            <Link to="/games/blackjack">BlackJack</Link>
          </li>
          <li>
            <Link to="/games/slot">Slot</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
