// table.js
const xlsxModule = require('../../utils/xlsx/index.js');

App({
  globalData: {
    tablePage: null
  }
});

Page({
  data: {
    tableData: []
  },

  onLoad: function() {
    let storedData = wx.getStorageSync('tableData');
    if (storedData) {
      this.setData({
        tableData: storedData
      });
    }
    
    const app = getApp();
    app.globalData.tablePage = this;
  },

  updateData: function(newData) {
    wx.setStorageSync('tableData', newData);
    this.setData({
      tableData: newData
    });
  },

  insertData: function(newData) {
    let currentData = this.data.tableData;
    currentData.push(newData);
    this.updateData(currentData);
  },

  exportToExcel: function() {
    const dataToExport = this.data.tableData;
    const filename = 'tableData';

    xlsxModule.exportToExcel(dataToExport, filename);
  }
});