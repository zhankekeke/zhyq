import serverPath from '../config/api-server-host'
import imgUploadPath from '../config/upload-server-host'
import imgPath from '../config/img-server-host'
import filePath from '../config/fileupload-server-host'

const industry = [  // 行业类别
    {label: '农、林、牧、渔业', value: '1'},
    {label: '采矿业', value: '2'},
    {label: '制造业', value: '3'},
    {label: '电力、热力、燃气及水生产和供应业', value: '4'},
    {label: '建筑业', value: '5'},
    {label: '批发和零售业', value: '6'},
    {label: '交通运输、仓储和邮政业', value: '7'},
    {label: '住宿和餐饮业', value: '8'},
    {label: '信息传输、软件和信息技术服务业', value: '9'},
    {label: '金融业', value: '10'},
    {label: '房地产业', value: '11'},
    {label: '租赁和商务服务业', value: '12'},
    {label: '科学研究和技术服务业', value: '13'},
    {label: '水利、环境和公共设施管理业', value: '14'},
    {label: '居民服务、修理和其他服务业', value: '15'},
    {label: '教育', value: '16'}, {label: '卫生和社会工作', value: '17'}, {
        label: '文化、体育和娱乐业',
        value: '18'
    }, {label: '公共管理、社会保障和社会组织', value: '19'}, {label: '国际组织', value: '20'}
];
export default {
    serverPath,
    imgPath,
    imgUploadPath,
    industry,
    filePath
}
