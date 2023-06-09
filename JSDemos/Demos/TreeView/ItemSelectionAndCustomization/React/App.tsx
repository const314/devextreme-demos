import React from 'react';
import TreeView from 'devextreme-react/tree-view';
import List from 'devextreme-react/list';
import SelectBox from 'devextreme-react/select-box';
import CheckBox from 'devextreme-react/check-box';

import { employees, showCheckboxesModeLabel, selectionModeLabel } from './data.js';

class App extends React.Component {
  setState: any;

  state: any;

  treeViewRef: any;

  constructor() {
    super();
    this.treeViewRef = React.createRef();
    const showCheckBoxesModes = ['normal', 'selectAll', 'none'];
    const selectionModes = ['multiple', 'single'];
    const showCheckBoxesMode = showCheckBoxesModes[0];
    const selectionMode = selectionModes[0];
    this.state = {
      employees,
      selectedEmployees: [],
      selectNodesRecursive: true,
      selectByClick: false,
      showCheckBoxesModes,
      showCheckBoxesMode,
      selectionModes,
      selectionMode,
      isSelectionModeDisabled: false,
      isRecursiveDisabled: false,
    };
    this.treeViewSelectionChanged = this.treeViewSelectionChanged.bind(this);
    this.treeViewContentReady = this.treeViewContentReady.bind(this);
    this.showCheckBoxesModeValueChanged = this.showCheckBoxesModeValueChanged.bind(this);
    this.selectionModeValueChanged = this.selectionModeValueChanged.bind(this);
    this.selectNodesRecursiveValueChanged = this.selectNodesRecursiveValueChanged.bind(this);
    this.selectByClickValueChanged = this.selectByClickValueChanged.bind(this);
  }

  render() {
    return (
      <div>
        <div className="form">
          <h4>Employees</h4>
          // @ts-expect-error TS(2786): 'TreeView' cannot be used as a JSX component.
          <TreeView
            id="treeview"
            ref={this.treeViewRef}
            width={340}
            height={320}
            items={this.state.employees}
            selectNodesRecursive={this.state.selectNodesRecursive}
            selectByClick={this.state.selectByClick}
            showCheckBoxesMode={this.state.showCheckBoxesMode}
            selectionMode={this.state.selectionMode}
            onSelectionChanged={this.treeViewSelectionChanged}
            onContentReady={this.treeViewContentReady}
            itemRender={renderTreeViewItem}
          />
          {' '}
          <div className="selected-container">Selected employees
            // @ts-expect-error TS(2786): 'List' cannot be used as a JSX component.
          <List
            id="selected-employees"
            width={400}
            height={200}
            showScrollbar="always"
            items={this.state.selectedEmployees}
            itemRender={renderListItem}
          />
          </div>
        </div>
        <div className="options">
          <div className="caption">Options</div>
          <div className="options-container">
            <div className="option">
              <span>Show Check Boxes Mode:</span>
              <div className="editor-container">
                // @ts-expect-error TS(2786): 'SelectBox' cannot be used as a JSX component.
                <SelectBox
                  items={this.state.showCheckBoxesModes}
                  value={this.state.showCheckBoxesMode}
                  inputAttr={showCheckboxesModeLabel}
                  onValueChanged={this.showCheckBoxesModeValueChanged} />
              </div>
            </div>
            <div className="option">
              <span>Selection Mode:</span>
              <div className="editor-container">
                // @ts-expect-error TS(2786): 'SelectBox' cannot be used as a JSX component.
                <SelectBox
                  items={this.state.selectionModes}
                  value={this.state.selectionMode}
                  inputAttr={selectionModeLabel}
                  disabled={this.state.isSelectionModeDisabled}
                  onValueChanged={this.selectionModeValueChanged} />
              </div>
            </div>
            <div className="option">
              <div className="caption-placeholder">&nbsp;</div>
              <div className="editor-container">
                // @ts-expect-error TS(2786): 'CheckBox' cannot be used as a JSX component.
                <CheckBox
                  text="Select Nodes Recursive"
                  value={this.state.selectNodesRecursive}
                  disabled={this.state.isRecursiveDisabled}
                  onValueChanged={this.selectNodesRecursiveValueChanged} />
              </div>
            </div>
            <div className="option">
              <div className="caption-placeholder">&nbsp;</div>
              <div className="editor-container">
                // @ts-expect-error TS(2786): 'CheckBox' cannot be used as a JSX component.
                <CheckBox
                  text="Select By Click"
                  value={this.state.selectByClick}
                  onValueChanged={this.selectByClickValueChanged} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  treeViewSelectionChanged(e) {
    this.syncSelection(e.component);
  }

  treeViewContentReady(e) {
    this.syncSelection(e.component);
  }

  syncSelection(treeView) {
    const selectedEmployees = treeView.getSelectedNodes()
      .map((node) => node.itemData);

    this.setState(() => ({ selectedEmployees }));
  }

  showCheckBoxesModeValueChanged(e) {
    const state = { showCheckBoxesMode: e.value };

    if (e.value === 'selectAll') {
      // @ts-expect-error TS(2339): Property 'selectionMode' does not exist on type '{... Remove this comment to see the full error message
      state.selectionMode = 'multiple';
      // @ts-expect-error TS(2339): Property 'isRecursiveDisabled' does not exist on t... Remove this comment to see the full error message
      state.isRecursiveDisabled = false;
    }
    // @ts-expect-error TS(2339): Property 'isSelectionModeDisabled' does not exist ... Remove this comment to see the full error message
    state.isSelectionModeDisabled = e.value === 'selectAll';

    this.setState(state);
  }

  selectionModeValueChanged(e) {
    const state = { selectionMode: e.value };

    if (e.value === 'single') {
      // @ts-expect-error TS(2339): Property 'selectNodesRecursive' does not exist on ... Remove this comment to see the full error message
      state.selectNodesRecursive = false;
      this.treeView.unselectAll();
    }
    // @ts-expect-error TS(2339): Property 'isRecursiveDisabled' does not exist on t... Remove this comment to see the full error message
    state.isRecursiveDisabled = e.value === 'single';

    this.setState(state);
  }

  selectNodesRecursiveValueChanged(e) {
    this.setState({ selectNodesRecursive: e.value });
  }

  selectByClickValueChanged(e) {
    this.setState({ selectByClick: e.value });
  }

  get treeView() {
    return this.treeViewRef.current.instance;
  }
}

function renderTreeViewItem(item) {
  return `${item.fullName} (${item.position})`;
}

function renderListItem(item) {
  return `${item.prefix} ${item.fullName} (${item.position})`;
}

export default App;