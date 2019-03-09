import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('game')
@observer
class App extends Component {
  componentDidMount() {
    this.props.game.createField({ x: 4, y: 4 });
  }

  render() {
    const { game } = this.props;

    return (
      <div>{JSON.stringify(game.field, null, 2)}</div>
    );
  }
}

export default App;
