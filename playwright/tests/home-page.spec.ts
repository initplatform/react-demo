import { expect, test as base } from '@playwright/test';
import { HomePage } from '@pw/pages';

const test = base.extend<{
    homePage: HomePage;
}>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
});

test.describe('# Chip Widget', () => {
    test('should have title', async ({ page, homePage }) => {
        await homePage.goto();
        await expect(page).toHaveTitle(/Sam Artioli React Demo/);
    });
});
