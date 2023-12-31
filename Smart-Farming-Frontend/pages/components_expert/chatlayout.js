
import Header from './header2'


const Layout = ({ children }) => {
  return (
    <>
      <Header>
        <title>Your Page Title</title>
      </Header>
      <div>{children}</div>
      
    </>
  );
};

export default Layout;