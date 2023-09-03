import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logic-detail',
  templateUrl: './logic-detail.component.html',
  styleUrls: ['./logic-detail.component.css']
})
export class LogicDetailComponent implements OnInit {
  @Input() item!: String; // decorate the property with @Input()
  @Input() color!: String;
  @Input() page!: String;

  constructor() { }

  ngOnInit(): void {
  }

}
