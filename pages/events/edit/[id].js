import Layout from '../../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../styles/Form.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '../../../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { FaImage } from 'react-icons/fa';
import Modal from '../../../components/Modal';
import ImageUpload from '../../../components/ImageUpload';
import { parseCookies } from '../../../helpers';

const EditEventPage = ({ event, token }) => {
  const [values, setValues] = useState({
    name: event.name,
    venue: event.venue,
    address: event.address,
    performers: event.performers,
    date: event.date,
    time: event.time,
    description: event.description,
  });

  const [showModal, setShowModal] = useState(false);

  const [imagePreview, setImagePreview] = useState(
    event.image ? event.image.formats.thumbnail.url : null
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const ImageUploaded = async () => {
    const res = await fetch(`${API_URL}/events/${event.id}`);
    const data = await res.json();
    setImagePreview(data?.image?.formats.thumbnail.url);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation!
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
    } else {
      const res = await fetch(`${API_URL}/events/${event.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        if (res.status === 403 || res.status(401)) {
          toast.error('No token included!');
          return;
        }
        toast.error('Something went wrong!');
      } else {
        const data = await res.json();
        router.push(`/events/${data.slug}`);
      }
    }
  };

  const router = useRouter();

  return (
    <Layout title='Add event'>
      <Link href='/events'>Go back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              name='performers'
              id='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              name='venue'
              id='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              name='address'
              id='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              name='time'
              id='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type='submit' value='Edit Event' className='btn' />
      </form>
      <h2>Event Image</h2>
      {imagePreview ? (
        <Image
          src={imagePreview}
          height={100}
          width={170}
          alt='image-preview'
        />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}
      <div>
        <button className='btn-secondary' onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          eventId={event.id}
          ImageUploaded={ImageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
};

export const getServerSideProps = async ({ params: { id }, req }) => {
  const res = await fetch(`${API_URL}/events/${id}`);
  const data = await res.json();

  const { token } = parseCookies(req);

  return {
    props: {
      event: data,
      token,
    },
  };
};

export default EditEventPage;
