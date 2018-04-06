
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { EmergencyScreen } from '../models/emergency-screen';
import { FormValues } from './../FormValues';


@Component({
  selector: 'app-emergency-screen',
  templateUrl: './emergency-screen.component.html',
  styleUrls: ['./emergency-screen.component.css']
})
export class EmergencyScreenComponent {
  public isLinear = false;
  public ScreenFormGroup: FormGroup;
  public emergencyScreen: EmergencyScreen;
  public formValues = new FormValues();

  get formArray(): AbstractControl | null {
    return this.ScreenFormGroup.get('formArray');
  }
  public dateNow = new Date();


  constructor(private _formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.ScreenFormGroup = this._formBuilder.group({
      FesaID: ['', Validators.required],
      ContactMethod: '',
      ScreenDate: '',
      GeneralNotes: ''
      // Guardians: this._formBuilder.group({
      //   LastName: '',
      //   FirstName: '',
      //   MiddleName: '',
      //   MaidenName: '',
      //   Alias: '',
      //   DOB: '',
      //   Gender: ''
      // })
    });
  }

  onSubmit() {
    this.emergencyScreen = this.prepareEmergencyScreen();
    // this.screenService.updateHero(this.emergencyScreen).subscribe(/* error handling */);
    this.rebuildForm();
  }
  rebuildForm() {
    this.ScreenFormGroup.reset({
      FesaID: ''
    });
  }

  revert() {
    this.rebuildForm();
  }

  prepareEmergencyScreen(): EmergencyScreen {
    const formModel = this.ScreenFormGroup.value;

    // deep copy of form model
    // const children: Child[] = formModel.guardians.map((child: Child) =>
    //   Object.assign({}, Child)
    // );

    // // deep copy of form model
    // const guardians: ParentGuardian[] = formModel.guardians.map(
    //   (parentGuardian: ParentGuardian) => Object.assign({}, parentGuardian)
    // );

    const saveEmergencyScreen: EmergencyScreen = {
      FesaID: formModel.FesaID,
      ContactMethod: formModel.ContactMethod as string,
      ScreenDate: formModel.ScreenDate,
      // Guardians: guardians,
      // Children: children,
      GeneralNotes: formModel.GeneralNotes
    };

    return saveEmergencyScreen;
  }
}
