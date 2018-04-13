export class FormValues {
  public contactMethods = [
    { value: 'phone', viewValue: 'Phone' },
    { value: 'email', viewValue: 'Email' },
    { value: 'person', viewValue: 'In Person' }
  ];

  public YesNo = [
    { value: true, viewValue: 'Yes' },
    { value: false, viewValue: 'No' }
  ];

  public lengthType = [
    { value: 'days', viewValue: 'Days' },
    { value: 'weeks', viewValue: 'Weeks' },
    { value: 'months', viewValue: 'Months' },
    { value: 'years', viewValue: 'Years' },
  ];
}
