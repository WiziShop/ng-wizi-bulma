import { Component } from '@angular/core';
import { NwbAlertConfig, NwbAlertService } from 'projects/ng-wizi-bulma/src/public_api';

@Component({
  providers: [],
  templateUrl: './alert-demo.html'
})
export class AlertDemo {
  constructor(private nwbAlert: NwbAlertService) {}

  sample1 = `
    const position = '{your position}';
    const color = '{your color}';
    const alertConfig: NwbAlertConfig = {
      message: 'My alert message with <b>bold</b>',
      duration: 1000,
      position: position,
      color: color
    };

    this.nwbAlert.open(alertConfig)
      .afterClosed()
      .subscribe(() => console.log('alertClose'));
`;

  sample2 = `
    const position = '{your position}';
    const color = '{your color}';
    const alertConfig: NwbAlertConfig = {
      message: 'My alert message with <b>bold</b>',
      duration: 1000,
      position: position,
      color: color,
      extraClasses: 'is-inverted'
    };

    this.nwbAlert.open(alertConfig)
      .afterClosed()
      .subscribe(() => console.log('alertClose'));
`;

  sample3 = `
    const position = '{your position}';
    const color = '{your color}';
    const alertConfig: NwbAlertConfig = {
      message: 'My alert message with <b>bold</b>',
      duration: 1000,
      position: position,
      color: color,
      icon: 'fa fa-warning fa-2x'
    };

    this.nwbAlert.open(alertConfig)
      .afterClosed()
      .subscribe(() => console.log('alertClose'));
`;

  openAlert(position, color, extraClasses = '', icon = '') {
    console.log('openAlert');

    const alertConfig: NwbAlertConfig = {
      message: 'My alert message with <b>bold</b>',
      duration: 1000,
      position: position,
      color: color
    };
    if (extraClasses !== '') {
      alertConfig.extraClasses = extraClasses;
    }
    if (icon !== '') {
      alertConfig.icon = icon;
    }

    this.nwbAlert
      .open(alertConfig)
      .afterClosed()
      .subscribe(() => console.log('alertClose'));
  }
}
