<style scoped>
    @media screen and (min-width: 460px) {
        .wh_item_date:hover {
            background: #FFF;
        }
    }

    * {
        margin: 0;
        padding: 0;
    }

    .wh_container {
        max-width: 100%;
        margin: auto;
    }

    li {
        list-style-type: none;
    }

    .wh_top_changge {
        display: flex;
    }

    .wh_top_changge li {
        cursor: pointer;
        display: flex;
        color: #fff;
        font-size: 18px;
        flex: 0.7;
        justify-content: center;
        align-items: center;
        height: 47px;
    }

    .wh_top_changge .wh_content_li {
        cursor: auto;
        flex: 2.5;
    }

    .wh_content_all {
        font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
        "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
        background-color: #fff;
        width: 100%;
        overflow: hidden;
        padding-bottom: 8px;
    }

    .wh_content {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    .wh_content:first-child .wh_content_item_tag,
    .wh_content:first-child .wh_content_item {
        color: #ddd;
        font-size: 16px;
    }

    .wh_content_item,
    wh_content_item_tag {
        font-size: 15px;
        width: 14.2%;
        text-align: center;
        color: #fff;
        position: relative;
    }

    .wh_content_item {
        margin-top: 9px;
        cursor: pointer;
        height: 40px;
    }

    .wh_top_tag {
        width: 40px;
        height: 40px;
        line-height: 40px;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .wh_item_date {
        width: 40px;
        height: 40px;
        line-height: 40px;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .wh_jiantou1 {
        width: 12px;
        height: 12px;
        border-top: 2px solid #ffffff;
        border-left: 2px solid #ffffff;
        transform: rotate(-45deg);
    }

    .wh_jiantou1:active,
    .wh_jiantou2:active {
        border-color: #ddd;
    }

    .wh_jiantou2 {
        width: 12px;
        height: 12px;
        border-top: 2px solid #ffffff;
        border-right: 2px solid #ffffff;
        transform: rotate(45deg);
    }

    .wh_content_item > .wh_isMark {
        margin: auto;
        border-radius: 100px;
        background: blue;
        z-index: 2;
    }

    .wh_content_item .wh_other_dayhide {
        color: #bfbfbf;
    }

    .wh_content_item .wh_want_dayhide {
        color: #bfbfbf;
    }

    .wh_content_item .wh_isToday {
        background: rgb(2, 155, 250);
        border-radius: 100px;
        color: #fff;
    }

    .wh_content_item .wh_chose_day {
        background: rgba(2, 155, 250, 0.2);
        border-radius: 100px;
    }

    .mark1 {
        margin: auto;
        border-radius: 100px;
        background: rgb(255, 159, 0);
        z-index: 2;
    }

    .mark2 {
        margin: auto;
        border-radius: 100px;
        background: rgb(2, 155, 250);
        z-index: 2;
    }
</style>
<template>
    <section class="wh_container">
        <div class="wh_content_all">
            <div class="wh_top_changge">
                <li @click="PreMonth(myDate,false)">
                    <div class="wh_jiantou1"></div>
                </li>
                <li class="wh_content_li">{{dateTop}}</li>
                <li @click="NextMonth(myDate,false)">
                    <div class="wh_jiantou2"></div>
                </li>
            </div>
            <div class="wh_content" style="margin-top: 10px;">
                <div class="wh_content_item" v-for="tag in textTop">
                    <div class="wh_top_tag">
                        {{tag}}
                    </div>
                </div>
            </div>
            <div class="wh_content">
                <div class="wh_content_item" v-for="(item,index) in list" @click="clickDay(item,index)">
                    <div style="position: relative" class="wh_item_date"
                         v-bind:class="[{ wh_isMark: item.isMark},{wh_other_dayhide:item.otherMonth!=='nowMonth'},{wh_want_dayhide:item.dayHide},{wh_isToday:item.isToday},{wh_chose_day:item.chooseDay}]">
                        {{item.id}}
                        <span style="width: 5px; height: 5px;position: absolute;bottom:3px; right: 45%"
                              v-bind:class="[setClass(item)]"></span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import timeUtil from './calendar';

    export default {
        data() {
            return {
                myDate: [],
                list: [],
                historyChose: [],
                dateTop: ''
            };
        },
        props: {
            markDate: {
                type: Array,
                default: () => []
            },
            markDateMore: {
                type: Array,
                default: () => []
            },
            chooseTime: {
                type: Date,
                default:''
            },
            textTop: {
                type: Array,
                default: () => ['日', '一', '二', '三', '四', '五', '六']
            },
            sundayStart: {
                type: Boolean,
                default: () => false
            },
            agoDayHide: {type: String, default: `0`},
            futureDayHide: {type: String, default: `2554387200`}
        },
        created() {
            this.intStart();
            this.myDate = new Date();
        },
        methods: {
            intStart() {
                timeUtil.sundayStart = this.sundayStart;
            },
            setClass(data) {
                let obj = {};
                obj[data.markClassName] = data.markClassName;
                return obj;
            },
            clickDay: function (item, index) {
                if (item.otherMonth === 'nowMonth' && !item.dayHide) {
                    this.getList(this.myDate, item.date);
                }
                if (item.otherMonth !== 'nowMonth') {
                    item.otherMonth === 'preMonth'
                        ? this.PreMonth(item.date)
                        : this.NextMonth(item.date);
                }
            },
            ChoseMonth: function (date, isChosedDay = true) {
                date = timeUtil.dateFormat(date);
                this.myDate = new Date(date);
                this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
                if (isChosedDay) {
                    this.getList(this.myDate, date, isChosedDay);
                } else {
                    this.getList(this.myDate);
                }
            },
            PreMonth: function (date, isChosedDay = true) {
                date = timeUtil.dateFormat(date);
                this.myDate = timeUtil.getOtherMonth(this.myDate, 'preMonth');
                this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
                if (isChosedDay) {
                    this.getList(this.myDate, date, isChosedDay);
                } else {
                    this.getList(this.myDate);
                }
            },
            NextMonth: function (date, isChosedDay = true) {
                date = timeUtil.dateFormat(date);
                this.myDate = timeUtil.getOtherMonth(this.myDate, 'nextMonth');
                this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
                if (isChosedDay) {
                    this.getList(this.myDate, date, isChosedDay);
                } else {
                    this.getList(this.myDate);
                }
            },
            forMatArgs: function () {
                let markDate = this.markDate;
                let markDateMore = this.markDateMore;
                markDate = markDate.map((k) => {
                    return timeUtil.dateFormat(k);
                })
                markDateMore = markDateMore.map((k) => {
                    k.date = timeUtil.dateFormat(k.date)
                    return k;
                })
                return [markDate, markDateMore];
            },
            getList: function (date, chooseDay, isChosedDay = true) {
                const [markDate, markDateMore] = this.forMatArgs();
                this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;
                let arr = timeUtil.getMonthList(this.myDate);
                for (let i = 0; i < arr.length; i++) {
                    let markClassName = '';
                    let k = arr[i];
                    k.chooseDay = false;
                    const nowTime = k.date;
                    const t = new Date(nowTime).getTime() / 1000;
                    //看每一天的class
                    for (const c of markDateMore) {
                        if (c.date === nowTime) {
                            markClassName = c.className || '';
                        }
                    }
                    //标记选中某些天 设置class
                    k.markClassName = markClassName;
                    k.isMark = markDate.indexOf(nowTime) > -1;
                    //无法选中某天
                    k.dayHide = t < this.agoDayHide || t > this.futureDayHide;
                    if (k.isToday) {
                        this.$emit('isToday', nowTime);
                    }
                    let flag = !k.dayHide && k.otherMonth === 'nowMonth';
                    if (chooseDay && chooseDay === nowTime && flag) {
                        this.$emit('choseDay', nowTime);
                        this.historyChose.push(nowTime);
                        k.chooseDay = true;
                    } else if (
                        this.historyChose[this.historyChose.length - 1] === nowTime && !chooseDay && flag
                    ) {
                        k.chooseDay = true;
                    }
                }
                this.list = arr;
            }
        },
        mounted() {
            this.getList(this.myDate);
        },
        watch: {
            markDate: {
                handler(val, oldVal) {
                    this.getList(this.myDate);
                },
                deep: true
            },
            chooseTime: {
                handler(val, oldVal) {
                    this.myDate = val;
                    this.getList(this.myDate);
                },
                deep: true
            },
            markDateMore: {
                handler(val, oldVal) {
                    this.getList(this.myDate);
                },
                deep: true
            },
            agoDayHide: {
                handler(val, oldVal) {
                    this.agoDayHide = parseInt(val);
                    this.getList(this.myDate);
                },
                deep: true
            },
            futureDayHide: {
                handler(val, oldVal) {
                    this.futureDayHide = parseInt(val);
                    this.getList(this.myDate);
                },
                deep: true
            },
            sundayStart: {
                handler(val, oldVal) {
                    this.intStart();
                    this.getList(this.myDate);
                }, deep: true
            }
        }
    };
</script>