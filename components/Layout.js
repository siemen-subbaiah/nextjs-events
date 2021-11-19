import Head from 'next/head';
import styles from '../styles/Layout.module.css';
import Footer from './Footer';
import Header from './Header';
import Showcase from './Showcase';
import { useRouter } from 'next/router';

const Layout = ({ title, description, children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title || 'lisa'} | Dj-events</title>
        <meta
          name='description'
          content={description || 'description goes here!'}
        />
      </Head>
      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
