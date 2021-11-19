import { useRouter } from 'next/router';
import EventItem from '../../components/EventItem';
import Layout from '../../components/Layout';
import { API_URL } from '../../config';
import Link from 'next/link';

const SearchPage = ({ searchTerm }) => {
  const {
    query: { term },
  } = useRouter();

  return (
    <Layout title='Search'>
      <Link href='/events'>Go Back</Link>
      <h1>Search Results for {term}</h1>
      {searchTerm.length === 0 && <h3>No events to show</h3>}
      {searchTerm.map((event) => (
        <EventItem event={event} key={event.id} />
      ))}
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(
    `${API_URL}/events?_sort=date:ASC&_q=${context.query.term}`
  );
  const data = await res.json();

  return {
    props: {
      searchTerm: data,
    },
  };
};

export default SearchPage;
