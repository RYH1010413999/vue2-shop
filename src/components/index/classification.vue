<template lang="html">
    <div class="product-list">
        <ul>
            <template v-for="k in classificationData">
                <li>
                    <router-link :to="{ name: '详情页'}">
                        <img :src="k.imgPath">
                    </router-link>
                </li>
            </template>  
        </ul>

    </div>
</template>

<script>
    export default {
        props: {
            classificationData: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    .product-list {
        padding:50px 70px;
        padding-bottom: 5px;
        overflow: hidden;
        li{
            float: left;
            width: 50%;
            text-align: center;
            margin-bottom: 20px;
            height: 110px;
        }
        img {
            width: 98px;
            height: auto;
        }
    }
</style>