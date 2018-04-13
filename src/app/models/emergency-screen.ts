import { ParentGuardian } from './parent-guardian';
import { Child } from './child';
import { isDate } from 'util';

export class EmergencyScreen {
  public ParentGuardians: ParentGuardian[];
  public Children: Child[];
  public FesaID = '';
  public ScreenDate: Date = new Date;
  public ContactMethod = '';
  // public Unsheltered: boolean;
  // public PlaceToStay: boolean;
  // public HotelMoney: boolean;
  // public HomelessInDays: number;
  // public CurrentLocation: string;
  // public YesterdayLocation: string;
  // public Pregnancy: boolean;
  // public Pets: boolean;
  // public PetType: string;
  // public Disabilities: boolean;
  // public DisabilitiesDescription: string;
  // public OtherMedicalNeeds: string;
  // public FleeingPartnerOrFamilyMember: boolean;
  // public CalledDomesticViolenceShelters: boolean;
  // public DomesticViolenceDetails: string;
  public GeneralNotes: string;
}
