import { ParentGuardian } from './parent-guardian';
import { Child } from './child';
import { isDate } from 'util';

export class EmergencyScreen {
  public ParentGuardians: ParentGuardian[];
  public Children: Child[];
  public FesaID = '';
  public ScreenDate: Date = new Date();
  public ContactMethod = '';
  public GeneralNotes: string;

  public Phone: string;
  public Email: string;
  public Unsheltered: boolean;
  public PlaceToStay: boolean;
  public HotelMoney: boolean;
  public HomelessLength: number;
  public HomelessLengthType: string;
  public CurrentLocation: string;
  public WhenToLeaveCurrent: string;
  public YesterdayLocation: string;
  public LeaveYesterdayLocationReason: string;
  public Pregnancy: boolean;
  public Pets: boolean;
  public PetType: string;
  public Disabilities: boolean;
  public DisabilitiesDescription: string;
  public OtherMedicalNeeds: boolean;
  public OtherMedicalNeedsDescription: string;
  public FleeingPartnerOrFamilyMember: boolean;
  public CalledDomesticViolenceShelters: boolean;
  public DomesticViolenceShelter: string;
  public StaffMember: string;

  public Status = 'New';
}

export const emergencyScreens: EmergencyScreen[] = [];
