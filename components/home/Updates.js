import React, { useEffect, useState } from "react";
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from "reactstrap";
import Link from "next/link";

const Updates = ({ updates, updates_id }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    setItems(updates);
    setIds(updates_id);
  }, [updates]);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const onExited = () => {
    setAnimating(false);
  };

  const onExiting = () => {
    setAnimating(true);
  };

  const slides = items.map((item, index) => {
    return (
      <CarouselItem className="custom-tag" tag="div" onExiting={onExiting} onExited={onExited} key={item.game}>
        <Link href={"/updates/" + ids[index]}>
          <a>
            <img
              src={item.thumbnail}
              alt={item.game}
              style={{
                height: 200,
                width: 800,
              }}
            />
            <CarouselCaption captionText={item.game} captionHeader={item.game} />
          </a>
        </Link>
      </CarouselItem>
    );
  });

  return (
    <div>
      <style>
        {`.custom-tag {
              max-width: 100%;
              height: 200px;
              background: black;
              margin-bottom:5px;
            }`}
      </style>
      <h3>LAST UPDATES</h3>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>
  );
};

export default Updates;
