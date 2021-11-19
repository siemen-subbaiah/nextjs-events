import React from 'react';
import DashboardEvents from '../../components/DashboardEvents';
import Layout from '../../components/Layout';
import { API_URL } from '../../config';
import { parseCookies } from '../../helpers';
import styles from '../../styles/Dashboard.module.css';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';

const DashboardPage = ({ data, token }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  return (
    <Layout title='User Dashboard'>
      <ToastContainer />
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {data.map((item) => (
          <DashboardEvents
            event={item}
            key={item.id}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/events/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return {
    props: {
      data,
      token,
    },
  };
};

export default DashboardPage;
