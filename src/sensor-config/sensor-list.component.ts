import {Component, OnInit, Input, Output, EventEmitter } from 'angular2/core';

import { Sensor } from '../core/sensor';
import { ConfigModalComponent  } from '../modal/modal.component';
import { OpenWithDirective } from '../modal/open-modal.directive';

@Component({
    selector: 'sensor-list',
    template: `
<table class="mdl-data-table mdl-js-data-table mdl-cell--12-col" *ngIf="sensors && sensors.length > 0">
    <thead>
        <tr>
            <th class="mdl-data-table__cell--non-numeric">Name</th>
            <th class="mdl-data-table__cell--non-numeric">Description</th>
            <th class="mdl-data-table__cell--non-numeric">Type</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="#item of sensors">
            <td class="mdl-data-table__cell--non-numeric">{{ item.name }}</td>
            <td class="mdl-data-table__cell--non-numeric">{{ item.description }}</td>
            <td class="mdl-data-table__cell--non-numeric">{{ item.type }}</td>
            <td class="mdl-data-table__cell--non-numeric">
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" [open-with]="modal" (click)="dataItem=item" (confirm)="add(item)">
                    Configure and add to dashboard
                </button>
                <button class="mdl-button mdl-js-button mdl-button--raised" [open-with]="modalConfirm" (confirm)="add(item)">
                    Quick add
                </button>
            </td>
        </tr>
    </tbody>
</table>

<modal #modal>
    <span title>Configure Sensor</span>
    <div content class="mdl-card__supporting-text">
        <form action="#" *ngIf="dataItem">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" id="username" [(ngModel)]="dataItem.name"  />
                <label class="mdl-textfield__label" for="username">Username</label>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <textarea class="mdl-textfield__input" [(ngModel)]="dataItem.description"></textarea>
                <label class="mdl-textfield__label" for="userpass">Description</label>
            </div>
        </form>
    </div>
</modal>

<modal #modalConfirm>
    <span title>Are you sure?</span>
    <div content>
        Are you sure you want to add this sensor directly to your dashboard?
    </div>
</modal>
    `,
    directives: [ ConfigModalComponent, OpenWithDirective ]
})

export class SensorListComponent {
    @Input() sensors: Sensor[];
    @Output() addItem: EventEmitter<Sensor> = new EventEmitter<Sensor>();

    constructor() {

    }

    add(sensor: Sensor) {
        this.addItem.emit(sensor);
    }
}