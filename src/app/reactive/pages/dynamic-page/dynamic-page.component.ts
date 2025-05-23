import { CommonModule, JsonPipe} from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
imports: [
  CommonModule,
  JsonPipe,
  ReactiveFormsModule,
],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private fb: FormBuilder = inject(FormBuilder);
  public formUtils: typeof FormUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      this.fb.control('Metal Gear', Validators.required),
      this.fb.control('Valorant', Validators.required)
    ], Validators.minLength(2)),
  });

  newFavorite = new FormControl('', Validators.required)

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites() {
    if(this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));
    this.newFavorite.reset();
  }

  onDelete(i: number){
    if(!this.favoriteGames.controls[i]) return;
    this.favoriteGames.removeAt(i);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }
}
