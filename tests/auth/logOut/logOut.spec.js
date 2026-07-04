import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ user, page }) => {
    await signUpUser(page, user);
});

test('logOut', async ({userSettingsPage, userProfilePage, user, homePage}) => {
    await userProfilePage.open(user.username)
    await userProfilePage.clickEditProfileSettings()

    await userSettingsPage.clickLogoutButton();

    await homePage.assertGlobalFeedTabIsVisible()
})