import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/eventItem.module.css';

const EventItem = ({ event }) => {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            event.image
              ? event.image.formats.thumbnail.url
              : '/images/event-default.png'
          }
          blurDataURL={
            event.image
              ? event.image.formats.thumbnail.url
              : '/images/event-default.png'
          }
          height={100}
          width={170}
          placeholder='blur'
          alt='event'
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(event.date).toLocaleDateString('en-US')} at {event.time}
        </span>
        <h3>{event.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${event.slug}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
