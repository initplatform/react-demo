import type { Locator, Page } from '@playwright/test';

export class ChipWidget {
    readonly page: Page;
    readonly columnNameInput: Locator;
    readonly operatorSelectButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.columnNameInput = page.getByTestId('columnNameInput');
        this.operatorSelectButton = page.getByTestId('operatorSelectButton');
    }

    async goto() {
        await this.page.goto(`/chip-widget`);
    }

    waitFor = async () => {
        await this.page.waitForURL('/chip-widget');
    };

    rowCount = async (): Promise<number> => {
        return await this.page.locator('.pixar-table-body > tr').count();
    };

    operatorSelector = (nth: number): Locator => {
        return this.page.locator('.operator-selector').locator(`nth=${nth}`);
    };

    operatorName = (operatorName: string, nth: number): Locator => {
        return this.page.locator(`.operator-name-${operatorName}`).locator(`nth=${nth}`);
    };

    cell = (cellName: string, nth: number): Locator => {
        return this.page.locator(`.cell-${cellName}`).locator(`nth=${nth}`);
    };

    operatorInput = (nth: number): Locator => {
        return this.page.locator(`.operator-input`).locator(`nth=${nth}`);
    };

    operatorInputSelect = (nth: number): Locator => {
        return this.page.locator(`.operator-input-select`).locator(`nth=${nth}`);
    };

}
