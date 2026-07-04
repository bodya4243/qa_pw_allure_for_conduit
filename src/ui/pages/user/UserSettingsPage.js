import { expect, testStep } from '../../../common/helpers/pw';

export class UserSettingsPage {
    constructor(page, userId = 0) {
        this.page = page;
        this.userId = userId;
        this.profilePictureUrlField = page.getByPlaceholder('URL of profile picture');
        this.usernameField = page.getByPlaceholder('Username');
        this.bioField = page.getByPlaceholder('Short bio about you');
        this.emailField = page.getByPlaceholder('Email');
        this.passwordField = page.getByPlaceholder('New Password');
        this.updateSettingsButton = page.getByRole('button', {
            name: 'Update Settings',
        });
        this.logoutButton = page.getByRole('button', {
            name: 'Or click here to logout.',
        });
        this.errorMessage = page.getByRole('list').nth(1);
    }

    async step(title, stepToRun) {
        return await testStep(title, stepToRun, this.userId);
    }

    async open() {
        await this.step(`Open 'User Settings' page`, async () => {
            await this.page.goto('/settings');
        });
    }

    async fillProfilePictureUrlField(profilePictureUrl) {
        await this.step(`Fill the 'Profile picture URL' field`, async () => {
            await this.profilePictureUrlField.fill(profilePictureUrl);
        });
    }

    async fillUsernameField(username) {
        await this.step(`Fill the 'Username' field`, async () => {
            await this.usernameField.fill(username);
        });
    }

    async fillBioField(bio) {
        await this.step(`Fill the 'Bio' field`, async () => {
            await this.bioField.fill(bio);
        });
    }

    async fillEmailField(email) {
        await this.step(`Fill the 'Email' field`, async () => {
            await this.emailField.fill(email);
        });
    }

    async fillPasswordField(password) {
        await this.step(`Fill the 'Password' field`, async () => {
            await this.passwordField.fill(password);
        });
    }

    async clickUpdateSettingsButton() {
        await this.step(`Click the 'Update Settings' button`, async () => {
            await this.updateSettingsButton.click();
        });
    }

    async clickLogoutButton() {
        await this.step(`Click the 'Logout' button`, async () => {
            await this.logoutButton.click();
        });
    }

    async submitUserSettingsForm(userSettings) {
        await this.step(`Submit the 'User Settings' form`, async () => {
            if (userSettings.profilePictureUrl) {
                await this.fillProfilePictureUrlField(userSettings.profilePictureUrl);
            }

            if (userSettings.username) {
                await this.fillUsernameField(userSettings.username);
            }

            if (userSettings.bio) {
                await this.fillBioField(userSettings.bio);
            }

            if (userSettings.email) {
                await this.fillEmailField(userSettings.email);
            }

            if (userSettings.password) {
                await this.fillPasswordField(userSettings.password);
            }

            await this.clickUpdateSettingsButton();
        });
    }

    async assertProfilePictureUrlFieldHasValue(profilePictureUrl) {
        await this.step(`Assert the 'Profile picture URL' field has expected value`, async () => {
            await expect(this.profilePictureUrlField).toHaveValue(profilePictureUrl);
        });
    }

    async assertBioFieldHasValue(bio) {
        await this.step(`Assert the 'Bio' field has expected value`, async () => {
            await expect(this.bioField).toHaveValue(bio);
        });
    }

    async assertEmailFieldHasValue(email) {
        await this.step(`Assert the 'Email' field has expected value`, async () => {
            await expect(this.emailField).toHaveValue(email);
        });
    }

    async assertErrorMessageContainsText(messageText) {
        await this.step(`Assert the '${messageText}' error is shown`, async () => {
            await expect(this.errorMessage).toContainText(messageText);
        });
    }
}
