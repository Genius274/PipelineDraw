import React, { Component } from 'react';
import { PipelineDraw } from './PipelineDraw';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
            <h1>Pipeline Draw</h1>
            <PipelineDraw/>
      </div>
    );
  }
}
