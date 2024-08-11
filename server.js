const express = require('express');
const path = require('path');
const app = express();

// 設定靜態文件夾
app.use(express.static(path.join(__dirname, 'public')));

// 處理所有其他路由，返回 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
