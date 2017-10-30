import _ from 'lodash'
import './style.css' // 引入样式表
import MyImage from './webpack.svg' // 引入图片，图像将被处理并添加到 output 目录。

import Print from './print'

Print()

console.log(process);
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

function component() {
    // console.log(MyImage); // MyImage 变量将包含该图像在处理后的最终 url（替换后的url）。
    let element = document.createElement('div')
    element.innerHTML = _.join(['hello', 'webpack'], ' ')

    // 添加图片
    let img = new Image()
    img.classList.add('pic')
    img.src = MyImage // loader 会识别这是一个本地文件，并将 './my-image.png' 路径，替换为输出目录中图像的最终路径。
    element.appendChild(img)
    return element
}

document.body.appendChild(component())

// if (module.hot) {
//     module.hot.accept('./print.js', function () {
//         console.log('Accepting the updated printMe module!');
//         printMe();
//     })
// }