import { useState } from "react";

const Carousel = (props) => {

  const [state, setState] = useState({
    active: 0
  })

  const defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  props = props ? props : defaultProps;

  const handleIndexClick = (event) => {
    setState({
      active: +event.target.dataset.index,
    });
  };

  const { active } = state;
  const { images } = props;

  return (
    <div className="carousel">
      <img src={images[active]} alt="animal" />
      <div className="carousel-smaller">
        {images.map((photo, index) => (
          // eslint-disable-next-line
          <img
            onClick={handleIndexClick}
            key={photo}
            src={photo}
            data-index={index}
            className={index === active ? "active" : ""}
            alt="animal thumbnail"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
