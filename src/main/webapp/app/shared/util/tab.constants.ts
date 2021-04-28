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

export const eventTabList = (eventId: number): ITabInfo[] => [
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
    tabName: 'Checklist',
    tabTranslateKey: 'clubmanagementApp.eventChecklist.tab',
    tabRoute: `/entity/event-checklist/event/${eventId}`
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

export const financeTabList: ITabInfo[] = [
  {
    tabName: 'Report',
    tabTranslateKey: 'clubmanagementApp.financeReport.tab',
    tabRoute: '/entity/finance-report'
  },
  {
    tabName: 'All Transactions',
    tabTranslateKey: 'clubmanagementApp.transaction.tab',
    tabRoute: '/entity/transaction'
  },
  {
    tabName: 'Members Debt',
    tabTranslateKey: 'clubmanagementApp.debt.tab',
    tabRoute: '/entity/debt'
  },
  {
    tabName: 'CC Debt',
    tabTranslateKey: 'clubmanagementApp.claim.tab',
    tabRoute: '/entity/claim'
  }
];
