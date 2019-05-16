<template>
    <div class="container">
        <el-button type="danger" plain v-if="notsupport">获取摄像头权限失败，请检查后重试</el-button>
        <div v-if="!notsupport">
            共需10张照片，已有{{successnum}}张
            <el-button type="primary" @click="getPhoto" round>拍照</el-button>
            <br>
            <video id="videovar" width="100%" autoplay></video>
            <br>
            <canvas id="canvasvar"></canvas>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                notsupport: false,
                successnum: 0,
            }
        },
        components: {},
        mounted() {
            this.getAlreadyUploadImgNum();
            this.getMedia();
        },
        methods: {
            getMedia() {
                var that = this;
                var videovar = document.getElementById('videovar');
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                if (navigator.getUserMedia) {
                    navigator.getUserMedia({video: true},
                        function (stream) {
                            try {
                                videovar.src = window.URL.createObjectURL(stream);
                            } catch (e) {
                                //chrome中createObjectURL设置MediaStream已被弃用
                                videovar.srcObject = stream;
                            }
                            videovar.onloadedmetadata = function () {
                                videovar.play();
                            };
                        },
                        function () {
                            that.$message({
                                type: 'error',
                                message: '调用摄像头失败，请请检查后重试'
                            });
                            that.notsupport = true;
                        }
                    );
                }
            },
            getPhoto() {
                if (this.successnum >= 10) {
                    this.$message({
                        type: 'error',
                        message: '您已上传足够图片'
                    });
                    this.$router.push({
                        path: "/"
                    });
                    return;
                }
                var videovar = document.getElementById('videovar');
                var width = videovar.clientWidth;
                var height = videovar.clientHeight;
                var canvas = document.getElementById('canvasvar');
                var context2D = canvas.getContext("2d");
                canvas.width = width;
                canvas.height = height;
                context2D.drawImage(videovar, 0, 0, width, height);
                var image_code = canvas.toDataURL("image/png");//要传给后台的base64


                let that = this;

                //此处使用原生js，避免拦截器影响multipart/form-data
                let url = this.$axios.defaults.baseURL + "/users/uploadPhotoForRollCall";
                console.log("url");
                console.log(url);
                let data = new FormData();
                //附加表单id
                data.append('imgCode', image_code);

                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let resdata = JSON.parse(xhr.responseText);
                        that.successnum = resdata.successnum;
                        if (that.successnum >= 10) {
                            /*开始训练*/
                            that.startTrain();
                        }
                        loading.close();
                        if (resdata.state === "400") {
                            that.$message({
                                message: resdata.msg,
                                type: 'error'
                            });
                        } else {
                            that.$message({
                                message: resdata.msg,
                                type: 'success'
                            });
                        }

                    } else if (xhr.readyState === 4 && xhr.status === 500) {
                        loading.close();
                        that.$message({
                            message: "上传图片失败，请检查网络后重试",
                            type: 'error'
                        });

                    }
                };

                xhr.open('POST', url);

                xhr.setRequestHeader("Authorization", that.$store.state.token);
                xhr.send(data);
            },
            getAlreadyUploadImgNum() {

                this.$axios({
                    method: 'POST',
                    url: '/users/getAlreadyUploadImgNum',
                    data: {}
                }).then(response => {
                    var resdata = response.data;
                    this.successnum = resdata.num;
                })

            },
            startTrain() {
                this.$axios({
                    method: 'POST',
                    url: '/users/startTrain',
                    data: {}
                }).then(response => {
                    this.$router.push({
                        path: "/"
                    });
                })
            }


        }
    }
</script>


<style scoped>
    #videovar {
        max-width: 400px;
    }
</style>
