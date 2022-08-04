import { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "http://bit.ly/pet-adopt");
  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="bg-orange-300 m-40 rounded-3xl p-10 ">
        <Carousel images={images} />
        <div>
          <h1 className="text-5xl mt-5">{name}</h1>
          <h2 className="text-2xl">{`${animal} — ${breed} — ${city}, ${state}`}</h2>

          <div className="w-full flex justify-center items-center">
            <ThemeContext.Consumer>
              {([theme]) => (
                <button
                  onClick={this.toggleModal}
                  className="my-4 rounded px-6 py-2 text-white hover:opacity-50 border-none"
                  style={{ backgroundColor: theme }}
                >
                  Adopt {name}
                </button>
              )}
            </ThemeContext.Consumer>
          </div>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div className="p-40 bg-gray-700 text-white rounded-3xl">
                <h1>Would you like to adopt {name}?</h1>
                <div className="z-20 flex justify-center mt-20">
                  <a className="inline-block mr-3 rounded px-6 py-2 hover:opacity-50 border-none bg-red-700" href="https://bit.ly/pet-adopt">Yes</a>
                  <button className="inline-block mr-3 rounded px-6 py-2 hover:opacity-50 border-none bg-red-700" onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams();
  return (
    <ErrorBoundary>
      <Details params={params} />
    </ErrorBoundary>
  );
};

export default WrappedDetails;
