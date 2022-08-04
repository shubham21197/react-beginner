import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="flex flex-row justify-evenly w-full">
        <img className="object-scale-down h-80 w-80 border-4 border-gray-500" src={images[active]} alt="animal" />
        <div className="flex flex-row justify-between bg-orange-200 rounded-2xl">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={"m-5 object-scale-down h-32 w-32 rounded-full " + (index === active ? "border-4 border-slate-800" : "")}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
