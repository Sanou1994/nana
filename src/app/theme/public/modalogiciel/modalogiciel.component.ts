import { Logiciel } from './../../../models/logiciel';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modalogiciel',
  templateUrl: './modalogiciel.component.html',
  styleUrls: ['./modalogiciel.component.css']
})
export class ModalogicielComponent implements OnInit {

@Input() logiciel : Logiciel | undefined
@Output() close: EventEmitter<String>=new EventEmitter<String>()

  constructor() { }

  ngOnInit(): void {
  }
  closeModal(){
    this.close.emit()
  }
  

  
}
