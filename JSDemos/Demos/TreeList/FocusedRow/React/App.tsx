import React from 'react';

import TreeList, { Column, Lookup } from 'devextreme-react/tree-list';
import { NumberBox } from 'devextreme-react/number-box';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';

const url = 'https://js.devexpress.com/Demos/Mvc/api/TreeListTasks';
const dataSourceOptions = AspNetData.createStore({
  key: 'Task_ID',
  loadUrl: `${url}/Tasks`,
  onBeforeSend(_, ajaxOptions) {
    ajaxOptions.xhrFields = { withCredentials: true };
  },
});
const taskEmployees = AspNetData.createStore({
  key: 'ID',
  loadMode: 'raw',
  loadUrl: `${url}/TaskEmployees`,
});

const focusedRowKeyLabel = { 'aria-label': 'Focused Row Key' };

class App extends React.Component {
  setState: any;

  state: any;

  constructor(props) {
    super(props);

    this.state = {
      taskSubject: '',
      taskAssigned: '',
      startDate: '',
      taskStatus: '',
      taskProgress: '',
      focusedRowKey: 45,
    };

    this.onFocusedRowChanged = this.onFocusedRowChanged.bind(this);
    this.onTaskIdChanged = this.onTaskIdChanged.bind(this);
  }

  onTaskIdChanged(e) {
    if (e.event && e.value > 0) {
      this.setState({ focusedRowKey: e.value });
    }
  }

  onFocusedRowChanged(e) {
    const rowData = e.row && e.row.data;
    let progress;
    let cellValue;
    let assigned;

    if (rowData) {
      progress = rowData.Task_Completion ? `${rowData.Task_Completion}%` : '';
      cellValue = e.component.cellValue(e.row.rowIndex, 'Assigned');
      // @ts-expect-error TS(2339): Property 'done' does not exist on type 'Promise<an... Remove this comment to see the full error message
      taskEmployees.byKey(cellValue).done((item) => {
        assigned = item.Name;
      });

      this.setState({
        taskSubject: rowData.Task_Subject,
        taskAssigned: assigned,
        startDate: new Date(rowData.Task_Start_Date).toLocaleDateString(),
        taskStatus: e.row.data.Task_Status,
        taskProgress: progress,
        focusedRowKey: e.component.option('focusedRowKey'),
      });
    }
  }

  render() {
    return (
      <div>
        // @ts-expect-error TS(2786): 'TreeList' cannot be used as a JSX component.
        <TreeList
          id="treeList"
          dataSource={dataSourceOptions}
          focusedRowEnabled={true}
          focusedRowKey={this.state.focusedRowKey}
          parentIdExpr="Task_Parent_ID"
          hasItemsExpr="Has_Items"
          wordWrapEnabled={true}
          showBorders={true}
          onFocusedRowChanged={this.onFocusedRowChanged}>
          // @ts-expect-error TS(2786): 'Column' cannot be used as a JSX component.
          <Column dataField="Task_ID" width={100} alignment="left" />
          // @ts-expect-error TS(2786): 'Column' cannot be used as a JSX component.
          <Column dataField="Task_Assigned_Employee_ID" caption="Assigned" minWidth={120}>
            // @ts-expect-error TS(2786): 'Lookup' cannot be used as a JSX component.
            <Lookup dataSource={taskEmployees} valueExpr="ID" displayExpr="Name" />
          </Column>
          // @ts-expect-error TS(2786): 'Column' cannot be used as a JSX component.
          <Column dataField="Task_Status" caption="Status" width={160} />
          // @ts-expect-error TS(2786): 'Column' cannot be used as a JSX component.
          <Column dataField="Task_Start_Date" caption="Start Date" dataType="date" width={160} />
          // @ts-expect-error TS(2786): 'Column' cannot be used as a JSX component.
          <Column dataField="Task_Due_Date" caption="Due Date" dataType="date" width={160} />
        </TreeList>
        <div className="task-info">
          <div className="info">
            <div className="task-subject">{this.state.taskSubject}</div>
            <span className="task-assigned">{this.state.taskAssigned}</span>
            <span className="start-date">{this.state.startDate}</span>
          </div>
          <div className="progress">
            <span className="task-status">{this.state.taskStatus}</span>
            <span className="task-progress">{this.state.taskProgress}</span>
          </div>
        </div>

        <div className="options">
          <div className="caption">Options</div>
          <div className="option">
            <span>Focused row key </span>
            // @ts-expect-error TS(2786): 'NumberBox' cannot be used as a JSX component.
            <NumberBox
              id="taskId"
              min={1}
              max={182}
              step={0}
              value={this.state.focusedRowKey}
              inputAttr={focusedRowKeyLabel}
              onValueChanged={this.onTaskIdChanged}>
            </NumberBox>
          </div>
        </div>
      </div>
    );
  }
}

export default App;