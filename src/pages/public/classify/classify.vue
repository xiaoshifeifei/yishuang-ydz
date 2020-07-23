<template>
    <div>
        <header class="header ui-header-color" ref="header">
            <uiTitle :title="'分类'" :color="'white'" :isback="false"></uiTitle>
        </header>
    </div>
</template>
<script>
import  uiTitle from '../../../components/title-bar/title-bar';
export default {
    components:{
        uiTitle
    }
}
</script>
<style lang="less" scoped>
 @import "../../../assets/less/common.less";
.header {
    width: 100%;
    min-height: 2.5rem;
    padding-top: 3rem;
    .search-bar{
        width:90%;
        margin:auto;
    }
}

      
</style>