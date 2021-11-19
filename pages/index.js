import EventItem from '../components/EventItem';
import Layout from '../components/Layout';
import { API_URL } from '../config';
import Link from 'next/link';

const HomePage = ({ events }) => {
  return (
    <Layout title='Home'>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No Events to show!</h3>}
      {events?.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View all Events</a>
        </Link>
      )}
    </Layout>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const data = await res.json();

  return {
    props: {
      events: data,
    },
    revalidate: 1,
  };
};

export default HomePage;
