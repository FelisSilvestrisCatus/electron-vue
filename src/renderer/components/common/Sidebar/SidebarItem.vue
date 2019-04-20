<template>
    <div v-if="!item.hidden" class="menu-wrapper">

        <template v-for="child in item.children">
            <app-link :to="child.path" :key="child.name" v-if="!child.hidden" >
                <el-menu-item :index="child.path">
                    <item v-if="!child.hidden" :icon="child.meta.icon" :title="child.meta.title"/>
                </el-menu-item>
            </app-link>
        </template>

    </div>
</template>

<script>
    import Item from './Item'
    import AppLink from './Link'
    import FixiOSBug from './FixiOSBug'

    export default {
        name: 'SidebarItem',
        components: {Item, AppLink},
        mixins: [FixiOSBug],
        props: {
            // route object
            item: {
                type: Object,
                required: true
            },
            isNest: {
                type: Boolean,
                default: false
            },
            basePath: {
                type: String,
                default: ''
            }
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>
<style>
    .menu-wrapper .svg-icon {
        margin-right: 16px;
    }
</style>
