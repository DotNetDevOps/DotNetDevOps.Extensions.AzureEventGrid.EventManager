
import * as oidc from "oidc-client";
import Vue from "vue"
import auth from "../plugins/auth";
import { AuthService } from "../plugins/auth";

 
export default async function ({ store, redirect, route, app }: { store,redirect,route, app: { $auth: AuthService }}) {
    console.log(arguments);
    console.log(route);


    let usermanager = app.$auth.userManager;
    if (route.path === "/signin/") {
        return; 

    }

    console.log(route);
    if (route.name === "account/login")
        return;

    app.$auth.user = await app.$auth.userManager.getAppUser();

    if (!app.$auth.user) {
        
        var rsp = await fetch('/.auth/me', {
            method: "GET",
            credentials: "include",
            mode: "cors"
        });
        console.log(rsp);
        if (rsp.ok) {
            var tokens = await rsp.json();
            app.$auth.user = tokens[0];
            
            if (app.$auth.user) {
                await app.$auth.userManager.setAppUser(app.$auth.user);

                return;

            }
        }

        return redirect({ name: "account/login", query: { redirect_url: route.path } })
    }

    

}