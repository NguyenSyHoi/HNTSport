import { FormGroup } from "@angular/forms";

export function ConfirmedValidator(oldPassword: string, newPassword: string, confirmPassWord: string) {
  return (formGroup: FormGroup) => {
    const oldPass = formGroup.controls[oldPassword];
    const newPass = formGroup.controls[newPassword];
    const confirmPass = formGroup.controls[confirmPassWord];
    if (newPass.value && confirmPass.value && (newPass.value !== confirmPass.value)) {
      confirmPass.setErrors({ confirmedValidator: true });
    } else if (newPass.value && oldPass.value && (newPass.value === oldPass.value)) {
      newPass.setErrors({ notSame: true });
    }
  }
}
export function ConfirmPassword(newPassword: string, confirmPassWord: string) {
  return (formGroup: FormGroup) => {
    const newPass = formGroup.controls[newPassword];
    const confirmPass = formGroup.controls[confirmPassWord];
    if (newPass.value && confirmPass.value && (newPass.value !== confirmPass.value)) {
      confirmPass.setErrors({ confirmedValidator: true });
    } else {
      confirmPass.setErrors(null);
    }
  }
}
