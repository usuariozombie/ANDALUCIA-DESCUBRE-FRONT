import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {

    @Input() message!: string;
    @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(public activeModal: NgbActiveModal) { }

    public confirm(): void {
        this.confirmed.emit(true);
    }

}
