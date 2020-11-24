/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EventAttendeeComponentsPage from './event-attendee.page-object';
import { EventAttendeeDeleteDialog } from './event-attendee.page-object';
import EventAttendeeUpdatePage from './event-attendee-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('EventAttendee e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let eventAttendeeUpdatePage: EventAttendeeUpdatePage;
  let eventAttendeeComponentsPage: EventAttendeeComponentsPage;
  let eventAttendeeDeleteDialog: EventAttendeeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load EventAttendees', async () => {
    await navBarPage.getEntityPage('event-attendee');
    eventAttendeeComponentsPage = new EventAttendeeComponentsPage();
    expect(await eventAttendeeComponentsPage.getTitle().getText()).to.match(/Event Attendees/);
  });

  it('should load create EventAttendee page', async () => {
    await eventAttendeeComponentsPage.clickOnCreateButton();
    eventAttendeeUpdatePage = new EventAttendeeUpdatePage();
    expect(await eventAttendeeUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /clubmanagementApp.eventAttendee.home.createOrEditLabel/
    );
    await eventAttendeeUpdatePage.cancel();
  });

  it('should create and save EventAttendees', async () => {
    async function createEventAttendee() {
      await eventAttendeeComponentsPage.clickOnCreateButton();
      await eventAttendeeUpdatePage.setUserIdInput('5');
      expect(await eventAttendeeUpdatePage.getUserIdInput()).to.eq('5');
      await eventAttendeeUpdatePage.setEventIdInput('5');
      expect(await eventAttendeeUpdatePage.getEventIdInput()).to.eq('5');
      const selectedProvideTransport = await eventAttendeeUpdatePage.getProvideTransportInput().isSelected();
      if (selectedProvideTransport) {
        await eventAttendeeUpdatePage.getProvideTransportInput().click();
        expect(await eventAttendeeUpdatePage.getProvideTransportInput().isSelected()).to.be.false;
      } else {
        await eventAttendeeUpdatePage.getProvideTransportInput().click();
        expect(await eventAttendeeUpdatePage.getProvideTransportInput().isSelected()).to.be.true;
      }
      await waitUntilDisplayed(eventAttendeeUpdatePage.getSaveButton());
      await eventAttendeeUpdatePage.save();
      await waitUntilHidden(eventAttendeeUpdatePage.getSaveButton());
      expect(await eventAttendeeUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createEventAttendee();
    await eventAttendeeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await eventAttendeeComponentsPage.countDeleteButtons();
    await createEventAttendee();

    await eventAttendeeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await eventAttendeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last EventAttendee', async () => {
    await eventAttendeeComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await eventAttendeeComponentsPage.countDeleteButtons();
    await eventAttendeeComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    eventAttendeeDeleteDialog = new EventAttendeeDeleteDialog();
    expect(await eventAttendeeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/clubmanagementApp.eventAttendee.delete.question/);
    await eventAttendeeDeleteDialog.clickOnConfirmButton();

    await eventAttendeeComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await eventAttendeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
