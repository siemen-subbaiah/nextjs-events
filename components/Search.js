import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import styles from '../styles/Search.module.css';

const Search = () => {
  const inputRef = useRef(null);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${inputRef.current.value}`);
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Search Events' ref={inputRef} />
      </form>
    </div>
  );
};

export default Search;
