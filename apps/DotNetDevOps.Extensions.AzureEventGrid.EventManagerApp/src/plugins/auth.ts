
import Vue from 'vue'
//import * as oidc from "oidc-client";


export interface IUserManager {
    setAppUser(user: IUser);
    getAppUser(): IUser | PromiseLike<IUser | null | undefined> | null | undefined;

}
export interface IUser {
    access_token: string;

}
export interface AuthService {
    userManager: IUserManager;
    user?: IUser | null;
}
declare module 'vue/types/vue' {
    export interface Vue {
        $auth: AuthService;
    }
}

export interface AuthComponentOptions extends Vue.ComponentOptions<Vue> {
    auth: IUserManager;
}

//export const usermanager = new oidc.UserManager({
//    authority: process.env.authority, //"https://io-board.eu.ngrok.io/identity/",
//    client_id: "IO-Board",
//    redirect_uri: `${window.location.protocol}//${window.location.host}${window.location.pathname}#/signin/`,
//    response_type: "code",
//    scope: `openid profile https://${new URL(process.env.authority as string).host}/providers/io-board.identity`,
//    loadUserInfo: true,
//    filterProtocolClaims: true,
//    automaticSilentRenew: true,
//    silent_redirect_uri: `${window.location.protocol}//${window.location.host}${window.location.pathname}silent.html`,
//});
//usermanager.events.addAccessTokenExpiring(function () {
//    console.log("token expiring...");
  
//});

class UserManager implements IUserManager {
    async setAppUser(user: IUser) {
        localStorage.setItem("appuser", JSON.stringify(user));

        let rsp = await fetch("/api/providers/DotNetDevOps.EventManager/users", {
            method: "PUT",
            headers: {
                //  "X-ZUMO-AUTH": this.$auth.user.access_token
            },
            credentials: "include"
        });

    }

    getAppUser(): IUser | PromiseLike<IUser | null | undefined> | null | undefined {
        var user = localStorage.getItem("appuser");
        if(user)
            return JSON.parse(user);
        return null;
    }

}

//const usermanager = {};
//Vue.prototype.$auth = { userManager: usermanager };

console.log(this);

export default ({ app }, inject) => {
    // Set the function directly on the context.app object
    //  app.myInjectedFunction = string => console.log('Okay, another function', string);
    inject("auth", { userManager: new UserManager() });
}