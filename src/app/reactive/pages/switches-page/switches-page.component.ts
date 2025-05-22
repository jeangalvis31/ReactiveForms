import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-switches-page',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent { }
