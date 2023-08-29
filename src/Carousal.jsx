/* eslint-disable react-hooks/exhaustive-deps */
import { FaQuoteRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { longList } from './data';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Carousal = () => {
  const [people, setPeople] = useState(longList);
  console.log(people);
  const [currentPerson, setCurrentPerson] = useState(0);

  const prevSlide = () => {
    setCurrentPerson((oldPerson) => {
      const newPerson = (oldPerson - 1 + people.length) % people.length;
      return newPerson;
    });
  };
  const nextSlide = () => {
    setCurrentPerson((oldPerson) => {
      const newPerson = (oldPerson + 1) % people.length;
      return newPerson;
    });
  };

  useEffect(() => {
    let slideId = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => {
      clearInterval(slideId);
    };
  }, [currentPerson]);

  return (
    <section className="slider-container">
      {people.map((person, index) => {
        const { id, title, image, name, quote } = person;
        return (
          <article
            className="slide"
            key={id}
            style={{
              transform: `translateX(${100 * (index - currentPerson)}%)`,
              opacity: index === currentPerson ? '1' : '0',
              visibility: index === currentPerson ? 'visible' : 'hidden',
            }}
          >
            <img src={image} alt={name} className="person-img" />
            <p className="name">{name}</p>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        );
      })}
      <button className="prev" type="button" onClick={prevSlide}>
        <FiChevronLeft />
      </button>
      <button className="next" type="button" onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  );
};

export default Carousal;
