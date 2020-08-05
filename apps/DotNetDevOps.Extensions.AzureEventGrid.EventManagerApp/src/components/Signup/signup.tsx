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

export interface SignupFormAttributes {

}




@Component({
})
export default class SignupForm extends tsx.Component<SignupFormAttributes>{

    firstName = "";
    lastName = "";
    email = "";
    password = "";

    get hasTyped() {
        return [this.firstName, this.lastName, this.email, this.password].join("").length > 0;
    }
    async createProfile() {
        
    }
    showPassword = false;
    render() {
        return (

            <div id="signup">
                <h1>Sign Up for Free</h1>

                
                    <v-container>
                        <v-row class="top-row">
                            <v-col cols="12" sm="6">
                                <v-text-field dark v-model={this.firstName}
                                    label="First Name"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field dark v-model={this.lastName}
                                    label="Last Name"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field dark v-model={this.email}
                                    label="Email"
                                ></v-text-field>
                            </v-col>

                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field on={{"click:append":() => this.showPassword = !this.showPassword}} dark v-model={this.password} append-icon={this.showPassword ? 'visibility' : 'visibility_off'} type={this.showPassword ? 'text' : 'password'} counter
                                    label="Password"
                                ></v-text-field>
                            </v-col>

                        </v-row>
                    </v-container>
                    

                    <button type="submit" onClick={this.createProfile} class="button button-block" >{this.hasTyped ? "Create Profile" : "Continue without profile"}</button>
                  
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