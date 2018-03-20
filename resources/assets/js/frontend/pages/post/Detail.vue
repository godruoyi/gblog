<template>
    <div>
        <div class="case-banner"></div>
        <div class="case-wrapper">
            <h3 class="case-title">线上线下完整闭环，塑造母婴行业O2O营销</h3>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    body {
        color: #000;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", "Source Han Sans CN", sans-serif;
        font-size: 14px;
        line-height: 1.4;
        height: 100%;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: none;
    }
    div {
        display: block;
    }
    *:before, *:after {
        box-sizing: inherit;
    }
    .case-banner {
        position: fixed;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100%;
        height: 430px;
        background-image: url(/vendor/images/detail-bg.jpg);
        background-size: cover;
        background-position: 50%;
    }
    .case-wrapper {
        position: relative;
        z-index: 1;
        padding-top: 28px;
        width: 100%;

        .case-title {
            position: relative;
            margin: 0 0 140px;
            font-size: 38px;
            font-weight: 400;
            color: #fff;
            text-align: center;
            line-height: 100px;
            letter-spacing: 2px;
        }
    }
</style>
