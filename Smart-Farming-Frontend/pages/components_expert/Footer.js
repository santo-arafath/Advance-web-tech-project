const Footer = () => {
  return (
    <footer>
      <p>© 2023 Smart-Farming</p>

      <style jsx>{`
        footer {
          background-color: #333;
          color: white;
          text-align: center;
          padding: 1rem;
          position: fixed; /* Use fixed positioning */
          bottom: 0;
          left: 0;
          width: 100%;
        }
      `}</style>
    </footer>
    
  );
};

export default Footer;
