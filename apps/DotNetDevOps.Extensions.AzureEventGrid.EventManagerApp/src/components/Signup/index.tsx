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

export interface SignupLoginFormAttributes {
    
}




@Component({
})
export default class SignupLoginForm extends tsx.Component<SignupLoginFormAttributes>{

 

    render() {
        console.log(this);
        return (
            <v-container
                fluid
                fill-height
            >
                <v-layout
                    align-center
                    justify-center
                >
                    <v-flex
                        xs12
                        sm10
                        md8
                    >
                        <div class="form">

                            <ul class="tab-group">
                                <li class={{ "tab": true, active: this.$route.name === 'account/signup' }} ><nuxt-link to="/account/signup">Sign Up</nuxt-link></li>
                                <li class={{ "tab": true, active: this.$route.name === 'account/login' }}><nuxt-link to="/account/login">Log in</nuxt-link></li>
                            </ul>

                            <div class="tab-content">

                                {this.$slots.default}
                              

                            </div>

                        </div>  
                    </v-flex>
                </v-layout >
            </v-container >
            )
    }
}
 