# dannyxs.com

Portfolio của **Dinh Phan Nhat Nam (Danny)** — UI/UX & Product Designer.

Thiết kế nguyên bản (lấy cảm hứng cấu trúc từ deuxhuithuit.com): tường ảnh dự án
full màn hình → sidebar icon → statement + reel + các section Services / About /
Experience / Contact, drawer Work với chi tiết từng dự án, và trang Hire me dạng chat.

- **Stack:** HTML/CSS/JS thuần, font self-host (Instrument Sans), ảnh WebP.
- **Deploy:** GitHub Pages (workflow `.github/workflows/deploy.yml`, không cần build) — push lên `main` là tự deploy.
- **Domain:** dannyxs.com (file `CNAME`, DNS trỏ GitHub Pages).

## Sửa nội dung
- Chữ, section: `index.html`
- Dự án (mô tả, what-i-did, link, store badge): object `PROJECTS` trong `assets/main.js`
- Ảnh wall: `assets/wall/` (thêm ảnh mới rồi cập nhật danh sách trong `index.html`)
- Cover dự án: `assets/work/`
- Màu/typography: biến `:root` trong `assets/styles.css`

> Bản site cũ (mirror Figma Sites) và bản redesign Next.js đầu tiên vẫn nằm trong
> git history nếu cần khôi phục.
