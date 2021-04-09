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
    buttonSortProp: 'year_session',
    buttonOrderProp: 'asc'
  },
  {
    buttonName: 'Newer Year Session First',
    buttonTranslateKey: 'clubmanagementApp.eventAttendee.sortBy.sortByYearSessionDesc',
    buttonSortProp: 'year_session',
    buttonOrderProp: 'desc'
  },
  {
    buttonName: 'Provide Transport First',
    buttonTranslateKey: 'clubmanagementApp.eventAttendee.sortBy.provideTransportFirst',
    buttonSortProp: 'provide_transport',
    buttonOrderProp: 'desc'
  },
  {
    buttonName: 'Does Not Provide Transport First',
    buttonTranslateKey: 'clubmanagementApp.eventAttendee.sortBy.noProvideTransportFirst',
    buttonSortProp: 'provide_transport',
    buttonOrderProp: 'asc'
  }
];
