// utils/xlsx/index.js
var XLSX = require('./xlsx.full.min');

module.exports = {
  exportToExcel: function(data, filename) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fs = wx.getFileSystemManager();
    const savePath = `${wx.env.USER_DATA_PATH}/${filename}.xlsx`;
  
    // 列出临时文件目录的内容
    fs.readdir({
      dirPath: wx.env.USER_DATA_PATH,
      success: (res) => {
        console.log('目录内容:', res);
  
        // 使用 writeFileSync 写入文件
        try {
          fs.writeFileSync(savePath, excelBuffer, 'binary');
          console.log('文件保存成功', savePath);
  
          wx.showToast({
            title: '文件已保存',
            icon: 'success',
            duration: 2000
          });
  
          // 提供预览和转发文件选项
          wx.showModal({
            title: '文件保存成功',
            content: `文件路径: ${savePath}\n是否预览文件或转发文件？`,
            confirmText: '预览',
            cancelText: '转发',
            success: function(res) {
              if (res.confirm) {
                wx.openDocument({
                  filePath: savePath,
                  fileType: 'xlsx',
                  success: function(res) {
                    console.log('文件预览成功', res);
                  },
                  fail: function(error) {
                    console.log('文件预览失败', error);
                  }
                });
              } else if (res.cancel) {
                wx.shareFileMessage({
                  filePath: savePath,
                  success: function(res) {
                    console.log('文件转发成功', res);
                  },
                  fail: function(error) {
                    console.log('文件转发失败', error);
                  }
                });
              }
            }
          });
        } catch (error) {
          console.log('写入文件失败', error);
        }
      },
      fail: (error) => {
        console.log('读取目录失败', error);
      }
    });
  }



  // 电脑可以完全使用功能，但是手机会文件保存失败
  // exportToExcel: function(data, filename) {
  //   const wb = XLSX.utils.book_new();
  //   const ws = XLSX.utils.json_to_sheet(data);
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  //   const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  //   const fs = wx.getFileSystemManager();
  //   const tempFilePath = `${wx.env.USER_DATA_PATH}/${filename}.xlsx`;
  
  //   // Create a temporary file and write the buffer to this file
  //   fs.writeFile({
  //     filePath: tempFilePath,
  //     data: excelBuffer,
  //     encoding: 'binary',
  //     success: function(res) {
  //       console.log('临时文件写入成功', res);
  
  //       // Save the temporary file to a permanent path
  //       const savePath = `${wx.env.USER_DATA_PATH}/${filename}_saved.xlsx`;
  //       fs.saveFile({
  //         tempFilePath: tempFilePath,
  //         filePath: savePath,
  //         success: function(res) {
  //           const savedFilePath = res.savedFilePath;
  //           console.log('文件保存成功', savedFilePath);
  
  //           wx.showToast({
  //             title: '文件已保存',
  //             icon: 'success',
  //             duration: 2000
  //           });
  
  //           // 提供预览文件选项
  //           wx.showModal({
  //             title: '文件保存成功',
  //             content: `文件路径: ${savedFilePath}\n是否预览文件？`,
  //             success: function(res) {
  //               if (res.confirm) {
  //                 wx.openDocument({
  //                   filePath: savedFilePath,
  //                   fileType: 'xlsx',
  //                   success: function(res) {
  //                     console.log('文件预览成功', res);
  //                   },
  //                   fail: function(error) {
  //                     console.log('文件预览失败', error);
  //                   }
  //                 });
  //               }
  //             }
  //           });
  //         },
  //         fail: function(error) {
  //           console.log('保存文件失败', error);
  //         }
  //       });
  //     },
  //     fail: function(error) {
  //       console.log('写入临时文件失败', error);
  //     }
  //   });
  // }
};