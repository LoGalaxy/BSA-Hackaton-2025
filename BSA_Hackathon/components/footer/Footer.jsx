import "./Footer.scss";

export const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer__section">
          <h3>About Us</h3>
          <p>Learn more about our company and mission.</p>
        </div>
        <div className="footer__section">
          <h3>Contact Us</h3>
          <p>Email: contact@example.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="footer__section">
          <h3>Legal Mention</h3>
          <p>All rights reserved. © 2024</p>
        </div>
      </footer>
    );
  };
  