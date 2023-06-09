import React from 'react';
import Button from 'devextreme-react/button';
import TabPanel, { Item } from 'devextreme-react/tab-panel';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';

import 'devextreme/data/odata/store';

const priceDataSource = {
  store: {
    type: 'odata',
    url: 'https://js.devexpress.com/Demos/DevAV/odata/Products',
    key: 'Product_ID',
  },
  select: ['Product_ID', 'Product_Name', 'Product_Sale_Price', 'Product_Retail_Price'],
  filter: ['Product_ID', '<', 10],
};
const ratingDataSource = {
  store: {
    type: 'odata',
    url: 'https://js.devexpress.com/Demos/DevAV/odata/Products',
    key: 'Product_ID',
  },
  select: ['Product_ID', 'Product_Name', 'Product_Consumer_Rating', 'Product_Category'],
  filter: ['Product_ID', '<', 10],
};

class App extends React.Component {
  priceGridRef: any;

  ratingGridRef: any;

  constructor(props) {
    super(props);

    this.priceGridRef = React.createRef();
    this.ratingGridRef = React.createRef();
  }

  render() {
    return (
      <div>
        <div id="exportContainer">
          // @ts-expect-error TS(2786): 'Button' cannot be used as a JSX component.
          <Button
            text="Export multiple grids"
            icon="exportpdf"
            onClick={this.exportGrids}
          />
        </div>
        // @ts-expect-error TS(2786): 'TabPanel' cannot be used as a JSX component.
        <TabPanel id="tabPanel" deferRendering={false}>
          // @ts-expect-error TS(2786): 'Item' cannot be used as a JSX component.
          <Item title="Price">
            // @ts-expect-error TS(2786): 'DataGrid' cannot be used as a JSX component.
            <DataGrid id="priceDataGrid" ref={this.priceGridRef} dataSource={priceDataSource} showBorders={true} rowAlternationEnabled={true}>
              // @ts-expect-error TS(2786): 'Column' cannot be used as a JSX component.
              <Column dataField="Product_ID" caption="ID" width={50} />
              // @ts-expect-error TS(2786): 'Column' cannot be used as a JSX component.
              <Column dataField="Product_Name" caption="Name" />
              // @ts-expect-error TS(2786): 'Column' cannot be used as a JSX component.
              <Column dataField="Product_Sale_Price" caption="Sale Price" dataType="number" format="currency" />
              // @ts-expect-error TS(2786): 'Column' cannot be used as a JSX component.
              <Column dataField="Product_Retail_Price" caption="Retail Price" dataType="number" format="currency" />
            </DataGrid>
          </Item>
          // @ts-expect-error TS(2786): 'Item' cannot be used as a JSX component.
          <Item title="Rating">
            // @ts-expect-error TS(2786): 'DataGrid' cannot be used as a JSX component.
            <DataGrid id="ratingDataGrid" ref={this.ratingGridRef} dataSource={ratingDataSource} showBorders={true} rowAlternationEnabled={true}>
              // @ts-expect-error TS(2786): 'Column' cannot be used as a JSX component.
              <Column dataField="Product_ID" caption="ID" width={50} />
              // @ts-expect-error TS(2786): 'Column' cannot be used as a JSX component.
              <Column dataField="Product_Name" caption="Name" />
              // @ts-expect-error TS(2786): 'Column' cannot be used as a JSX component.
              <Column dataField="Product_Consumer_Rating" caption="Rating" />
              // @ts-expect-error TS(2786): 'Column' cannot be used as a JSX component.
              <Column dataField="Product_Category" caption="Category" />
            </DataGrid>
          </Item>
        </TabPanel>
      </div>
    );
  }

  // @ts-expect-error TS(2300): Duplicate identifier 'setAlternatingRowsBackground... Remove this comment to see the full error message
  setAlternatingRowsBackground = (dataGrid, gridCell, pdfCell) => {
    if (gridCell.rowType === 'data') {
      const rowIndex = dataGrid.getRowIndexByKey(gridCell.data.Product_ID);
      if (rowIndex % 2 === 0) {
        pdfCell.backgroundColor = '#D3D3D3';
      }
    }
  }

  exportGrids = () => {
    const context = this;
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();

    exportDataGrid({
      jsPDFDocument: doc,
      component: context.priceDataGrid,
      topLeft: { x: 7, y: 5 },
      columnWidths: [20, 50, 50, 50],
      customizeCell: ({ gridCell, pdfCell }) => {
        context.setAlternatingRowsBackground(context.priceDataGrid, gridCell, pdfCell);
      },
    }).then(() => {
      doc.addPage();
      exportDataGrid({
        jsPDFDocument: doc,
        component: context.ratingDataGrid,
        topLeft: { x: 7, y: 5 },
        columnWidths: [20, 50, 50, 50],
        customizeCell: ({ gridCell, pdfCell }) => {
          context.setAlternatingRowsBackground(context.ratingDataGrid, gridCell, pdfCell);
        },
      }).then(() => {
        doc.save('MultipleGrids.pdf');
      });
    });
  }

  // @ts-expect-error TS(2300): Duplicate identifier 'setAlternatingRowsBackground... Remove this comment to see the full error message
  setAlternatingRowsBackground(gridCell, excelCell) {
    if (gridCell.rowType === 'header' || gridCell.rowType === 'data') {
      if (excelCell.fullAddress.row % 2 === 0) {
        excelCell.fill = {
          type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' },
        };
      }
    }
  }

  get priceDataGrid() {
    return this.priceGridRef.current.instance;
  }

  get ratingDataGrid() {
    return this.ratingGridRef.current.instance;
  }
}

export default App;