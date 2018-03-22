import {Component} from '@angular/core';
import {NwbAlertConfig, NwbAlertService} from '../../../../lib/ng-wizi-bulma/alert/alert.service';

@Component({
  providers: [],
  templateUrl: './alert-demo.html',
})
export class AlertDemo {

  constructor(private nwbAlert: NwbAlertService) {
  }

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

    this.nwbAlert.open(alertConfig)
      .afterClosed()
      .subscribe(manualClose => console.log('alertClose, manualClose', manualClose));
  }

}

