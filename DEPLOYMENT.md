# 文件传输网站部署指南

这是一个基于Node.js + Socket.IO的实时文件传输网站，支持多用户房间和P2P文件传输。

## 🚀 部署选项

### 1. Vercel部署（推荐）⭐

Vercel是最适合Node.js应用的部署平台，支持自动HTTPS和全球CDN。

**步骤：**
1. 访问 [vercel.com](https://vercel.com)
2. 使用GitHub账号登录
3. 点击"Import Project"
4. 选择你的GitHub仓库
5. Vercel会自动检测到`vercel.json`配置并部署
6. 部署完成后会得到一个`.vercel.app`域名

**优势：**
- ✅ 自动HTTPS
- ✅ 全球CDN加速
- ✅ 自动部署（推送代码即自动更新）
- ✅ 免费额度充足

### 2. Railway部署

Railway是另一个优秀的Node.js部署平台。

**步骤：**
1. 访问 [railway.app](https://railway.app)
2. 使用GitHub账号登录
3. 点击"Deploy from GitHub repo"
4. 选择你的仓库
5. Railway会自动检测到`Procfile`并部署

### 3. Render部署

**步骤：**
1. 访问 [render.com](https://render.com)
2. 连接GitHub账号
3. 创建新的Web Service
4. 选择你的仓库
5. 设置构建命令：`npm install`
6. 设置启动命令：`node server.js`

### 4. Heroku部署

**步骤：**
1. 安装Heroku CLI
2. 登录：`heroku login`
3. 创建应用：`heroku create your-app-name`
4. 推送代码：`git push heroku main`

### 5. Docker部署

如果你有自己的服务器：

```bash
# 构建镜像
docker build -t file-transfer .

# 运行容器
docker run -p 9525:9525 file-transfer
```

## 🔧 环境变量配置

所有平台都支持环境变量：
- `PORT`: 服务器端口（会自动设置）
- `NODE_ENV`: production

## 📝 重要提醒

1. **端口配置**：代码已配置为自动使用平台提供的PORT环境变量
2. **Socket.IO配置**：已针对生产环境优化
3. **静态文件**：public目录会被正确服务
4. **HTTPS支持**：所有推荐平台都自动提供HTTPS

## 🎯 推荐选择

- **个人项目/演示**：Vercel（最简单）
- **需要数据库**：Railway
- **企业项目**：Render或自建Docker

## 🔗 访问方式

部署成功后，你将获得一个公网域名，任何设备都可以通过这个域名访问你的文件传输网站！

## 💡 使用提示

1. 创建房间获得6位数字房间号
2. 分享房间号给其他用户
3. 开始传输文件！

---

部署成功后，记得在GitHub仓库的README中更新你的网站链接！
