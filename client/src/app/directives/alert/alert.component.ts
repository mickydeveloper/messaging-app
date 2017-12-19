import { Component } from '@angular/core';
import { AlertService } from '../../services/index';

@Component({
  selector: 'alert',
  moduleId: module.id.toString(),
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent {
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
      this.alertService.getMessage().subscribe(message => { this.message = message; });
  }
}