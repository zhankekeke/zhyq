export default {
    install: (Vue, options) => {
        let $_CurrHist_$ = {};
        let $_Stack_$ = {};
        Vue.prototype.$_History_$ = {};
        let $_Notice_$ = new Vue();

        Vue.prototype.$_History_$.$_BindEvent_$ = (call) => {
            $_Notice_$.$on('HistoryUpdate', call);
        }
        Vue.prototype.$_History_$.$_addPage_$ = (id, eles) => {
            if (!$_Stack_$.hasOwnProperty(id)) {
                $_Stack_$[id] = {
                    $_currentPos_$: 0,
                    $_inHistory_$: !1,
                    $_pageHistory_$: []
                };
            }
            Vue.prototype.$_History_$.$_addpageHistory_$(id, eles);
            return JSON.parse($_Stack_$[id].$_pageHistory_$[$_Stack_$[id].$_currentPos_$]);
        };

        Vue.prototype.$_History_$.$_addpageHistory_$ = (t, n) => {
            $_CurrHist_$ = $_Stack_$[t],
                $_CurrHist_$.$_inHistory_$ && ($_CurrHist_$.$_inHistory_$ = !1,
                    $_CurrHist_$.$_pageHistory_$.length = $_CurrHist_$.$_currentPos_$ + 1);
            var s = JSON.stringify(n);
            s !== $_CurrHist_$.$_pageHistory_$[$_CurrHist_$.$_pageHistory_$.length - 1] && $_CurrHist_$.$_pageHistory_$.push(s),
                $_CurrHist_$.$_currentPos_$ = $_CurrHist_$.$_pageHistory_$.length - 1;
            $_Notice_$.$emit('HistoryUpdate', t);
        };

        Vue.prototype.$_History_$.$_clearHistory_$ = () => {
            $_Stack_$ = {};
            $_Notice_$.$emit('HistoryUpdate', t);
        };

        Vue.prototype.$_History_$.$_canBack_$ = (e) => {
            if (!$_Stack_$.hasOwnProperty(e)) return false;
            return $_CurrHist_$ = $_Stack_$[e],
                $_CurrHist_$.$_currentPos_$ > 0
        };

        Vue.prototype.$_History_$.$_canForward_$ = (e) => {
            if (!$_Stack_$.hasOwnProperty(e)) return false;
            return $_CurrHist_$ = $_Stack_$[e],
                $_CurrHist_$.$_currentPos_$ < $_CurrHist_$.$_pageHistory_$.length - 1
        };

        Vue.prototype.$_History_$.$_back_$ = (t) => {
            if ($_CurrHist_$ = $_Stack_$[t],
                $_CurrHist_$.$_pageHistory_$.length) {
                $_CurrHist_$.$_inHistory_$ = !0;
                var n = 0 === $_CurrHist_$.$_currentPos_$ ? $_CurrHist_$.$_pageHistory_$[0] : $_CurrHist_$.$_pageHistory_$[--$_CurrHist_$.$_currentPos_$];
                $_Notice_$.$emit('HistoryUpdate', t);
                return JSON.parse(n);
            }
        };

        Vue.prototype.$_History_$.$_forward_$ = (t) => {
            if ($_CurrHist_$ = $_Stack_$[t],
                $_CurrHist_$.$_pageHistory_$.length) {
                $_CurrHist_$.$_inHistory_$ = !0;
                var n = $_CurrHist_$.$_currentPos_$ === $_CurrHist_$.$_pageHistory_$.length - 1 ? $_CurrHist_$.$_pageHistory_$[$_CurrHist_$.$_currentPos_$] : $_CurrHist_$.$_pageHistory_$[++$_CurrHist_$.$_currentPos_$];
                $_Notice_$.$emit('HistoryUpdate', t);
                return JSON.parse(n)
            }
        };

    }
}