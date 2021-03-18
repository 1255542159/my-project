<template>
<div class="index-content-box">
    <div class="index-content">
        <el-row>
            <el-col :span="4">
                <div class="index-content-left-box">
                    13242546357
                </div>
            </el-col>
            <el-col :span="16">
                <div class="index-content-middle-box">
                    <el-carousel :interval="3000" arrow="always" class="index-carousel-content">
                        <el-carousel-item v-for="(item,index) in carousel" :key="index">
                            <el-image :src="item.url" :fit='scale-down'></el-image>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="index-content-right-box">
                    14352643
                </div>
            </el-col>
        </el-row>
    </div>

</div>
</template>

<script>
import front from '../../../../api/front'
export default {
    data() {
        return {
            carousel: [],
        }
    },
    methods: {
        getCarousel() {
            front.getCarousel().then((res) => {
                console.log(res);
                this.carousel = res.data.data;
            })
        }

    },

    mounted() {
        this.getCarousel();
    }

}
</script>

<style scoped>
.index-content {
    margin-top: 5px;
    padding: 30px;
}

.el-image {
    border-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
</style>
