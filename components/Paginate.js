import Link from 'next/link';

const Paginate = ({ events, startIndex }) => {
  return (
    <>
      {events.length >= 1 && (
        <>
          {startIndex > 1 && (
            <Link href={`/events?page=${startIndex - 1}`}>
              <a className='btn-secondary'>Prev</a>
            </Link>
          )}
          <Link href={`/events?page=${startIndex + 1}`}>
            <a className='btn-secondary'>Next</a>
          </Link>
        </>
      )}
    </>
  );
};

export default Paginate;
