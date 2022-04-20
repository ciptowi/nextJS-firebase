import React, { useEffect, useState } from "react";
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from "reactstrap";
import Link from "next/link";

const LastPlayedGame = ({ itemss, idss }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    itemss.push({
      developer: "Kelompok 1",
      genre: "Classic",
      name: "Rock Paper Scissor",
      released_date: "03/25/22",
      thumbnail: "https://wallpaperaccess.com/full/5777368.png",
    });
    idss.push("l9Ay2BQwtsJc7kfgfOp7");
    setItems(itemss);
    setIds(idss);
  }, [itemss]);

  const getChildContext = () => {
    return {
      color: "#FFFFFF",
    };
  };
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

  const slides = items.map((item, idx) => {
    return (
      <CarouselItem className="custom-tag" tag="div" onExiting={onExiting} onExited={onExited} key={idx}>
        <Link href={"/games/" + ids[idx]}>
          <a>
            <img
              src={item.thumbnail}
              alt={item.name}
              style={{
                height: 200,
                width: 800,
              }}
            />

            <CarouselCaption captionText={item.genre} captionHeader={item.name} />
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
      <h3>LAST PLAYED GAMES</h3>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>
  );
};

export default LastPlayedGame;
