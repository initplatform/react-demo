import type { Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly taskListsLink: Locator;
    readonly chipWidgetLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.taskListsLink = page.getByTestId('taskListsLink');
        this.chipWidgetLink = page.getByTestId('chipWidgetLink');
    }

    async goto() {
        await this.page.goto(`/`);
    }

    waitFor = async () => {
        await this.page.waitForURL('/');
    };
}
