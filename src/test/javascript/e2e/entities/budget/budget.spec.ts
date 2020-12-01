/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BudgetComponentsPage from './budget.page-object';
import { BudgetDeleteDialog } from './budget.page-object';
import BudgetUpdatePage from './budget-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Budget e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let budgetUpdatePage: BudgetUpdatePage;
  let budgetComponentsPage: BudgetComponentsPage;
  let budgetDeleteDialog: BudgetDeleteDialog;

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

  it('should load Budgets', async () => {
    await navBarPage.getEntityPage('budget');
    budgetComponentsPage = new BudgetComponentsPage();
    expect(await budgetComponentsPage.getTitle().getText()).to.match(/Budgets/);
  });

  it('should load create Budget page', async () => {
    await budgetComponentsPage.clickOnCreateButton();
    budgetUpdatePage = new BudgetUpdatePage();
    expect(await budgetUpdatePage.getPageTitle().getAttribute('id')).to.match(/clubmanagementApp.budget.home.createOrEditLabel/);
    await budgetUpdatePage.cancel();
  });

  it('should create and save Budgets', async () => {
    async function createBudget() {
      await budgetComponentsPage.clickOnCreateButton();
      await budgetUpdatePage.setEventIdInput('5');
      expect(await budgetUpdatePage.getEventIdInput()).to.eq('5');
      await budgetUpdatePage.setAmountInput('5');
      expect(await budgetUpdatePage.getAmountInput()).to.eq('5');
      await budgetUpdatePage.typeSelectLastOption();
      await budgetUpdatePage.setNameInput('name');
      expect(await budgetUpdatePage.getNameInput()).to.match(/name/);
      await budgetUpdatePage.setDetailsInput('details');
      expect(await budgetUpdatePage.getDetailsInput()).to.match(/details/);
      await waitUntilDisplayed(budgetUpdatePage.getSaveButton());
      await budgetUpdatePage.save();
      await waitUntilHidden(budgetUpdatePage.getSaveButton());
      expect(await budgetUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createBudget();
    await budgetComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await budgetComponentsPage.countDeleteButtons();
    await createBudget();

    await budgetComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await budgetComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Budget', async () => {
    await budgetComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await budgetComponentsPage.countDeleteButtons();
    await budgetComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    budgetDeleteDialog = new BudgetDeleteDialog();
    expect(await budgetDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/clubmanagementApp.budget.delete.question/);
    await budgetDeleteDialog.clickOnConfirmButton();

    await budgetComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await budgetComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
