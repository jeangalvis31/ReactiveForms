import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent { }
