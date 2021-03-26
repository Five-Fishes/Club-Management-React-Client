import { ITabInfo } from 'app/shared/components/customTab/custom-tab';

export const eventMainTabList: ITabInfo[] = [
  {
    tabName: 'Upcoming',
    tabTranslateKey: 'clubmanagementApp.event.upcoming',
    tabRoute: '/event/upcoming'
  },
  {
    tabName: 'Previous',
    tabTranslateKey: 'clubmanagementApp.event.previous',
    tabRoute: '/event/previous'
  }
];

export const eventTabList: ITabInfo[] = [
  {
    tabName: 'Details',
    tabTranslateKey: 'clubmanagementApp.event.tab',
    tabRoute: '/event'
  },
  {
    tabName: 'Timeline',
    tabTranslateKey: 'clubmanagementApp.eventActivity.tab',
    tabRoute: '/activites'
  },
  {
    tabName: 'Checklist',
    tabTranslateKey: 'clubmanagementApp.eventChecklist.tab',
    tabRoute: '/event/checklist'
  },
  {
    tabName: 'Budget',
    tabTranslateKey: 'clubmanagementApp.eventBudget.tab',
    tabRoute: '/event/budget'
  },
  {
    tabName: 'Attendees',
    tabTranslateKey: 'clubmanagementApp.eventAttendee.tab',
    tabRoute: '/event/attendees'
  },
  {
    tabName: 'Crews',
    tabTranslateKey: 'clubmanagementApp.eventCrew.tab',
    tabRoute: '/event/crews'
  }
];
