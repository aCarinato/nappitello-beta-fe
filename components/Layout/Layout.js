// styles
import classes from './Layout.module.css';
// own components
import MainHeader from './MainHeader';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div>
      <MainHeader />
      <main className={classes['main-box-0']}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
