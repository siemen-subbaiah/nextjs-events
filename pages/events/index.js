import EventItem from '../../components/EventItem';
import Layout from '../../components/Layout';
import { API_URL } from '../../config';
import { useRouter } from 'next/router';
import Paginate from '../../components/Paginate';
const PER_PAGE = 3;

const EventPage = ({ events }) => {
  const router = useRouter();

  const startIndex = Number(router.query.page) || 1;

  return (
    <Layout title='Events'>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No Events to show!</h3>}
      {events?.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
      <Paginate events={events} startIndex={startIndex} />
    </Layout>
  );
};

export const getServerSideProps = async ({ query: { page = 1 } }) => {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  const res = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const data = await res.json();

  return {
    props: {
      events: data,
    },
  };
};

export default EventPage;
