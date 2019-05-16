<template>
    <div>
        <span id="addr">{{addr}}</span>

        <baidu-map class="bm-view" ak="q8xGTMGQvt1RnyNQqky4glDF"
                   :center="center"
                   :zoom="zoom"
                   :dragging="false"
                   :scroll-wheel-zoom="false"
                   :double-click-zoom="false"
                   :keyboard="false"
                   :pinch-to-zoom="false"
                   @ready="handler"
        >
            <!--缩放控件-->
            <Navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></Navigation>
            <!--定位-->
            <Geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true"
                         :autoLocation="true"></Geolocation>
        </baidu-map>
    </div>

</template>

<script>
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
    import Navigation from 'vue-baidu-map/components/controls/Navigation.vue'
    import Geolocation from 'vue-baidu-map/components/controls/Geolocation.vue'

    export default {
        data() {
            return {
                center: {lng: 120.437032, lat: 36.0819},
                zoom: 15,
                addr: '定位中',
            }
        },
        components: {
            BaiduMap,
            Navigation,
            Geolocation
        },
        methods: {
            handler({BMap, map}) {

                this.$notify({
                    title: '消息通知',
                    message: '正在定位，请授予相关权限',
                    offset: 120,
                    type: 'warning'
                });
                let that = this;

                let geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function (r) {
                    that.center = {lng: r.longitude, lat: r.latitude};
                    that.autolocationPoint = {lng: r.longitude, lat: r.latitude};
                    that.initLocation = true;
                    that.$axios({
                        method: 'POST',
                        url: '/usersLogin/location',
                        data: {
                            lat: r.latitude,
                            lng: r.longitude
                        }
                    }).then(response => {
                        that.addr = '定位地址:' + response.data.data;
                    });
                }, {enableHighAccuracy: true});
            },
        }
    }
</script>


<style scoped>
    .bm-view {
        width: 100%;
        height: 200px;
    }
    #addr{
        color: #999;
    }
</style>
