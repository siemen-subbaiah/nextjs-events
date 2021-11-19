import Link from 'next/link';
import styles from '../styles/404.module.css';
import Layout from '../components/Layout';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <Layout title='404'>
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle /> 404
        </h1>
        <h4>Sorry nothing here</h4>
        <Link href='/'>Go Back Home</Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
