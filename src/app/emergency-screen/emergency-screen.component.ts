import { Component, OnInit, OnChanges, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormArray
} from '@angular/forms';

import { EmergencyScreen } from './../models/emergency-screen';
import { FormValues } from './../FormValues';
import { ParentGuardian } from './../models/parent-guardian';
import { ProfileService } from './../services/profile.service';
import { Child } from './../models/child';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emergency-screen',
  templateUrl: './emergency-screen.component.html',
  styleUrls: ['./emergency-screen.component.css']
})
export class EmergencyScreenComponent implements OnChanges, OnInit {
  public ScreenFormGroup: FormGroup;
  public formValues = new FormValues();
  public editingExisting = false;

  @Input() emergencyScreen: EmergencyScreen;
  @Input() formEditable: boolean;

  get parentGuardians(): FormArray {
    return this.ScreenFormGroup.get('parentGuardians') as FormArray;
  }

  get children(): FormArray {
    return this.ScreenFormGroup.get('children') as FormArray;
  }

  constructor(
    private _fb: FormBuilder,
    private _profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('onInit');
  }

  ngOnChanges() {
    if (this.emergencyScreen == null) {
      this.createNewForm();
    } else {
      console.log('Display existing form data');
      this.displayFormData(this.emergencyScreen);
    }

    this.changeFormEditability();
  }

  changeFormEditability() {
    if (this.formEditable) {
      this.ScreenFormGroup.enable();
    } else {
      this.ScreenFormGroup.disable();
    }
  }

  displayFormData(screen: EmergencyScreen) {
    this.ScreenFormGroup = this._fb.group({
      parentGuardians: this._fb.array([]),
      children: this._fb.array([]),
      FesaID: [screen.FesaID, Validators.required],
      ContactMethod: screen.ContactMethod,
      ScreenDate: screen.ScreenDate,
      GeneralNotes: screen.GeneralNotes,
      Unsheltered: screen.Unsheltered,
      PlaceToStay: screen.PlaceToStay,
      HotelMoney: screen.HotelMoney,
      HomelessLength: screen.HomelessLength,
      HomelessLengthType: screen.HomelessLengthType,
      CurrentLocation: screen.CurrentLocation,
      WhenToLeaveCurrent: screen.WhenToLeaveCurrent,
      YesterdayLocation: screen.YesterdayLocation,
      LeaveYesterdayLocationReason: screen.LeaveYesterdayLocationReason,
      Pregnancy: screen.Pregnancy,
      Pets: screen.Pets,
      PetType: screen.PetType,
      Disabilities: screen.Disabilities,
      DisabilitiesDescription: screen.DisabilitiesDescription,
      OtherMedicalNeeds: screen.OtherMedicalNeeds,
      OtherMedicalNeedsDescription: screen.OtherMedicalNeedsDescription,
      FleeingPartnerOrFamilyMember: screen.FleeingPartnerOrFamilyMember,
      CalledDomesticViolenceShelters: screen.CalledDomesticViolenceShelters,
      DomesticViolenceShelter: screen.DomesticViolenceShelter,
      StaffMember: screen.StaffMember,
      Phone: screen.Phone,
      Email: screen.Email
    });
    this.setGuardians(screen.ParentGuardians);
    this.setChildren(screen.Children);
  }

  createNewForm() {
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

    if (this.editingExisting) {
      this._profileService.updateProfile(this.emergencyScreen).subscribe(e => {
        console.log(e);
      });
    } else {
      this._profileService.createProfile(this.emergencyScreen).subscribe(e => {
        console.log(e);
      });
    }

    this.router.navigateByUrl(`/profile`).then(
      () => {
        this.router.navigateByUrl(`/profile/${this.emergencyScreen.FesaID}`);
      });
    }


  makeFormEditable() {
    this.editingExisting = true;
    this.formEditable = true;
    this.changeFormEditability();
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
    this.ScreenFormGroup.setControl('parentGuardians', guardiansFormArray);
  }

  setChildren(children: Child[]) {
    const childrenFGs = children.map(child => this._fb.group(child));
    const childrenFormArray = this._fb.array(childrenFGs);
    this.ScreenFormGroup.setControl('children', childrenFormArray);
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

    const guardians: ParentGuardian[] = formModel.parentGuardians.map(
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
