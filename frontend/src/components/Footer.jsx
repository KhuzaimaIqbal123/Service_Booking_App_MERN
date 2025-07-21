import React from "react";

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© 2025 Muhammad Khuzaim. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#ffa',
    textAlign: 'center',
    padding: '10px 0',
    position: 'fixed',
    bottom: 0,
    width: '100%'
  }
};

export default Footer;
