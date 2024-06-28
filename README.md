临时文件的路径是wx.env.TEMP_FILE_PATH，能写入但是不能读取保存。所以该用了用户文件目录wx.env.USER_FILE_PATH。

我原来的步骤是这样的：
  1. 创建工作簿和工作表：使用 XLSX.utils.book_new() 和 XLSX.utils.json_to_sheet()。
  2. 写入临时文件：使用 wx.getFileSystemManager().writeFile 将 Excel 数据写入临时文件。
  3. 保存文件：使用 wx.getFileSystemManager().saveFile 将临时文件保存到用户数据路径。

能够正常使用的只有pc和安卓，都能用第三方软件查看保存的excel文件，但是ios却无法查看。可能是因为临时文件路径肯呢个存在权限或兼容性问题

然后我更新了一下步骤：
  1. 创建工作簿和工作表：相同，使用 XLSX.utils.book_new() 和 XLSX.utils.json_to_sheet()。
  2. 直接保存文件：使用 wx.getFileSystemManager().writeFileSync 直接将 Excel 数据写入目标路径，无需临时文件。
  3. 文件操作选项：在文件保存成功后，提供预览和转发文件的选项。

直接使用 writeFileSync 方法将数据写入目标路径，避免了临时文件路径的问题，同时也简化了操作流程
