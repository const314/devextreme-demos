import React from 'react';

import RowTemplate from './RowTemplate.js';

const years = ['2010', '2011', '2012'];

export default function App() {
  return (
    <React.Fragment>
      <div className="long-title"><h3>Monthly Prices of Aluminium, Nickel and Copper</h3></div>
      <div id="chart-demo">
        <table
          className="demo-table"
          // @ts-expect-error TS(2322): Type '{ children: Element; className: string; bord... Remove this comment to see the full error message
          border="1"
        >
          <tbody>
            <tr>
              <th />
              <th>Aluminium (USD/ton)</th>
              <th>Nickel (USD/ton)</th>
              <th>Copper (USD/ton)</th>
            </tr>
            {
              years.map((year, index) => <RowTemplate key={index} year={year} />)
            }
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}