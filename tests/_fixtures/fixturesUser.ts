import { test as base } from '@playwright/test';
import {UserProfilePage} from '../../src/ui/pages/user/UserProfilePage'
import {UserSettingsPage} from '../../src/ui/pages/user/UserSettingsPage'

export const test = base.extend<{
    userProfilePage,
    userSettingsPage,
}>(
    {
        userProfilePage: async ({page}, use) => {
            const userProfilePage = new UserProfilePage(page)

            await use(userProfilePage)
        },
        userSettingsPage: async ({page}, use) => {
            const userSettingsPage = new UserSettingsPage(page)

            await use(userSettingsPage)
        }
    }
)