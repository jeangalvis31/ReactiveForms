import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils{




  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';


    static isValidField(form: FormGroup, fieldName: string): boolean | null{
        return(
            !!form.controls[fieldName].errors && form.controls[fieldName].touched
        );
    }

    static getTextErrors(errors: ValidationErrors){
        for(const key of Object.keys(errors)){
          switch(key){
            case 'required':
              return 'Este campo es requerido';
            case 'minlength':
              return `Minimo de ${errors['minlength'].requiredLength} caracteres`;
            case 'min':
              return `valor minimo de ${errors['min'].min}`;
            case 'noStrider':
              return `no se puede usar el username strider`
            case 'emailTaken':
              return `El correo electrónico ya esta en uso`
            case 'pattern':
              if(errors['pattern'].requiredPattern == FormUtils.emailPattern){
                return 'Correo electrónico no permitido';
              }else if(errors['pattern'].requiredPattern == FormUtils.notOnlySpacesPattern){
                return 'Nombre de usuario invalido.'
              }
              return 'Error de patron regex';
            case 'email':
              return `El valor ingresado no es un correo electrónico`;
            default :
              return `Error de validación no controlado`;
      
        }
    }
            return null
    }

    static getFieldError(form: FormGroup, fieldName: string): string | null {
    if(!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {}
    return this.getTextErrors(errors);
  }

      static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if(formArray.controls.length == 0) return null;

    const errors = formArray.controls[index].errors ?? {}
    return this.getTextErrors(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index : number){
    return (formArray.controls[index].errors && formArray.controls[index].touched)
  }

  static isFieldsEquals(field1: string, field2:string){
    return(formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value == field2Value ? null : {passwordNotEquals: true};
    }
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors|null>{
    await sleep();

    const formValue = control.value;
    if(formValue == "hola@mundo.com"){
      return{
        emailTaken: true,
      }
    }

    return null;
  }
  
  static notStrider(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    return value == 'strider' ? {noStrider: true} : null;
  }

}
  async function sleep() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 2500);
    })
  }



