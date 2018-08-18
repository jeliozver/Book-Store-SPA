// Decorators
import { Directive } from '@angular/core';

// Forms
import {
  AbstractControl,
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn
} from '@angular/forms';

export const mustMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPasssword = control.get('confirmPassword');

  return password && confirmPasssword && password.value !== confirmPasssword.value ? { 'mustMatch': true } : null;
};

@Directive({
  selector: '[appMustMatch]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MustMatchDirective,
    multi: true
  }]
})
export class MustMatchDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return mustMatchValidator(control);
  }
}
