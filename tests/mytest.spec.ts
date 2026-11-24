import { expect, test, type Page } from '@playwright/test';

// Sauce Demo-ийн нэвтрэх хуудсанд өгсөн жишээ хэрэглэгч.
const username = 'standard_user';
const password = 'secret_sauce';

async function signIn(page: Page, suppliedPassword: string) {
  await page.getByTestId('username').fill(username);
  await page.getByTestId('password').fill(suppliedPassword);
  await page.getByRole('button', { name: 'Login', exact: true }).click();
}

async function expectInventory(page: Page) {
  await expect(page).toHaveURL('/inventory.html');
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
}

async function signOut(page: Page) {
  // Цэсээр гараад нэвтрэх хуудас руу буцсаныг шалгана.
  await page.getByRole('button', { name: 'Open Menu', exact: true }).click();
  await page.getByTestId('logout-sidebar-link').click();
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeVisible();
}

test.beforeEach(async ({ page }) => {
  // Тест бүр өөрийн браузерийн context-той, анхны хуудаснаас эхэлнэ.
  await page.goto('/');
});

test('Зөв нууц үгээр нэвтэрч барааны жагсаалтыг харна', async ({ page }) => {
  await signIn(page, password);
  await expectInventory(page);
  await signOut(page);
});

test('Буруу нууц үгээр нэвтрэхэд алдаа харуулна', async ({ page }) => {
  await signIn(page, 'wrong_password');
  const errorMessage = page.getByTestId('error');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(
    'Epic sadface: Username and password do not match any user in this service',
  );
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeVisible();

  // Алдааг шалгасны дараа зөв нэвтэрч, бусад тестийн адил цэсээр гарна.
  await signIn(page, password);
  await expectInventory(page);
  await signOut(page);
});

test('Сонгосон бараа сагсанд нэг ширхгээр нэмэгдэнэ', async ({ page }) => {
  const itemName = 'Sauce Labs Bike Light';
  await signIn(page, password);
  await expectInventory(page);

  // Сагс хоосон эхэлж, зөвхөн сонгосон бараанд үйлдэл хийнэ.
  await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);
  const item = page.getByTestId('inventory-item').filter({
    has: page.getByText(itemName, { exact: true }),
  });
  await item.getByRole('button', { name: 'Add to cart', exact: true }).click();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  await page.getByTestId('shopping-cart-link').click();

  await expect(page).toHaveURL('/cart.html');
  await expect(page.getByTestId('inventory-item-name')).toHaveText(itemName);
  await expect(page.getByTestId('item-quantity')).toHaveText('1');
  await page.getByRole('button', { name: 'Continue Shopping', exact: true }).click();
  await expectInventory(page);
  await signOut(page);
});
