let number = function (val){
	if(val ===  null || val === void 0){
		return val;
	}
	if(val instanceof Array){
		val = val.join(' ');
	}
	if(['string','number'].indexOf(typeof val)>-1){
		if(this.isGroup){
			return ''.trim.call(val).split(' ').filter(v=>v).map(v=>{
				if(isNaN(v)||/^\s*$/.test(v)){
					if(this.hasOwnProperty('default')){
						return this.default;
					}else{
						return v;
					}
				}else{
					if(this.hasOwnProperty('scale')){
						return v * this.scale + this.unit;
					}else{
						return v + this.unit;
					}
				}
			}).join(' ');
		}else{
			if(isNaN(v)||/^\s*$/.test(v)){
				if(this.hasOwnProperty('default')){
					return this.default;
				}else{
					return val;
				}
			}else{
				if(this.hasOwnProperty('scale')){
					return val * this.scale + this.unit;
				}else{
					return val + this.unit;
				}
			}
		}
	}else return (val instanceof Array)?val.join(' '):val;
};
let px = number.bind({unit:'px', isGroup:true});
let percent = number.bind({unit:'%', default:0, isGroup:true});

let units = {
	'border':px,
	'margin':px,
	'padding':px,
	'fontSize':px,
	'boxShadow':px,
	'lineHeight':px,
	'borderWidth':px,
	'top':px,
	'left':px,
	'right':px,
	'bottom':px,
	'width':px,
	'height':px,
	'borderRadius':percent,
	'backgroundImage':u=>`url(${u})`
};

export default function(kn, value){
	let oname;
	if(typeof units[kn] === 'function'){
		return units[kn](value);
	}else if(typeof  units[oname = kn.replace(/[A-Z]/g, m=>'-'+m.toLowerCase())] === 'function'){
		return units[oname](value);
	}else if(typeof units[oname = kn.replace(/-([a-z])/g, (m,s)=>s.toUpperCase())] === 'function'){
		return units[oname](value);
	}else return value instanceof Array?value.join(' '):value;
}