<script>
    import _Quill from 'quill'
    const Quill = window.Quill || _Quill
	import {quillEditor} from 'vue-quill-editor';
	export default {
		extends:quillEditor,
        methods:{
	        initialize() {
		        if (this.$el) {

			        // Options
			        this._options = Object.assign({}, this.defaultOptions, this.globalOptions, this.options)

			        // Instance
			        this.quill = new Quill(this.$refs.editor, this._options)

			        this.quill.enable(false)

			        // Set editor content
			        if (this.value || this.content) {
			        	this.setValue(this.value || this.content)
			        }

			        // Disabled editor
			        if (!this.disabled) {
				        this.quill.enable(true)
			        }

			        // Mark model as touched if editor lost focus
			        this.quill.on('selection-change', range => {
				        if (!range) {
					        this.$emit('blur', this.quill)
				        } else {
					        this.$emit('focus', this.quill)
				        }
			        })

			        // Update model if text changes
			        this.quill.on('text-change', (delta, oldDelta, source) => {
				        let html = this.$refs.editor.children[0].innerHTML
				        const quill = this.quill
				        const text = this.quill.getText()
				        if (html === '<p><br></p>') html = ''
				        this._content = html
				        this.$emit('input', this._content)
				        this.$emit('change', { html, text, quill })
			        })

			        // Emit ready event
			        this.$emit('ready', this.quill)
		        }
	        },
            setValue(value){
	            this.quill.container.firstChild.innerHTML = (value||' ').trim()
            }
        },
        watch:{
	        content(newVal, oldVal) {
		        if (this.quill) {
			        if (newVal && newVal !== this._content) {
				        this._content = newVal
				        this.setValue(newVal)
			        } else if(!newVal) {
				        this.quill.setText('')
			        }
		        }
	        },
	        // Watch content change
	        value(newVal, oldVal) {
		        if (this.quill) {
			        if (newVal && newVal !== this._content) {
				        this._content = newVal
				        this.setValue(newVal)
			        } else if(!newVal) {
				        this.quill.setText('')
			        }
		        }
	        },
        }
    }
</script>
