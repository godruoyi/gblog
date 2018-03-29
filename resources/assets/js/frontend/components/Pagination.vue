<template>
    <nav class="pagination" v-if="showPagination">
        <a href="javascript:;" v-on:click="fetchOtherData('prev')" :class="'pagination__arrow arrow--left ' + leftCss"><svg class="pagination__icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-left"></use></svg> 上一页</a>
        <a href="javascript:;" v-on:click="fetchOtherData('next')" :class="'pagination__arrow arrow--right ' + rightCss">下一页 <svg class="pagination__icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-right"></use></svg></a>
    </nav>
</template>

<script>
    export default {
        props: {
            pagination: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            fetchData: {
                type: Function,
                default: function () {
                    return page => console.log('The default page click event, current page:' + page)
                }
            }
        },
        computed: {
            showPagination: function () {
                return this.pagination.total_pages > 1
            },
            leftCss: function () {
                return this.pagination.current_page - 1 > 0 ? '' : 'btn--disabled'
            },
            rightCss: function () {
                return this.pagination.current_page + 1 <= this.pagination.total_pages ? '' : 'btn--disabled'
            }
        },
        mounted: function () {
            this.$parent.$on('fetchData', (page) => {
                this.fetchData(0 | page)
            })
        },
        methods: {
            fetchOtherData: function (type) {
                if (type == 'prev' && this.pagination.current_page - 1 > 0) {
                    this.$parent.$emit('fetchData', (this.pagination.current_page - 1))
                } else if (type == 'next' && this.pagination.current_page + 1 <= this.pagination.total_pages) {
                    this.$parent.$emit('fetchData', (this.pagination.current_page + 1))
                }
            }
        }
    }
</script>
