// module.exports = {
//     devServer: {
//       proxy: {
//         '/api/v1': {// 匹配所有以 '/api'开头的请求路径
//           target: '//47.99.134.126:28019',// 代理目标的基础路径
//           ws: true,// 支持跨域
//           changeOrigin: true,
//           pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
//             '^/api/v1': ''
//           }
//         }
//       }
//     }
//   }