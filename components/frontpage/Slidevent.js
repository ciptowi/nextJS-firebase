import { useState } from "react";
import { Carousel } from "react-bootstrap";
import styles from '../../components/frontpage/Landing.module.css'

export default function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} >
      <Carousel.Item>
        <img
          className={styles.imgCarousel}
          src="https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="First slide"

        />
        <Carousel.Caption>
          <h3>Be the first to Play</h3>
          <p>Everything you dream of come true</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={styles.imgCarousel}
          src="https://images.pexels.com/photos/8762800/pexels-photo-8762800.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Tournament Battle Ground</h3>
          <p>Play with your friend and win the prize.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={styles.imgCarousel}
          src="https://images.pexels.com/photos/7046723/pexels-photo-7046723.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>A SELECTION OF THE BEST JUST FOR YOU</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.Play and enjoy the game we prepare just for you.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}