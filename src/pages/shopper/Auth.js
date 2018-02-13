/**
 * Created by korman on 12.02.18.
 */

export default class Auth
{
    checkAuth() {
        const user = JSON.parse(window.localStorage.getItem('user'));

        if (!user) {
            window.location = '/';
        }

        if (user && user.role != 'ROLE_SHOPPER') {
            window.location = '/';
        }
    }
}