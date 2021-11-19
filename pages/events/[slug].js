import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { API_URL } from '../../config';
import styles from '../../styles/Event.module.css';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthState';
import { parseCookies } from '../../helpers';

const EventPage = ({ event, token }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const check = event.user.username === user?.user?.username;

  const handleDelete = async () => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${event.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data.message);
      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push('/events');
      }
    }
  };

  return (
    <Layout>
      <div className={styles.event}>
        {check && (
          <div className={styles.controls}>
            <Link href={`/events/edit/${event.id}`}>
              <a>
                <FaPencilAlt /> Edit Event
              </a>
            </Link>
            <a href='#' className={styles.delete} onClick={handleDelete}>
              <FaTimes /> Delete Event
            </a>
          </div>
        )}
        <span>
          {new Date(event.date).toLocaleDateString('en-US')} at {event.time}
        </span>
        <h1>{event.name}</h1>
        {event.image && (
          <div className={styles.image}>
            <Image
              src={event.image.formats.medium.url}
              blurDataURL={event.image.formats.medium.url}
              width={960}
              height={600}
              placeholder='blur'
              alt='event-pic'
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>

        <Link href='/events'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export const getServerSideProps = async ({ query: { slug }, req }) => {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const data = await res.json();
  const { token } = parseCookies(req);

  return {
    props: {
      event: data[0],
      token: token ? token : '',
    },
  };
};

export default EventPage;
