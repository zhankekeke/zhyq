export default {
    install: (Vue, options) => {
        Vue.User = '';
        Vue.prototype.$_myTrim_$ = (x) => {
            return x.replace(/^\s+|\s+$/gm, '');
        };
        Vue.prototype.$_IsNotNull_$ = (data) => {
            return !(data == null || data == undefined || data === "");
        };

        Vue.prototype.$_IsNum_$ = (value) => {
            var patrn = /^(-)?\d+(\.\d+)?$/;
            if (patrn.exec(value) == null || value === "") {
                return false
            } else {
                return true
            }
        }
        Vue.prototype.$_TimestampToData_$ = (val) => {
            function add0(m) { return m < 10 ? '0' + m : m }
            var time = new Date(val);
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
        }
        Vue.prototype.$_Inarray_$ = (array, val) => {
            let s = String.fromCharCode(2);
            let r = new RegExp(s + val + s);
            return (r.test(s + array.join(s) + s));
        };
        Vue.prototype.$_ArrayCol_$ = (array, name = 'id') => {
            let result = [];
            if (array instanceof Array) {
                array.map((item) => {
                    if (item[name] && typeof(item[name]) != 'undefined')
                        result.push(item[name]);
                });
            }
            return result;
        };
        Vue.prototype.$_ArrayToNum_$ = (array) => {
            let result = [];
            array.map((item) => {
                result.push(parseInt(item));
            });
            return result;
        };

        Vue.prototype.$_QueryDom_$ = (selector, callback) => {
            let doms = document.querySelectorAll(selector);
            for (let i in doms) {
                callback(doms[i], i);
            }
        };

        function $_TypeOf_$(obj) {
            const toString = Object.prototype.toString;
            const map = {
                '[object Boolean]': 'boolean',
                '[object Number]': 'number',
                '[object String]': 'string',
                '[object Function]': 'function',
                '[object Array]': 'array',
                '[object Date]': 'date',
                '[object RegExp]': 'regExp',
                '[object Undefined]': 'undefined',
                '[object Null]': 'null',
                '[object Object]': 'object'
            };
            return map[toString.call(obj)];
        }

        function $_deepCopy_$(data) {
            const t = $_TypeOf_$(data);
            let o;
            if (t === 'array') {
                o = [];
            } else if (t === 'object') {
                o = {};
            } else {
                return data;
            }
            if (t === 'array') {
                for (let i = 0; i < data.length; i++) {
                    o.push($_deepCopy_$(data[i]));
                }
            } else if (t === 'object') {
                for (let i in data) {
                    o[i] = $_deepCopy_$(data[i]);
                }
            }
            return o;
        }
        Vue.prototype.$_deepCopy_$ = $_deepCopy_$;
        Vue.prototype.$_Cpobj_$ = (obj) => {
            return JSON.parse(JSON.stringify(obj));
        };
        Vue.prototype.$_getTop_$ = function(e) {
            var offset = e.offsetTop;
            if (e.offsetParent != null) offset += this.$_getTop_$(e.offsetParent);
            return offset;
        };
        Vue.prototype.$_getLeft_$ = function(e) {
            var offset = e.offsetLeft;
            if (e.offsetParent != null) offset += this.$_getLeft_$(e.offsetParent);
            return offset;
        };

        Vue.prototype.$_UUID_$ = function() {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        };
        Vue.prototype.$_Rnd_$ = function(n, m) {
            var random = Math.floor(Math.random() * (m - n + 1) + n);
            return random;
        };
        Vue.prototype.$_MyCss_$ = function(id, stylestr) {
            this.$_RemoveMyCss_$(id);
            if (stylestr) {
                var style = document.createElement('style');
                style.id = "S" + id;
                style.type = 'text/css';
                style.innerHTML = stylestr;
                document.getElementsByTagName('HEAD').item(0).appendChild(style);
            }
        };
        Vue.prototype.$_RemoveMyCss_$ = function(id) {
            var style = document.getElementById("S" + id);
            if (style)
                document.getElementsByTagName('HEAD').item(0).removeChild(style);
        };

        Vue.prototype.$_isMobile_$ = function() {
            var check = false;
            (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        };

        Vue.prototype.$_HighLight_$ = function(text, words) {
            words.map((word) => {
                let reg = new RegExp(word, 'g');
                if (reg.test(text)) {
                    text = text.replace(reg, '<span class="highlight">$&</span>');
                }
            });
            return text;
        };

        Object.defineProperty(Array.prototype, 'removeByValue', {
            value: function(val) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == val) {
                        this.splice(i, 1);
                        break;
                    }
                }
            },
            enumerable: false,
        })
    }
}