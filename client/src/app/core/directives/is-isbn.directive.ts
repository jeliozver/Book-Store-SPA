// Decorators
import { Directive } from '@angular/core';

// Forms
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn
} from '@angular/forms';

// Validator
import isISBN from 'validator/lib/isISBN';

export const isIsbnValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const isControlIsbn = isISBN(control.value);
  return !isControlIsbn ? { 'isIsbn': false } : null;
};

@Directive({
  selector: '[appIsIsbn]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: IsIsbnDirective,
    multi: true
  }]
})
export class IsIsbnDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return isIsbnValidator(control);
  }
}
