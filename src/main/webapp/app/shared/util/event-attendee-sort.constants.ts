import { IEventAttendeeSortButtonInfo } from 'app/entities/event-attendee/event-attendee-sort-modal';

export const eventAttendeeSortButtonList: IEventAttendeeSortButtonInfo[] = [
  {
    buttonName: 'Sort By Id',
    buttonTranslateKey: 'clubmanagementApp.eventAttendee.sortBy.sortById',
    buttonSortProp: '',
    buttonOrderProp: ''
  },
  {
    buttonName: 'Older Year Session First',
    buttonTranslateKey: 'clubmanagementApp.eventAttendee.sortBy.sortByYearSessionAsc',
    buttonSortProp: 'yearSession',
    buttonOrderProp: 'asc'
  },
  {
    buttonName: 'Newer Year Session First',
    buttonTranslateKey: 'clubmanagementApp.eventAttendee.sortBy.sortByYearSessionDesc',
    buttonSortProp: 'yearSession',
    buttonOrderProp: 'desc'
  },
  {
    buttonName: 'Provide Transport First',
    buttonTranslateKey: 'clubmanagementApp.eventAttendee.sortBy.provideTransportFirst',
    buttonSortProp: 'provideTransport',
    buttonOrderProp: 'desc'
  },
  {
    buttonName: 'Does Not Provide Transport First',
    buttonTranslateKey: 'clubmanagementApp.eventAttendee.sortBy.noProvideTransportFirst',
    buttonSortProp: 'provideTransport',
    buttonOrderProp: 'asc'
  }
];
