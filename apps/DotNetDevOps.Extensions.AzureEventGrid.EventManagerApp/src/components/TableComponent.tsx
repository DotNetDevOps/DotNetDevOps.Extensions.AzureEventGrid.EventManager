

import Vue, { VNode } from 'vue';
import * as tsx from "vue-tsx-support";
import { Component, Inject, Model, Prop, Provide, Watch } from 'nuxt-property-decorator';
import moment from 'moment';



export interface TableComponentOptions {
    rows?: any;
    columns?: any;
}

const defaultColumns = [
    { type: "icon", header: "" },
    { type: "text", header: "Name", property: "name", linkTo: "assets-id" },
    { type: "text", header: "Type", property: "type" },
    { type: "text", header: "Location", property: "location" }
]

@Component
export default class TableComponent extends tsx.Component<TableComponentOptions>{

    @Prop()
    rows;

    @Prop({ default: () => defaultColumns })
    columns!: Array<{ header: string, property: string, params: Array<{ key: string, prop: string }>, type: string, linkTo?: string, defaultValue?: string }>;

    
    sortOpr = 1;
    sorter = "name";
    sort(e: MouseEvent) {
        if (e.target) {
            let el = e.target as HTMLElement;
            console.log(el.innerText);
            let column = this.columns.filter(c => c.header.toLowerCase() === el.innerText.toLowerCase())[0];
            console.log(column);
            if (this.sorter === column.property || "name")
                this.sortOpr = -this.sortOpr;
            this.sorter = column.property || "name";
            //  this.rows.value.sort((a, b) => a[column.property] > b[column.property]);
        }
    }

 
    render() {
        console.log(this.rows);
        let items = this.rows.value.slice().sort((a, b) => (a[this.sorter] > b[this.sorter] ? 1 : -1) * this.sortOpr);

        return (
            <div class="fxs-home-recent-grid" role="grid" aria-readonly="true" aria-labelledby="home-recent-title" tabindex={0}>
                <div role="row" class="fxs-home-recent-headerrow">
                    {this.columns.map(c => (
                        c.type === "icon" ? (
                            <div class="fxs-home-recent-header fxs-home-recent-cell"></div>
                        ) : (
                                <div role="columnheader" class="fxs-home-recent-header fxs-home-recent-cell" onClick={this.sort}>{c.header}</div>
                            )
                    ))}


                </div>

                {items.map((r, i) => (
                    <div role="row" class="fxs-home-recent-row fxs-portal-hover fxs-portal-border" style={{ "-ms-grid-row": i + 2 }}>

                        {this.columns.map(c => (
                            c.type === "icon" ? (
                                <div class="fxs-home-recent-cell fxs-home-recent-icon-container fxs-home-icon-container">
                                    <div data-bind="&quot;image&quot;:icon" class="msportalfx-gridcolumn-assetsvg-icon">
                                        <svg-icon viewBox="0 0 18 18" name={(r.svg || "common")} />
                                    </div>
                                </div>
                            ) : (
                                    c.linkTo ? (
                                        <div role="gridcell" class="fxs-home-recent-cell fxs-home-recent-link-wrapper">
                                            <nuxt-link to={{ name: c.linkTo, params: c.params.reduce((c, v) => { c[v.key] = r[v.prop]; return c;}, {}) }} role="link" tabindex="-1" class="fxs-home-link fxs-home-recent-link" aria-label="company-day" aria-describedby="azureHome_elemId_recent_0" li>{r[c.property]}</nuxt-link>
                                        </div>
                                    ) : (
                                            <div role="gridcell" class="fxs-home-recent-cell fxs-home-recent-typename" id="azureHome_elemId_recent_0">{r[c.property as string] || c.defaultValue}</div>
                                        )
                                )
                        ))}




                    </div>
                ))}
            </div>
        )
    }
}
