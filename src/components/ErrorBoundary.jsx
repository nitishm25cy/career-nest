import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      errorMessage: ""
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error.message
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("CareerNest Error:", error);
    console.error("Error details:", errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">

          <div className="error-card">

            <div className="error-icon">
              !
            </div>

            <span className="hero-tag">
              CAREERNEST
            </span>

            <h1>Something went wrong</h1>

            <p>
              We couldn't load this page correctly.
              Please try refreshing the application.
            </p>

            <button
              className="apply-button"
              onClick={this.handleRefresh}
            >
              Refresh CareerNest →
            </button>

          </div>

        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;