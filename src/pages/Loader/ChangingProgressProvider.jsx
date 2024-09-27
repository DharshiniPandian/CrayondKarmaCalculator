// src/components/Loader/ChangingProgressProvider.js

import React from 'react';

class ChangingProgressProvider extends React.Component {
  state = {
    valuesIndex: 0,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length,
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return this.props.children(this.props.values[this.state.valuesIndex]);
  }
}

ChangingProgressProvider.defaultProps = {
  values: [0],
};

export default ChangingProgressProvider;
