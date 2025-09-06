# 实时文件传输网站

基于 Node.js + Socket.IO 的多用户文件传输应用，支持房间系统和实时文件传输。

## 🌟 功能特点

- 🚀 **多用户房间**: 6位数字房间号，支持多人同时在线
- 📱 **跨平台支持**: 支持手机、电脑、平板等所有现代浏览器
- 🎨 **现代界面**: 美观的渐变设计，支持拖拽上传
- 📊 **实时进度**: 显示传输进度和速度
- � **用户识别**: 每个用户独有颜色标识
- �🔒 **房主系统**: 房主离线自动转移
- 💨 **稳定传输**: Socket.IO确保大文件传输稳定
- 🖼️ **文件预览**: 支持图片、视频、音频文件预览

## 🚀 在线访问

**网站地址**: [点击访问](你的部署域名)

## 📋 本地开发

### 安装依赖
```bash
npm install
```

### 启动服务
```bash
npm start
```

服务将在 http://localhost:3000 启动

### 使用方法

1. **设备A**: 打开网页，点击"创建房间"，获得房间号
2. **设备B**: 输入房间号，点击"加入房间"
3. 连接成功后，任意一方都可以选择文件进行传输

## 部署到服务器

### 1. 传统服务器部署

```bash
# 上传文件到服务器
scp -r . user@your-server:/path/to/app

# 在服务器上安装依赖
npm install

# 使用 PM2 启动服务
npm install pm2 -g
pm2 start server.js --name "file-transfer"
```

### 2. Docker 部署

```bash
# 构建镜像
docker build -t file-transfer .

# 运行容器
docker run -p 3000:3000 -d file-transfer
```

### 3. Vercel 部署

```bash
# 安装 Vercel CLI
### 启动服务
```bash
npm start
```

服务器将在 http://localhost:9525 启动

## 🌐 部署到线上

### 方法1: Vercel部署（推荐）

1. Fork或上传代码到GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 使用GitHub登录
4. 导入你的仓库
5. 自动部署完成！

### 方法2: Railway部署

1. 访问 [railway.app](https://railway.app)
2. 连接GitHub仓库
3. 一键部署

### 方法3: 其他平台

支持部署到 Render、Heroku 等平台，详见 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **后端**: Node.js, Express
- **实时通信**: Socket.IO
- **文件传输**: Socket.IO + 分块传输

## 📖 使用说明

1. **创建房间**: 点击"创建房间"获得6位数字房间号
2. **加入房间**: 其他用户输入房间号加入
3. **传输文件**: 拖拽文件或点击上传
4. **实时协作**: 多用户同时在线，实时文件传输

## ⚠️ 注意事项

- 支持最大100MB文件传输
- 现代浏览器支持（Chrome 60+, Firefox 55+, Safari 11+）
- 文件传输通过服务器中转，确保稳定性
- 需要 HTTPS 环境（生产环境）

## 许可证

MIT License
