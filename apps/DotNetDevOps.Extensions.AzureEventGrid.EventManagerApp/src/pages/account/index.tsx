import Vue, { VNode } from 'vue';
import * as tsx from "vue-tsx-support";
import { Component, Inject, Model, Prop, Provide, Watch } from 'nuxt-property-decorator';
 

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
            sm8
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
               
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
        )
        
       
    }
}
//<v-container fluid class="grey lighten-4 fill-height">
//    <v-row justify="center" alight="center">
//        <v-col class="">

//        </v-col>
//    </v-row>

//</v-container>