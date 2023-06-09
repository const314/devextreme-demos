import React from 'react';
import Diagram, { Group, Toolbox } from 'devextreme-react/diagram';
import 'whatwg-fetch';

class App extends React.Component {
  diagramRef: any;

  constructor(props) {
    super(props);

    this.diagramRef = React.createRef();
  }

  componentDidMount() {
    const diagram = this.diagramRef.current.instance;
    fetch('../../../../data/diagram-structure.json')
      .then((response) => response.json())
      .then((json) => {
        diagram.import(JSON.stringify(json));
      })
      .catch(() => {
        throw new Error('Data Loading Error');
      });
  }

  render() {
    return (
      // @ts-expect-error TS(2786): 'Diagram' cannot be used as a JSX component.
      <Diagram id="diagram" ref={this.diagramRef}>
        // @ts-expect-error TS(2786): 'Toolbox' cannot be used as a JSX component.
        <Toolbox>
          // @ts-expect-error TS(2786): 'Group' cannot be used as a JSX component.
          <Group category="general" title="General" />
          // @ts-expect-error TS(2786): 'Group' cannot be used as a JSX component.
          <Group category="containers" title="Containers" expanded={true} />
        </Toolbox>
      </Diagram>
    );
  }
}

export default App;