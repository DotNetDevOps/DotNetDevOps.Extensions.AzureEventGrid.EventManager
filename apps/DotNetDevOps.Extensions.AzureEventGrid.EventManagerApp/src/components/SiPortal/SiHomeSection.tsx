import Vue, { VNode } from 'vue';
import * as tsx from "vue-tsx-support";
import { Component, Inject, Model, Prop, Provide, Watch } from 'nuxt-property-decorator';
 
export interface SiHomeSectionTags {
    title: string;
    homeContainer?: boolean;
}
 
@Component
export default class SiHomeSection extends tsx.Component<SiHomeSectionTags, {}, {}>{

    @Prop()
    title!: string;

    @Prop({ default: true })
    homeContainer!: boolean;
   
    render() {

        return <div>
            <header class="fxs-home-title" aria-label={this.title}>{this.title}</header>
            {this.homeContainer &&
                <div class="fxs-home-section">
                    {this.$slots.default}
                </div>
            }
            {!this.homeContainer &&
                this.$slots.default
            }
        </div>;
    }
         
}