import Vue, { VNode } from 'vue';
import * as tsx from "vue-tsx-support";
import { Component, Inject, Model, Prop, Provide, Watch } from 'nuxt-property-decorator';
import "./index.less";

//export function pretendNormalComponent<A extends Promise<typeof Vue>>(
//    factory: () => A
//): A extends Promise<infer V> ? V : never {
//    return factory as any;
//}

//const LazyComp = pretendNormalComponent(() => import("../components/OLMap"));

export interface LoginFormAttributes {
     
}




@Component({
})
export default class LoginForm extends tsx.Component<LoginFormAttributes>{

    email = "";
    password = "";
    showPassword = false;
    renderPassword = false;
    async login() {
        console.log("Login");
        //  this.$nuxt.$router.replace("/.auth/login/aad");
        window.location.replace(`/.auth/login/aad?post_login_redirect_url=${window.location.protocol}//${window.location.host}${window.location.pathname}&login_hint=${this.email}&prompt=login&scope=openid`);
    }
    render() {
        return (

            <div id="login">
                <h1>Welcome Back!</h1>

                
                    <v-container>
                        
                        <v-row>
                        <v-col cols="12">
                            <v-text-field dark v-model={this.email}
                                label="Email"
                            ></v-text-field>
                        </v-col>

                        </v-row>
                    {this.renderPassword && [
                        <v-row>
                            <v-col cols="12">
                                <v-text-field on={{ "click:append": () => this.showPassword = !this.showPassword }} dark v-model={this.password} append-icon={this.showPassword ? 'visibility' : 'visibility_off'} type={this.showPassword ? 'text' : 'password'} counter
                                    label="Password"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        ,
                        <v-row>
                            <v-col cols="12">
                                <p class="forgot"><a href="#">Forgot Password?</a></p>

                                
                            </v-col>
                        </v-row>
                    ]}
                    <v-row>
                        <v-col cols="12">                          

                            <button onClick={this.login} class="button button-block" >Log In</button>
                        </v-col>
                    </v-row>
                    </v-container>

                

                

            </div>

        )
    }
}
//<v-container fluid class="grey lighten-4 fill-height">
//    <v-row justify="center" alight="center">
//        <v-col class="">

//        </v-col>
//    </v-row>

//</v-container>