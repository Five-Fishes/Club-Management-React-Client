import { ITabInfo } from 'app/shared/components/customTab/custom-tab';
import CCRole from '../model/enum/cc-role.enum';
import EventRole from '../model/enum/event-role.enum';

export const eventMainTabList: ITabInfo[] = [
  {
    tabName: 'Upcoming',
    tabTranslateKey: 'clubmanagementApp.event.upcoming',
    tabRoute: '/event/event',
    isPublic: true
  },
  {
    tabName: 'Previous',
    tabTranslateKey: 'clubmanagementApp.event.previous',
    tabRoute: '/entity/event?previous',
    isPublic: true
  }
];

export const eventTabList = (eventId: number): ITabInfo[] => [
  {
    tabName: 'Details',
    tabTranslateKey: 'clubmanagementApp.event.tab',
    tabRoute: `/entity/event/${eventId}`,
    isPublic: true
  },
  {
    tabName: 'Activities',
    tabTranslateKey: 'clubmanagementApp.eventActivity.tab',
    tabRoute: `/entity/event-activity/event/${eventId}`,
    ccRole: CCRole.ADMIN,
    eventRole: EventRole.CREW,
    eventId
  },
  {
    tabName: 'Checklist',
    tabTranslateKey: 'clubmanagementApp.eventChecklist.tab',
    tabRoute: `/entity/event-checklist/event/${eventId}`,
    ccRole: CCRole.ADMIN,
    eventRole: EventRole.CREW,
    eventId
  },
  {
    tabName: 'Budget',
    tabTranslateKey: 'clubmanagementApp.eventBudget.tab',
    tabRoute: `/entity/event-budget/event/${eventId}`,
    ccRole: CCRole.ADMIN,
    eventRole: EventRole.CREW,
    eventId
  },
  {
    tabName: 'Attendees',
    tabTranslateKey: 'clubmanagementApp.eventAttendee.tab',
    tabRoute: `/entity/event-attendee/event/${eventId}`,
    ccRole: CCRole.ADMIN,
    eventRole: EventRole.CREW,
    eventId
  },
  {
    tabName: 'Crews',
    tabTranslateKey: 'clubmanagementApp.eventCrew.tab',
    tabRoute: `/entity/event-crew/event/${eventId}`,
    ccRole: CCRole.ADMIN,
    eventRole: EventRole.CREW,
    eventId
  }
];

export const financeTabList: ITabInfo[] = [
  {
    tabName: 'Report',
    tabTranslateKey: 'clubmanagementApp.financeReport.tab',
    tabRoute: '/entity/finance-report',
    ccRole: CCRole.ADMIN
  },
  {
    tabName: 'All Transactions',
    tabTranslateKey: 'clubmanagementApp.transaction.tab',
    tabRoute: '/entity/transaction',
    ccRole: CCRole.ADMIN
  },
  {
    tabName: 'Members Debt',
    tabTranslateKey: 'clubmanagementApp.debt.tab',
    tabRoute: '/entity/debt',
    ccRole: CCRole.ADMIN
  },
  {
    tabName: 'CC Debt',
    tabTranslateKey: 'clubmanagementApp.claim.tab',
    tabRoute: '/entity/claim',
    ccRole: CCRole.ADMIN
  }
];
