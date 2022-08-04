import { Component } from "react";
import { Link, Navigate } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h2>
          There was an error, cry about it lol!
          <Link to="/">Click here</Link> to go back to home or wait.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
