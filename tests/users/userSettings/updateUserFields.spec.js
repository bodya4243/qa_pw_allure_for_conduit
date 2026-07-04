import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ user, page }) => {
    await signUpUser(page, user);
});

test('update username from user settings', async ({ user, userProfilePage, userSettingsPage }) => {
    await userProfilePage.open(user.username);

    const updatedUserName = `updated_${user.username}`.slice(0, 40);

    await userProfilePage.clickEditProfileSettings();
    await userSettingsPage.submitUserSettingsForm({ username: updatedUserName });

    await userProfilePage.assertUserNameChanged(updatedUserName);
});

test('update email from user settings', async ({ user, userProfilePage, userSettingsPage }) => {
    await userProfilePage.open(user.username);

    const updatedEmail = `updated_${user.email}`;

    await userProfilePage.clickEditProfileSettings();
    await userSettingsPage.submitUserSettingsForm({ email: updatedEmail });
    await userProfilePage.clickEditProfileSettings();

    await userSettingsPage.assertEmailFieldHasValue(updatedEmail);
});

test('update password from user settings', async ({
    user,
    userProfilePage,
    userSettingsPage,
    signInPage,
    homePage,
}) => {
    await userProfilePage.open(user.username);

    const updatedPassword = 'UpdatedPassword123!';

    await userProfilePage.clickEditProfileSettings();
    await userSettingsPage.submitUserSettingsForm({ password: updatedPassword });
    await userSettingsPage.open();
    await userSettingsPage.clickLogoutButton();

    await signInPage.open();
    await signInPage.submitSignInForm({
        email: user.email,
        password: updatedPassword,
    });

    await homePage.assertYourFeedTabIsVisible();
});

test('add profile picture URL', async ({ user, userProfilePage, userSettingsPage }) => {
    await userProfilePage.open(user.username);

    const pictureUrl = 'https://exmaple.com';

    await userProfilePage.clickEditProfileSettings();
    await userSettingsPage.submitUserSettingsForm({ profilePictureUrl: pictureUrl });

    await userSettingsPage.assertProfilePictureUrlFieldHasValue(pictureUrl);
});

test('add short bio', async ({ user, userProfilePage, userSettingsPage }) => {
    await userProfilePage.open(user.username);

    const bio = 'some text just to fill in this field which called bio.';

    await userProfilePage.clickEditProfileSettings();
    await userSettingsPage.submitUserSettingsForm({ bio: bio });

    await userSettingsPage.assertBioFieldHasValue(bio)
});
