describe('Login', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {});

  it('should toggle the theme', async () => {
    await waitFor(element(by.id('theme-switch')))
      .toBeVisible()
      .withTimeout(15000);
    await expect(element(by.id('theme-switch'))).toHaveToggleValue(false);
    await element(by.id('theme-switch')).tap();
    await expect(element(by.id('theme-switch'))).toHaveToggleValue(true);
  });

  it('should test login screen', async () => {
    await expect(element(by.id('welcome-message'))).toExist();
    await expect(element(by.id('username'))).toExist();
    await expect(element(by.id('password'))).toExist();
    await expect(element(by.id('login-button'))).toExist();

    await element(by.id('username')).typeText('mountebankuser');
    await element(by.id('username')).tapReturnKey();
    await element(by.id('password')).typeText('mounte@123');
    await element(by.id('password')).tapReturnKey();
    //  await element(by.id('login')).tap();

    // await waitFor(element(by.id('home'))).toBeVisible();
    // await waitFor(element(by.id('welcome-user'))).toBeVisible();
    // await waitFor(element(by.id('logout'))).toBeVisible();

    // await element(by.id('logout')).tap();
    // await waitFor(element(by.id('welcome-message'))).toBeVisible();
    // await waitFor(element(by.id('username'))).toBeVisible();
  });
});
