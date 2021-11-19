import styles from '../styles/Footer.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; Dj Events {new Date().getFullYear()}</p>
      <p>
        <Link href='/about'>About this Project</Link>
      </p>
    </footer>
  );
};

export default Footer;
