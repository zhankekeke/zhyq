import $global from '../../../../src/libs/Global';
import {http} from '../../../../src/libs/http';
import $iView from 'iview';

const uploadConfig = {
    action:  $global.imgUploadPath,  // 必填参数 图片上传地址
    methods: 'POST',  // 必填参数 图片上传方式
    token: '',  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
    name: 'file',  // 必填参数 文件的参数名
    size: 1024*1024*10,  // 可选参数   图片大小，单位为KB, 1M = 1024B*1024
    accept: 'image/jpeg, image/png, image/jpg, image/gif'  // 可选 可上传的图片格式
};


// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote'],
    [{'header': 1}, {'header': 2}],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],
    [{'indent': '-1'}, {'indent': '+1'}],
    [{'direction': 'rtl'}],
    [{'size': ['small', false, 'large', 'huge']}],
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    [{'color': []}, {'background': []}],
    [{'font': []}],
    [{'align': []}],
    ['image'],
    ['code'],
];
const handlers = {
    shadeBox: null,
    image: function image() {
        var self = this;

        var fileInput = this.container.querySelector('input.ql-image[type=file]');
        if (fileInput === null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            // 设置图片参数名
            if (uploadConfig.name) {
                fileInput.setAttribute('name', uploadConfig.name);
            }
            // 可设置上传图片的格式
            fileInput.setAttribute('accept', uploadConfig.accept);

            fileInput.classList.add('ql-image');
            // 监听选择文件
            fileInput.addEventListener('change', function () {
                if(fileInput.files[0].size>uploadConfig.size){
                    $iView.Message.error('图片大小不能大于10MB');
                    return false;
                }else{
                    // 创建formData
                    var formData = new FormData();
                    formData.append(uploadConfig.name, fileInput.files[0]);
                    // 如果需要token且存在token
                    if (uploadConfig.token) {
                        formData.append('token', uploadConfig.token)
                    }
                    // 图片上传
                    http({
                        method: uploadConfig.methods,
                        url: uploadConfig.action,
                        data: formData
                    }).then(rsp => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                let url = $global.imgPath + rsp.data.data;
                                //这里很重要，你图片上传成功后，img的src需要在这里添加，url就是你服务器返回的图片链接。
                                self.quill.insertEmbed(self.quill.getSelection().index, 'image', url);
                                // self.quill.setSelection(length + 1)
                                // self.editor.insertEmbed(self.editor.getSelection().index, 'image', url)
                            }
                            fileInput.value = ''
                        }
                    });
                }

            });
            this.container.appendChild(fileInput);
        }
        fileInput.click();
    },
    code: function code() {
        const container = this.container;
        const firstChild = container.nextElementSibling.firstChild;

        if(!this.shadeBox){
            this.shadeBox = true;

            firstChild.style.cssText = 'background-color: #23241f;color: #f8f8f2;overflow: visible;';
            container.style.position  = 'relative';

            firstChild.innerText = firstChild.innerHTML;
        }else {
            this.shadeBox = false;
            firstChild.style.cssText = ' ';
            firstChild.innerHTML = firstChild.innerText.trim();
        }
    },
};

export default {
    placeholder: '',
    theme: 'snow',  // 主题
    modules: {
        toolbar: {
            container: toolOptions,  // 工具栏选项
            handlers: handlers  // 事件重写
        }
    },

};