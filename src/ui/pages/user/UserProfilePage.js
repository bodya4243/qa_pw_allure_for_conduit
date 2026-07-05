import { expect } from '@playwright/test';

export class UserProfilePage {
    constructor(page) {
        this.page = page;
        this.settingsButton = page.getByRole('link', { name: 'Edit Profile Settings', exact: false });
    }

    async open(username) {
        await this.page.goto(`/profile/${username}`);
    }

    async clickEditProfileSettings() {
        await this.settingsButton.click();
    }

    async assertUserNameChanged(changedUsername) {
        const userHeadline = this.page.locator('h4').filter({ hasText: changedUsername });
        await expect(userHeadline).toBeVisible();
    }
}
