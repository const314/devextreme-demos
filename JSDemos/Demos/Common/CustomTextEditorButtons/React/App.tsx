import React from 'react';

import { TextBox, Button as TextBoxButton } from 'devextreme-react/text-box';
import { NumberBox, Button as NumberBoxButton } from 'devextreme-react/number-box';
import { DateBox, Button as DateBoxButton } from 'devextreme-react/date-box';

const millisecondsInDay = 24 * 60 * 60 * 1000;
const currencyLabel = { 'aria-label': 'Multi Currency' };
const dateBoxLabel = { 'aria-label': 'Date' };
const passwordLabel = { 'aria-label': 'Password' };

class App extends React.Component {
  currencyButton: any;

  nextDateButton: any;

  onDateChanged: any;

  passwordButton: any;

  prevDateButton: any;

  setState: any;

  state: any;

  todayButton: any;

  constructor(props) {
    super(props);

    this.state = {
      passwordMode: 'password',
      currencyFormat: '$ #.##',
      currencyValue: 14500.55,
      dateValue: new Date().getTime(),
    };

    this.passwordButton = {
      icon: '../../../../images/icons/eye.png',
      type: 'default',
      onClick: () => {
        this.setState({
          passwordMode: (this.state.passwordMode === 'text' ? 'password' : 'text'),
        });
      },
    };

    this.currencyButton = {
      text: '€',
      stylingMode: 'text',
      width: 32,
      elementAttr: {
        class: 'currency',
      },
      onClick: (e) => {
        if (e.component.option('text') === '$') {
          e.component.option('text', '€');
          this.setState({
            currencyFormat: '$ #.##',
            currencyValue: this.state.currencyValue / 0.836,
          });
        } else {
          e.component.option('text', '$');
          this.setState({
            currencyFormat: '€ #.##',
            currencyValue: this.state.currencyValue * 0.836,
          });
        }
      },
    };

    this.changeCurrency = this.changeCurrency.bind(this);

    this.todayButton = {
      text: 'Today',
      onClick: () => {
        this.setState({
          dateValue: new Date().getTime(),
        });
      },
    };

    this.prevDateButton = {
      icon: 'spinprev',
      stylingMode: 'text',
      onClick: () => {
        this.setState({
          dateValue: this.state.dateValue - millisecondsInDay,
        });
      },
    };

    this.nextDateButton = {
      icon: 'spinnext',
      stylingMode: 'text',
      onClick: () => {
        this.setState({
          dateValue: this.state.dateValue + millisecondsInDay,
        });
      },
    };

    this.onDateChanged = (e) => {
      this.setState({
        dateValue: e.value,
      });
    };
  }

  changeCurrency(data) {
    this.setState({
      currencyValue: data.value,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="dx-fieldset">
          <div className="dx-field">
            <div className="dx-field-label">Password TextBox</div>
            <div className="dx-field-value">
              // @ts-expect-error TS(2786): 'TextBox' cannot be used as a JSX component.
              <TextBox
                placeholder="password"
                stylingMode="filled"
                defaultValue="password"
                inputAttr={passwordLabel}
                mode={this.state.passwordMode}>
                // @ts-expect-error TS(2786): 'TextBoxButton' cannot be used as a JSX component.
                <TextBoxButton
                  // @ts-expect-error TS(2322): Type '{ name: string; location: string; options: a... Remove this comment to see the full error message
                  name="password"
                  location="after"
                  options={this.passwordButton}
                />
              </TextBox>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Multi-currency NumberBox</div>
            <div className="dx-field-value">
              // @ts-expect-error TS(2786): 'NumberBox' cannot be used as a JSX component.
              <NumberBox
                showClearButton={true}
                showSpinButtons={true}
                format={this.state.currencyFormat}
                value={this.state.currencyValue}
                inputAttr={currencyLabel}
                onValueChanged={this.changeCurrency}>
                // @ts-expect-error TS(2786): 'NumberBoxButton' cannot be used as a JSX componen... Remove this comment to see the full error message
                <NumberBoxButton
                  // @ts-expect-error TS(2322): Type '{ name: string; location: string; options: a... Remove this comment to see the full error message
                  name="currency"
                  location="after"
                  options={this.currencyButton}
                />
                // @ts-expect-error TS(2786): 'NumberBoxButton' cannot be used as a JSX componen... Remove this comment to see the full error message
                <NumberBoxButton name="clear" />
                // @ts-expect-error TS(2786): 'NumberBoxButton' cannot be used as a JSX componen... Remove this comment to see the full error message
                <NumberBoxButton name="spins" />
              </NumberBox>
            </div>
          </div>
          <div className="dx-field">
            <div className="dx-field-label">Advanced DateBox</div>
            <div className="dx-field-value">
              // @ts-expect-error TS(2786): 'DateBox' cannot be used as a JSX component.
              <DateBox value={this.state.dateValue}
                stylingMode="outlined"
                inputAttr={dateBoxLabel}
                onValueChanged={this.onDateChanged}>
                // @ts-expect-error TS(2786): 'DateBoxButton' cannot be used as a JSX component.
                <DateBoxButton
                  // @ts-expect-error TS(2322): Type '{ name: string; location: string; options: a... Remove this comment to see the full error message
                  name="today"
                  location="before"
                  options={this.todayButton}
                />
                // @ts-expect-error TS(2786): 'DateBoxButton' cannot be used as a JSX component.
                <DateBoxButton
                  // @ts-expect-error TS(2322): Type '{ name: string; location: string; options: a... Remove this comment to see the full error message
                  name="prevDate"
                  location="before"
                  options={this.prevDateButton}
                />
                // @ts-expect-error TS(2786): 'DateBoxButton' cannot be used as a JSX component.
                <DateBoxButton
                  // @ts-expect-error TS(2322): Type '{ name: string; location: string; options: a... Remove this comment to see the full error message
                  name="nextDate"
                  location="after"
                  options={this.nextDateButton}
                />
                // @ts-expect-error TS(2786): 'DateBoxButton' cannot be used as a JSX component.
                <DateBoxButton name="dropDown" />
              </DateBox>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;