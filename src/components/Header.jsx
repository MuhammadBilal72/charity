import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold"><Link to="/">Charity System</Link></h1>
      <nav className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/campaigns">Campaigns</Link>
        {/* <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link> */}

        {user ? (
          <>
            {user.role === "user" && (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/profile">Profile</Link> {/* ✅ Add this line */}
              </>
            )}

            {user.role === "admin" && <Link to="/admin/dashboard">Admin Panel</Link>}

            <button onClick={logout} className="ml-2">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
