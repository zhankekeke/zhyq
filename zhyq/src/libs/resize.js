let rs_style = {
    row: 'height',
    col: 'width'
}
let rs_distance = {
    row: 'y',
    col: 'x'
}
export default {
    componentUpdated(el, binding, vnode) {
        let direction = ['row', 'col'];
        if (window.getComputedStyle(el, null).position === 'static') {
            el.style.position = 'relative';
        }
        if (direction.indexOf(binding.value) > -1) {
            direction = [binding.value];
        }
        direction.map(ctrl => {
            let prev;
            let div = document.createElement('div');
            let hammer = new Hammer(div);
            hammer.get("pan").set({
                threshold: 0,
                direction: Hammer.DIRECTION_ALL
            });
            hammer.on('panstart', event => prev = event);
            hammer.on('panmove', event => {
                let newStyle = parseInt(window.getComputedStyle(el)[rs_style[ctrl]]) + event.center[rs_distance[ctrl]] - prev.center[rs_distance[ctrl]];
                el.style[rs_style[ctrl]] = newStyle + 'px';
                el.style['max-' + rs_style[ctrl]] = newStyle + 'px';
                vnode.componentInstance.$emit('resize');
                prev = event;
            });
            div.className = 'iv-resize iv-rs-' + ctrl;
            el.appendChild(div);
        })
    }
}