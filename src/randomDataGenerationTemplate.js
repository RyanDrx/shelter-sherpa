[
  {
    'repeat(100)': {
      FesaID:
        '{{integer(100, 999)}}{{random("A","B","C","D","E","F","G","R","S","Z","Y","X","W","V")}}{{random("A","B","C","D","E","F","G","R","S","Z","Y","X","W","V")}}{{random("A","B","C","D","E","F","G","R","S","Z","Y","X","W","V")}}',
      ContactMethod: '{{random("phone", "email")}}',
      ScreenDate: '{{moment(this.date(new Date(2018, 0, 1))).format()}}',
      GeneralNotes: '{{lorem(2)}}',
      Unsheltered: '{{bool()}}',
      PlaceToStay: '{{bool()}}',
      HotelMoney: '{{bool()}}',
      HomelessLength: '{{integer(1, 35)}}',
      HomelessLengthType: '{{random("days", "weeks", "months")}}',
      CurrentLocation: '{{random("Shel;lter", "Car", "Hotel")}}',
      WhenToLeaveCurrent: '{{random("Now", "Tonight", "Tomorrow")}}',
      YesterdayLocation: '{{random("Shelter", "Car", "Hotel")}}',
      LeaveYesterdayLocationReason: '{{lorem(1)}}',
      Pregnancy: '{{bool()}}',
      Pets: '{{bool()}}',
      PetType: '{{random("Cat", "Dog")}}',
      Disabilities: '{{bool()}}',
      DisabilitiesDescription: '{{lorem(1)}}',
      OtherMedicalNeeds: '{{bool()}}',
      OtherMedicalNeedsDescription: '{{lorem(1)}}',
      FleeingPartnerOrFamilyMember: '{{bool()}}',
      CalledDomesticViolenceShelters: '{{bool()}}',
      DomesticViolenceShelter: '{{lorem(1)}}',
      StaffMember: 'Test Tester',
      Phone: '{{phone()}}',
      Status: '{{random("New", "Updated")}}',
      ParentGuardians: [

        {
          'repeat(1, 2)': {
          Gender: '{{random("male", "female")}}',
          LastName: '{{surname()}}',
          FirstName: function(tags, parent) {
             return tags.firstName(this.Gender);
          },
          MiddleName: function(tags, parent) {
             return tags.firstName(this.Gender);
          },
          MaidenNameAlias: '{{surname()}}',
          DOB:
            '{{moment(this.date(new Date(1970, 0, 1), new Date(2002, 0, 1) )).format()}}',
          Fesa: function(tags, parent) {
              return parent.FesaID;
            }
          }
        }
      ],
      Children: [
        {
          'repeat(1, 3)': {
            DOB: '{{moment(this.date(new Date(2004, 0, 1))).format()}}',
            Gender: '{{random("male", "female")}}',
            School: '{{lorem(1, "words")}}',
            FirstName: function(tags, parent) {
              return tags.firstName(this.Gender);
            },
            LastName: function(tags, parent) {
              return parent.ParentGuardians[0].LastName;
            },
            Fesa: function(tags, parent) {
              return parent.FesaID;
            }
          }
        }
      ],
      Email: function(tags) {
        return (
          this.ParentGuardians[0].LastName +
          '.' +
          this.ParentGuardians[0].FirstName +
          '@' +
          tags.company() +
          tags.domainZone()
        ).toLowerCase();
      }
    }
  }
]
