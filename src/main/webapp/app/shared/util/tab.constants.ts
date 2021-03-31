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

export const eventTabList = (eventId: string): ITabInfo[] => [
  {
    tabName: 'Details',
    tabTranslateKey: 'clubmanagementApp.event.tab',
    tabRoute: `/entity/event/${eventId}`
  },
  {
    tabName: 'Activities',
    tabTranslateKey: 'clubmanagementApp.eventActivity.tab',
    tabRoute: `/entity/event-activity/event/${eventId}`
  },
  {
    tabName: 'Timeline',
    tabTranslateKey: 'clubmanagementApp.eventActivity.tab',
    tabRoute: '/activites'
  },
  {
    tabName: 'Checklist',
    tabTranslateKey: 'clubmanagementApp.eventChecklist.tab',
    tabRoute: `/entity/event-checklist/event/${eventId}`
  },
  {
    tabName: 'Activities',
    tabTranslateKey: 'clubmanagementApp.eventActivity.tab',
    tabRoute: '/entity/event-activity/event/1'
  },
  {
    tabName: 'Budget',
    tabTranslateKey: 'clubmanagementApp.eventBudget.tab',
    tabRoute: `/entity/event-budget/event/${eventId}`
  },
  {
    tabName: 'Attendees',
    tabTranslateKey: 'clubmanagementApp.eventAttendee.tab',
    tabRoute: `/entity/event-attendee/event/${eventId}`
  },
  {
    tabName: 'Crews',
    tabTranslateKey: 'clubmanagementApp.eventCrew.tab',
    tabRoute: `/entity/event-crew/event/${eventId}`
  }
];
