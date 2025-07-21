import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.link}>HOME</Link>
        {user && <Link to="/mybookings" style={styles.link}>My Bookings</Link>}
      </div>
      <div style={styles.right}>
        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={{ ...styles.link, background: "none", border: "none", cursor: "pointer" }}>Logout</button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#333',
    padding: '8px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50px'
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap : '20px'
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  link: {
    color: "lightgray",
    textDecoration: 'none',
    fontSize: '24px',
    lineHeight: '1',
  }
};

export default Navbar;
