import React from 'react';
import {
  PivotGrid,
  FieldChooser,
} from 'devextreme-react/pivot-grid';
import { DataGrid, Column } from 'devextreme-react/data-grid';
import { Popup } from 'devextreme-react/popup';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

import { sales } from './data.js';

class App extends React.Component {
  dataGrid: any;

  setState: any;

  state: any;

  constructor(props) {
    super(props);

    this.state = {
      popupTitle: '',
      drillDownDataSource: null,
      popupVisible: false,
    };
    this.onCellClick = this.onCellClick.bind(this);
    this.onHiding = this.onHiding.bind(this);
    this.onShown = this.onShown.bind(this);
    this.getDataGridInstance = this.getDataGridInstance.bind(this);
  }

  render() {
    const { drillDownDataSource, popupTitle, popupVisible } = this.state;

    return (
      <React.Fragment>
        // @ts-expect-error TS(2786): 'PivotGrid' cannot be used as a JSX component.
        <PivotGrid
          id="sales"
          allowSortingBySummary={true}
          allowSorting={true}
          allowFiltering={true}
          allowExpandAll={true}
          showBorders={true}
          dataSource={dataSource}
          onCellClick={this.onCellClick}
        >
          // @ts-expect-error TS(2786): 'FieldChooser' cannot be used as a JSX component.
          <FieldChooser enabled={false} />
        </PivotGrid>
        // @ts-expect-error TS(2786): 'Popup' cannot be used as a JSX component.
        <Popup
          visible={popupVisible}
          width={600}
          height={400}
          title={popupTitle}
          onHiding={this.onHiding}
          onShown={this.onShown}
        >
          // @ts-expect-error TS(2786): 'DataGrid' cannot be used as a JSX component.
          <DataGrid
            width={560}
            height={300}
            dataSource={drillDownDataSource}
            ref={this.getDataGridInstance}
          >
            // @ts-expect-error TS(2786): 'Column' cannot be used as a JSX component.
            <Column dataField="region" />
            // @ts-expect-error TS(2786): 'Column' cannot be used as a JSX component.
            <Column dataField="city" />
            // @ts-expect-error TS(2786): 'Column' cannot be used as a JSX component.
            <Column dataField="amount" dataType="number" format="currency" />
            // @ts-expect-error TS(2786): 'Column' cannot be used as a JSX component.
            <Column dataField="date" dataType="date" />
          </DataGrid>
        </Popup>
      </React.Fragment>
    );
  }

  getDataGridInstance(ref) {
    this.dataGrid = ref.instance;
  }

  onCellClick(e) {
    if (e.area === 'data') {
      const pivotGridDataSource = e.component.getDataSource();
      const rowPathLength = e.cell.rowPath.length;
      const rowPathName = e.cell.rowPath[rowPathLength - 1];

      this.setState({
        popupTitle: `${rowPathName || 'Total'} Drill Down Data`,
        drillDownDataSource: pivotGridDataSource.createDrillDownDataSource(e.cell),
        popupVisible: true,
      });
    }
  }

  onHiding() {
    this.setState({
      popupVisible: false,
    });
  }

  onShown() {
    this.dataGrid.updateDimensions();
  }
}
export default App;

const dataSource = new PivotGridDataSource({
  fields: [{
    caption: 'Region',
    width: 120,
    dataField: 'region',
    area: 'row',
  }, {
    caption: 'City',
    dataField: 'city',
    width: 150,
    area: 'row',
  }, {
    dataField: 'date',
    dataType: 'date',
    area: 'column',
  }, {
    caption: 'Total',
    dataField: 'amount',
    dataType: 'number',
    summaryType: 'sum',
    format: 'currency',
    area: 'data',
  }],
  store: sales,
});