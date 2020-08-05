import Vue, { VNode } from 'vue';
import * as tsx from "vue-tsx-support";
import { Component, Inject, Model, Prop, Provide, Watch } from 'nuxt-property-decorator';
import { JSXElement } from '@babel/types';
import "./core.less";
import "./index.less";
export interface DefaultLayoutOptions {

}

const Layers = { heading: 'Layers' };

@Component
export default class DefaultLayout extends tsx.Component<DefaultLayoutOptions>{

    drawer = false;
    toggleDrawer() {
        this.drawer = !this.drawer;
    }


    items = [
        { icon: 'lightbulb_outline', text: 'Notes' },
        { icon: 'touch_app', text: 'Reminders' },
        { divider: true },
        Layers,
        { icon: 'layers', text: 'OSM' },
        { icon: 'add', text: 'Create new label' },
        { divider: true },
        { icon: 'archive', text: 'Archive' },
        { icon: 'delete', text: 'Trash' },
        { divider: true },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Trash' },
        { icon: 'help', text: 'Help' },
        { icon: 'phonelink', text: 'App downloads' },
        { icon: 'keyboard', text: 'Keyboard shortcuts' },
    ] as any;
    addLayer(data) {
        console.log(data);
        this.items.splice(this.items.indexOf(Layers)+1, 0, data);
    }
    mounted() {
        this.$nuxt.$on("toggleDrawer", this.toggleDrawer);
        this.$nuxt.$on("addLayer", this.addLayer);
    }
    get breadcrumbs() {
        console.log(this.$route);
        let count = Object.values(this.$route.params).length - 1;
        return Object.values(this.$route.params).sort((a, b) => this.$route.path.indexOf(a) - this.$route.path.indexOf(b))
            .map((v, i) => ({ disabled: i === count, text: v, href: "#" + this.$route.path.substr(0, this.$route.path.indexOf(v) + v.length) }));
        return [];
    }
    render() {

        let drawerItems = [] as Array<JSX.Element>;
        for (let item of this.items) {
            if (item.heading)
                drawerItems.push(<v-row align="center">
                    <v-col cols="6">
                        <v-subheader>{item.heading}</v-subheader>
                    </v-col>
                    <v-col cols="6" class="text-right">
                        <v-btn small text>edit</v-btn>
                    </v-col>
                </v-row>);
            else if (item.divider) {
                drawerItems.push(<v-divider class="my-4"></v-divider>);
            } else {
                drawerItems.push(<v-list-item>
                    <v-list-item-action>
                        <v-icon>{item.icon}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="gray--text"> {item.text}</v-list-item-title>
                       
                    </v-list-item-content>
                </v-list-item>);
            }
        }

        return (
            <v-app>
                <v-app-bar app clipped-left color="#f87f2e" dense>

                    <v-app-bar-nav-icon onClick={this.toggleDrawer} />
                    <nuxt-link exact to="/" tag="span" class="title ml3 mr-5 home">EventGrid&nbsp;<span class="font-weight-light">Manager</span></nuxt-link>
                    <v-text-field clearable={true} solo-inverted  single-line dense flat hide-details label="search" />

                    <div class="flex-grow-1" />

                </v-app-bar>
                <v-navigation-drawer v-model={this.drawer} app color="grey lighten-4">
                    <v-app-bar   clipped-left  dense>

                        <v-app-bar-nav-icon onClick={this.toggleDrawer} />
                        
                         

                    </v-app-bar>
                    <v-list dense class="grey lighten-4">
                        {drawerItems}
                    </v-list>
                </v-navigation-drawer>


                <v-main  >
                    <v-breadcrumbs items={this.breadcrumbs}></v-breadcrumbs>
                    <nuxt />
                    
                </v-main>

            </v-app>

        )

    }
}
