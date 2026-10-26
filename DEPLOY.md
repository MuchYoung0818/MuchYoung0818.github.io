# 部署指南（10 分钟内上线）

## 上线前必改（3 处）

1. **你的名字**：全局搜索 `Muchyoung` 并替换（index.html 标题/顶栏/页脚 + 3 个案例页顶栏/页脚，共约 8 处）。顶栏字母方块 `M` 同步改成你名字首字母。
2. **联系方式**：`index.html` 底部联系卡（邮箱/微信）。
3. **关于段落**：`index.html` #about 区（教育背景等按真实情况补一句）。

## 方式 A：GitHub Pages（免费，推荐）

1. 注册/登录 [github.com](https://github.com)，点右上角 **+ → New repository**
2. 仓库名随意（如 `portfolio`），选 **Public** → Create
3. 在仓库页点 **uploading an existing file** 链接，把 `portfolio-site` 文件夹**里面的全部内容**（注意：不是文件夹本身）拖进去 → Commit changes
4. 仓库 **Settings → Pages** → Source 选 `Deploy from a branch`，Branch 选 `main` / `/ (root)` → Save
5. 等 1–2 分钟，访问 `https://<你的用户名>.github.io/<仓库名>/` 即为投递链接

## 方式 B：Vercel（免费，最快）

1. 打开 [vercel.com/new](https://vercel.com/new)（可用 GitHub 账号登录）
2. 把 `portfolio-site` 文件夹直接拖入页面 → Deploy
3. 几秒后得到 `xxx.vercel.app` 链接；可在 Settings → Domains 改成更好记的地址

## 更新内容

改完文件后：GitHub Pages 用户在仓库页面进入对应文件点 ✏️ 编辑并 Commit；或重新整体上传覆盖。`style.css` 链接带 `?v=1` 版本参数，改样式后把它递增为 `?v=2` 防缓存。

## 上线后自查清单

- [ ] 主页四个锚点（作品/方法论/能力/关于）可跳转
- [ ] 三个案例页顶部"返回作品"有效
- [ ] 念念原型 10 页、风云汇原型 5 页可打开且导航正常
- [ ] 7 个文档下载链接有效
- [ ] 手机打开不横向滚动
