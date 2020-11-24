/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EventComponentsPage from './event.page-object';
import { EventDeleteDialog } from './event.page-object';
import EventUpdatePage from './event-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Event e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let eventUpdatePage: EventUpdatePage;
  let eventComponentsPage: EventComponentsPage;
  let eventDeleteDialog: EventDeleteDialog;

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

  it('should load Events', async () => {
    await navBarPage.getEntityPage('event');
    eventComponentsPage = new EventComponentsPage();
    expect(await eventComponentsPage.getTitle().getText()).to.match(/Events/);
  });

  it('should load create Event page', async () => {
    await eventComponentsPage.clickOnCreateButton();
    eventUpdatePage = new EventUpdatePage();
    expect(await eventUpdatePage.getPageTitle().getAttribute('id')).to.match(/clubmanagementApp.event.home.createOrEditLabel/);
    await eventUpdatePage.cancel();
  });

  it('should create and save Events', async () => {
    async function createEvent() {
      await eventComponentsPage.clickOnCreateButton();
      await eventUpdatePage.setNameInput('name');
      expect(await eventUpdatePage.getNameInput()).to.match(/name/);
      await eventUpdatePage.setDescriptionInput('description');
      expect(await eventUpdatePage.getDescriptionInput()).to.match(/description/);
      await eventUpdatePage.setRemarksInput('remarks');
      expect(await eventUpdatePage.getRemarksInput()).to.match(/remarks/);
      await eventUpdatePage.setVenueInput('venue');
      expect(await eventUpdatePage.getVenueInput()).to.match(/venue/);
      await eventUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await eventUpdatePage.getStartDateInput()).to.contain('2001-01-01T02:30');
      await eventUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await eventUpdatePage.getEndDateInput()).to.contain('2001-01-01T02:30');
      await eventUpdatePage.setFeeInput('5');
      expect(await eventUpdatePage.getFeeInput()).to.eq('5');
      const selectedRequiredTransport = await eventUpdatePage.getRequiredTransportInput().isSelected();
      if (selectedRequiredTransport) {
        await eventUpdatePage.getRequiredTransportInput().click();
        expect(await eventUpdatePage.getRequiredTransportInput().isSelected()).to.be.false;
      } else {
        await eventUpdatePage.getRequiredTransportInput().click();
        expect(await eventUpdatePage.getRequiredTransportInput().isSelected()).to.be.true;
      }
      await eventUpdatePage.statusSelectLastOption();
      await eventUpdatePage.setImageUrlInput('imageUrl');
      expect(await eventUpdatePage.getImageUrlInput()).to.match(/imageUrl/);
      await eventUpdatePage.setFileNameInput('fileName');
      expect(await eventUpdatePage.getFileNameInput()).to.match(/fileName/);
      await eventUpdatePage.setFileTypeInput('fileType');
      expect(await eventUpdatePage.getFileTypeInput()).to.match(/fileType/);
      await waitUntilDisplayed(eventUpdatePage.getSaveButton());
      await eventUpdatePage.save();
      await waitUntilHidden(eventUpdatePage.getSaveButton());
      expect(await eventUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createEvent();
    await eventComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await eventComponentsPage.countDeleteButtons();
    await createEvent();

    await eventComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await eventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Event', async () => {
    await eventComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await eventComponentsPage.countDeleteButtons();
    await eventComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    eventDeleteDialog = new EventDeleteDialog();
    expect(await eventDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/clubmanagementApp.event.delete.question/);
    await eventDeleteDialog.clickOnConfirmButton();

    await eventComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await eventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
