function createObjectURL(object) {
    return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
}

function output(url, params, name) {
    let query = ''
    if (params && Object.keys(params).length > 0) {
        let keys = Object.keys(params);
        let arr = [];
        keys.map(item => {
            arr.push(`${item}=${params[item]}`)
        })
        query = arr.join('&')
    }
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    xhr.open('get', `${url}?${query}`);  //url填写后台的接口地址，如果是post，在formData append参数（参考原文地址）
    xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
    xhr.responseType = 'blob';
    xhr.onload = function (e) {
        if (this.status == 200) {
            let blob = this.response;
            let filename = `${name}.xlsx`;  //这里的名字，可以按后端给的接口固定表单设置一下名字，如（费用单.xlsx,合同.doc等等）
            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob, filename);
            } else {
                let a = document.createElement('a');
                let url = createObjectURL(blob);
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            }

        }
    };
    xhr.send(formData);
}

export {
    output
};