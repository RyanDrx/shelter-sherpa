import { ParentGuardian } from './parent-guardian';
import { Child } from './child';
import { isDate } from 'util';
import * as data from './testData.json';

export class EmergencyScreen {
  ParentGuardians: ParentGuardian[];
  Children: Child[];
  FesaID: string;
  ContactMethod: string;
  ScreenDate: Date;
  GeneralNotes: string;
  Unsheltered: boolean;
  PlaceToStay: boolean;
  HotelMoney: boolean;
  HomelessLength: number;
  HomelessLengthType: string;
  CurrentLocation: string;
  WhenToLeaveCurrent: string;
  YesterdayLocation: string;
  LeaveYesterdayLocationReason: string;
  Pregnancy: boolean;
  Pets: boolean;
  PetType: string;
  Disabilities: boolean;
  DisabilitiesDescription: string;
  OtherMedicalNeeds: boolean;
  OtherMedicalNeedsDescription: string;
  FleeingPartnerOrFamilyMember: boolean;
  CalledDomesticViolenceShelters: boolean;
  DomesticViolenceShelter: string;
  StaffMember: string;
  Phone: string;
  Email: string;
  Status: string;
}

export const emergencyScreens: EmergencyScreen[] = <any>data;
