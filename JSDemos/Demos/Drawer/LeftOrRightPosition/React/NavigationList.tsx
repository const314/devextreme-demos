import React from 'react';

import List from 'devextreme-react/list.js';
import { navigation } from './data.js';

class NavigationList extends React.PureComponent {
  render() {
    return (
      <div className="list" style={{ width: '200px' }}>
        // @ts-expect-error TS(2786): 'List' cannot be used as a JSX component.
        <List
          dataSource={navigation}
          hoverStateEnabled={false}
          activeStateEnabled={false}
          focusStateEnabled={false}
          className="panel-list dx-theme-accent-as-background-color" />
      </div>
    );
  }
}

export default NavigationList;