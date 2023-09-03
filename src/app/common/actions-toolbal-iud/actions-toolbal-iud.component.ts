import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-actions-toolbal-iud',
  templateUrl: './actions-toolbal-iud.component.html',
  styleUrls: ['./actions-toolbal-iud.component.scss']
})
export class ActionsToolbalIudComponent implements OnInit {
  @Input() enableBtnInfo!: boolean;
  @Input() enableBtnEdit!: boolean;
  @Input() enableBtnDelete!: boolean;
  @Input() enableBtnPrivilege?: boolean=false ;

  @Output() info: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() privilege: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

   fireInfo() {
    this.info.emit();
  }

  fireEdit() {
    this.edit.emit();
  }

  fireDelete() {
    this.delete.emit();
  }

  firePrivilege() {
    this.privilege.emit();
  }

}
