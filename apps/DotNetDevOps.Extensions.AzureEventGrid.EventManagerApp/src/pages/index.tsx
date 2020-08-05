
import * as tsx from "vue-tsx-support";
import { Component, Inject, Model, Prop, Provide, Vue, Watch } from 'nuxt-property-decorator';
    
import TableComponent from '@/components/TableComponent';
import SiHomeSection from '@/components/SiPortal/SiHomeSection';

const AsyncTableComponent = (() => import("@/components/SiPortal/SiHomeSection"));

//export function pretendNormalComponent<A extends Promise<typeof Vue>>(
//    factory: () => A
//): A extends Promise<infer V> ? V : never {
//    return factory as any;
//}

//const LazyComp = pretendNormalComponent(() => import("../components/OLMap"));

export interface EditorPageOptions {

}

interface IFeatureTile {
    title: string;
    linkTo?: string;
    svg?: string;
}

const collectionColumns = [
    { type: "icon", header: "" },
    {
        type: "text", header: "Id", property: "id", linkTo: "subscriptions/subscriptionId/collections/id", params: [{ key: 'subscriptionId', prop: 'subscriptionId' }, { key: 'id', prop: 'id' }] },
    { type: "text", header: "RecordedAtPath", property: "recordedAtPath" },
    { type: "text", header: "Subscription", property: "subscriptionId" }
]


@Component({
})
export default class EditorPage extends tsx.Component<EditorPageOptions>{

    secure = true;

    toggleDrawer() {
        this.$nuxt.$emit("toggleDrawer");
    }

    featureTiles = [
        { title: "Create a resource" },
        { title: "Event Grids", linkTo:"EventGrids" },
        { title: "More services" }
    ] as Array<IFeatureTile>;

    collections = {
        value: [

        ] as Array<any>,
        count: 300,
        nextPageLink: ""
    } as any;

    async mounted() {
        if (this.$auth.user) {
            let rsp= await fetch("/api/providers/DotNetDevOps.EventManager/eventgrids", {
                method: "GET",
                headers: {
                  //  "X-ZUMO-AUTH": this.$auth.user.access_token
                },
                credentials: "include"
            });
            console.log(rsp);
        }
    }

    render() {
        console.log(this["$auth"]);
        console.log(this.$router);
       // const test = this.$isServer? import("../components/OLMap") : (<div>hello</div>);
     //   return test;

        return (
            <v-container fluid class="grey lighten-4 fill-height pa-0">
                <v-row no-gutters>
                    <v-col>
                        <div class="fxs-home-container fxs-portal-text">
                            <SiHomeSection title="EventGrid Manager Resources" homeContainer={false}>
                                <ul tabindex={-1} class="fxs-home-section fxs-home-feature-tile-container">
                                    {this.featureTiles.map(d => (
                                        <li class="fxs-home-feature-tile">
                                            <nuxt-link to={d.linkTo || "index"} role="link" tabindex="0" class="fxs-home-feature-link fxs-home-create" href="#create/hub" title="Create a resource" aria-label="Create a resource">
                                                <div class="fxs-home-resource-icon" data-bind="&quot;image&quot;:createIcon">
                                                    <svg-icon viewBox="0 0 18 18" name={(d.svg || "common")} />
                                                </div>
                                                <div class="fxs-home-feature-name">{d.title}</div>
                                            </nuxt-link>
                                        </li>
                                    ))}
                                </ul>
                            </SiHomeSection>                            
                           
                            <SiHomeSection title="Event Grids"  >
                                <TableComponent rows={this.collections} columns={collectionColumns} />    
                             </SiHomeSection>


                           
                        </div>
                    </v-col>
                </v-row>
            </v-container>    
        )
        
     
    }
}
