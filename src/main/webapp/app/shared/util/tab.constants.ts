import { ITabInfo } from 'app/shared/components/customTab/custom-tab';

export const eventTabList: ITabInfo[] = [
  {
    tabName: 'Details',
    tabTranslateKey: 'clubmanagementApp.event.tab',
    tabRoute: '/'
  },
  {
    tabName: 'Checklist',
    tabTranslateKey: 'clubmanagementApp.eventChecklist.tab',
    tabRoute: '/checklist'
  },
  {
    tabName: 'Budget',
    tabTranslateKey: 'clubmanagementApp.eventBudget.tab',
    tabRoute: '/budget'
  },
  {
    tabName: 'Attendees',
    tabTranslateKey: 'clubmanagementApp.eventAttendee.tab',
    tabRoute: '/attendees'
  },
  {
    tabName: 'Crews',
    tabTranslateKey: 'clubmanagementApp.eventCrew.tab',
    tabRoute: '/crews'
  }
];
