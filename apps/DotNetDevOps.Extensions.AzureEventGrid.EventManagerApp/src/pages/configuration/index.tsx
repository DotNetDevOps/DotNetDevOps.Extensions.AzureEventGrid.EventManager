import Vue, { VNode } from 'vue';
import * as tsx from "vue-tsx-support";
import { Component, Inject, Model, Prop, Provide, Watch } from 'nuxt-property-decorator';
import SignupLoginForm from '@/components/Signup';

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
               Setup Configuration
            </SignupLoginForm>
        )


    }
}
