
import { expect, test as base } from '@playwright/test';
import { ChipWidget, HomePage } from '@pw/pages';


const test = base.extend<{
    homePage: HomePage;
    chipWidget: ChipWidget;
}>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    chipWidget: async ({ page }, use) => {
        await use(new ChipWidget(page));
    },
});


test.describe('# Chip Widget', () => {
    test('should navigate to /chip-widget', async ({ page, homePage, chipWidget }) => {
        await homePage.goto();
        await homePage.waitFor();
    
        await homePage.chipWidgetLink.click();
        await chipWidget.waitFor();
    });    

    test('should filter by Movie', async ({ page, chipWidget }) => {
        await chipWidget.goto();
        await chipWidget.waitFor();

        await chipWidget.columnNameInput.fill('mov');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.keyboard.type('toy');

        await page.waitForTimeout(300);

        expect(await chipWidget.rowCount()).toBe(3);
        
    });

    test('should sort by First Name', async ({ page, chipWidget }) => {
        await chipWidget.goto();
        await chipWidget.waitFor();

        await chipWidget.columnNameInput.fill('fir');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');

        await chipWidget.operatorSelector(0).click();
        await chipWidget.operatorName('sort', 0).click();
        
        expect(await chipWidget.cell('first-name', 0).textContent()).toBe('Alfredo');
        expect(await chipWidget.cell('first-name', -1).textContent()).toBe('Woody');

        await chipWidget.operatorInputSelect(0).selectOption('Desc');
        await page.waitForTimeout(300);

        expect(await chipWidget.cell('first-name', 0).textContent()).toBe('Woody');
        expect(await chipWidget.cell('first-name', -1).textContent()).toBe('Alfredo');

    });

    test('should filter by Age', async ({ page, chipWidget }) => {
        await chipWidget.goto();
        await chipWidget.waitFor();

        await chipWidget.columnNameInput.fill('age');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');

        await chipWidget.operatorSelector(0).click();
        await chipWidget.operatorName('lessThan', 0).click();
        await page.keyboard.press('Tab');
        await page.keyboard.type('30');

        await page.waitForTimeout(300);
        expect(await chipWidget.rowCount()).toBe(14);

        await chipWidget.operatorSelector(0).click();
        await chipWidget.operatorName('greaterThan', 0).click();
        
        await page.waitForTimeout(300);
        expect(await chipWidget.rowCount()).toBe(15);

        await chipWidget.operatorSelector(0).click();
        await chipWidget.operatorName('equals', 0).click();
        
        await page.waitForTimeout(300);
        expect(await chipWidget.rowCount()).toBe(1);

        await chipWidget.operatorSelector(0).click();
        await chipWidget.operatorName('notEquals', 0).click();
        
        await page.waitForTimeout(300);
        expect(await chipWidget.rowCount()).toBe(29);

    });


    test('should stack filters', async ({ page, chipWidget }) => {
        await chipWidget.goto();
        await chipWidget.waitFor();

        await chipWidget.columnNameInput.fill('mov');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.keyboard.type('toy');

        await page.waitForTimeout(300);

        expect(await chipWidget.rowCount()).toBe(3);

        await chipWidget.columnNameInput.fill('first');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await page.keyboard.type('wood');

        await page.waitForTimeout(300);

        expect(await chipWidget.rowCount()).toBe(1);

    });

})

