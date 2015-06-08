import React from "react";

const STATUS = {
  INITIAL: "initial",
  RESOLVED: "resolved",
  ERROR: "error"
};

export default React.createClass({
  displayName: "Loadable",
  getInitialState() {
    return {status: STATUS.INITIAL, value: null};
  },
  componentDidMount() {
    let {promise} = this.props;
    promise.then(this.onResolve, this.onError);
  },
  // componentDidUpdate() {
  //   this.setState({status: STATUS.INITIAL});
  //   this.componentDidMount();
  // },
  onResolve(value) {
    // TODO: Find out why this is being called multiple times
    if (this.state.status !== STATUS.RESOLVED) {
      this.setState({status: STATUS.RESOLVED, value});
    }
  },
  onError(value) {
    // TODO: Find out why this is being called multiple times
    if (this.state.status !== STATUS.ERROR) {
      this.setState({status: STATUS.ERROR, value});
    }
  },
  render() {
    let {status, value} = this.state;
    let {renderLoaded, renderError} = this.props;

    if (status === STATUS.INITIAL) {
      return (
        <span className="loadable-loading">Loading...</span>
      );
    } else if (status === STATUS.RESOLVED) {
      return renderLoaded(value);
    } else {
      return renderError(value);
    }
  }
});