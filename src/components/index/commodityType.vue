<template lang="html">
    <div class="product-list">
        <ul>
            <template v-for="k in commodityTypeData">
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
            commodityTypeData: {
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
        overflow: hidden;
        li{
            float: left;
            width: 100%;
            text-align: center;
            margin-bottom: 10px;
        }
        img {
            width: 100%;
            height: auto;
        }
    }
</style>