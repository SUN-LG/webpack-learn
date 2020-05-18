import React, {Component} from 'react';

import styles from './app.less';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello, React</h1>
        <p className={styles.color}>I love it</p>
      </div>
    )
  }
}

export default App