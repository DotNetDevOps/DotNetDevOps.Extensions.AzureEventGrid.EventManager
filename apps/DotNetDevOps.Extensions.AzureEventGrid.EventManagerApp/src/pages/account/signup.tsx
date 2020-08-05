import Vue, { VNode } from 'vue';
import * as tsx from "vue-tsx-support";
import { Component, Inject, Model, Prop, Provide, Watch } from 'nuxt-property-decorator';
import SignupLoginForm from '../../components/Signup';
import SignupForm from '../../components/Signup/signup';
 

//export function pretendNormalComponent<A extends Promise<typeof Vue>>(
//    factory: () => A
//): A extends Promise<infer V> ? V : never {
//    return factory as any;
//}

//const LazyComp = pretendNormalComponent(() => import("../components/OLMap"));

export interface EditorPageOptions {

}

 
@Component({
})
export default class EditorPage extends tsx.Component<EditorPageOptions>{
   
    toggleDrawer() {
        this.$nuxt.$emit("toggleDrawer");
    }

    
    render() {
        console.log(this["$auth"]);
       
       // const test = this.$isServer? import("../components/OLMap") : (<div>hello</div>);
     //   return test;

        return (
            <SignupLoginForm >
                <SignupForm />
            </SignupLoginForm>
        )
        
       
    }
}
//<v-container fluid class="grey lighten-4 fill-height">
//    <v-row justify="center" alight="center">
//        <v-col class="">

//        </v-col>
//    </v-row>

//</v-container>