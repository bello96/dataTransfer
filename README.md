# 局域网文件快传

基于 WebRTC 的点对点文件传输应用，无需服务器中转文件，支持局域网内高速传输。

## 功能特点

- 🚀 **点对点传输**: 文件直接在设备间传输，不经过服务器
- 📱 **跨平台支持**: 支持手机、电脑、平板等所有现代浏览器
- 🎨 **现代界面**: 美观的渐变设计，支持拖拽上传
- 📊 **实时进度**: 显示传输进度和速度
- 🔒 **安全可靠**: 房间号机制确保只有知道房间号的设备才能连接
- 💨 **高速传输**: 局域网内可达到网络最大速度

## 快速开始

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
npm install -g vercel

# 部署
vercel
```

## 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **后端**: Node.js, Express
- **实时通信**: Socket.IO
- **P2P连接**: WebRTC

## 注意事项

- 确保设备在同一局域网内
- 现代浏览器支持（Chrome 60+, Firefox 55+, Safari 11+）
- 建议文件大小不超过 500MB
- 需要 HTTPS 环境（生产环境）

## 许可证

MIT License
