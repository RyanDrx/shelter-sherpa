import { Component, OnInit, OnChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormArray
} from '@angular/forms';

import { EmergencyScreen } from '../models/emergency-screen';
import { FormValues } from './../FormValues';
import { ParentGuardian } from './../models/parent-guardian';
import { ProfileService } from './../services/profile.service';
import { Child } from './../models/child';

@Component({
  selector: 'app-emergency-screen',
  templateUrl: './emergency-screen.component.html',
  styleUrls: ['./emergency-screen.component.css']
})
export class EmergencyScreenComponent implements OnChanges {
  public isLinear = false;
  public ScreenFormGroup: FormGroup;
  public emergencyScreen: EmergencyScreen;
  public formValues = new FormValues();

  get parentGuardians(): FormArray {
    return this.ScreenFormGroup.get('parentGuardians') as FormArray;
  }

  get children(): FormArray {
    return this.ScreenFormGroup.get('children') as FormArray;
  }

  public dateNow = new Date();

  constructor(
    private _fb: FormBuilder,
    private _profileService: ProfileService
  ) {
    this.createForm();
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  createForm() {
    this.ScreenFormGroup = this._fb.group({
      parentGuardians: this._fb.array([]),
      children: this._fb.array([]),
      FesaID: ['', Validators.required],
      ContactMethod: '',
      ScreenDate: new Date(),
      GeneralNotes: '',
      Unsheltered: false,
      PlaceToStay: false,
      HotelMoney: false,
      HomelessLength: 0,
      HomelessLengthType: 'days',
      CurrentLocation: '',
      WhenToLeaveCurrent: '',
      YesterdayLocation: '',
      LeaveYesterdayLocationReason: '',
      Pregnancy: false,
      Pets: false,
      PetType: '',
      Disabilities: false,
      DisabilitiesDescription: '',
      OtherMedicalNeeds: false,
      OtherMedicalNeedsDescription: '',
      FleeingPartnerOrFamilyMember: false,
      CalledDomesticViolenceShelters: false,
      DomesticViolenceShelter: '',
      StaffMember: '',
      Phone: '',
      Email: ''
    });
    this.addGuardian();
  }

  onSubmit() {
    this.emergencyScreen = this.prepareEmergencyScreen();
    this._profileService.createProfile(this.emergencyScreen).subscribe(e => {
      console.log(e);
    });

    this.rebuildForm();
  }

  addGuardian() {
    this.parentGuardians.push(this._fb.group(new ParentGuardian()));
  }

  addChild() {
    this.children.push(this._fb.group(new Child()));
  }

  setGuardians(guardians: ParentGuardian[]) {
    const guardiansFGs = guardians.map(guardian => this._fb.group(guardian));
    const guardiansFormArray = this._fb.array(guardiansFGs);
    this.ScreenFormGroup.setControl('Guardians', guardiansFormArray);
  }

  setChildren(children: Child[]) {
    const childrenFGs = children.map(child => this._fb.group(child));
    const childrenFormArray = this._fb.array(childrenFGs);
    this.ScreenFormGroup.setControl('Children', childrenFormArray);
  }

  rebuildForm() {
    this.ScreenFormGroup.reset();
    this.setGuardians([new ParentGuardian()]);
    console.log('rebuild form');
  }

  revert() {
    this.rebuildForm();
  }

  prepareEmergencyScreen(): EmergencyScreen {
    const formModel = this.ScreenFormGroup.value;

    const guardians: ParentGuardian[] = formModel.guardians.map(
      (parentGuardian: ParentGuardian) => Object.assign({}, parentGuardian)
    );

    const children: Child[] = formModel.children.map((child: Child) =>
      Object.assign({}, child)
    );

    const saveEmergencyScreen: EmergencyScreen = {
      FesaID: formModel.FesaID,
      ContactMethod: formModel.ContactMethod as string,
      ScreenDate: formModel.ScreenDate,
      GeneralNotes: formModel.GeneralNotes,
      ParentGuardians: guardians,
      Children: children,
      Unsheltered: formModel.Unsheltered,
      PlaceToStay: formModel.PlaceToStay,
      HotelMoney: formModel.HotelMoney,
      HomelessLength: formModel.HomelessLength,
      HomelessLengthType: formModel.HomelessLengthType,
      CurrentLocation: formModel.CurrentLocation,
      WhenToLeaveCurrent: formModel.WhenToLeaveCurrent,
      YesterdayLocation: formModel.YesterdayLocation,
      LeaveYesterdayLocationReason: formModel.LeaveYesterdayLocationReason,
      Pregnancy: formModel.Pregnancy,
      Pets: formModel.Pets,
      PetType: formModel.PetType,
      Disabilities: formModel.Disabilities,
      DisabilitiesDescription: formModel.DisabilitiesDescription,
      OtherMedicalNeeds: formModel.OtherMedicalNeeds,
      OtherMedicalNeedsDescription: formModel.OtherMedicalNeedsDescription,
      FleeingPartnerOrFamilyMember: formModel.FleeingPartnerOrFamilyMember,
      CalledDomesticViolenceShelters: formModel.CalledDomesticViolenceShelters,
      DomesticViolenceShelter: formModel.DomesticViolenceShelter,
      StaffMember: formModel.StaffMember,
      Phone: formModel.Phone,
      Email: formModel.Email,
      Status: 'Updated'
    };

    return saveEmergencyScreen;
  }
}
