# dannyxs.com — Portfolio

Trang portfolio cá nhân của **Dinh Phan Nhat Nam (Danny)** — UI/UX & Product Designer.
Xây bằng Next.js + Tailwind CSS, xuất ra HTML tĩnh và chạy miễn phí trên **GitHub Pages**.

---

## ✏️ Sửa nội dung (không cần biết code)

Gần như mọi chữ, dự án, link liên hệ đều nằm trong **một file duy nhất**:

```
src/content/site.ts
```

Mở file đó, sửa phần trong dấu nháy `"..."`. Có chú thích tiếng Việt ở từng phần:
tên, tagline, email, mạng xã hội, danh sách dự án, quy trình, giải thưởng.

**Đổi/thêm ảnh dự án:** bỏ ảnh vào thư mục `public/work/` rồi trỏ đường dẫn trong
`site.ts` (ví dụ `/work/ten-anh.png`). Ảnh nên rộng tối đa ~1800px cho nhẹ.

> ⚠️ Nhớ đổi `email` trong `site.ts` và các link mạng xã hội thành thông tin thật của bạn.

---

## 💻 Chạy thử trên máy

Cần cài [Node.js](https://nodejs.org) (bản 20 trở lên).

```bash
npm install      # chỉ chạy lần đầu
npm run dev      # mở http://localhost:3000
```

Sửa file và lưu — trang tự cập nhật.

Build bản tĩnh để kiểm tra (xuất ra thư mục `out/`):

```bash
npm run build
```

---

## 🚀 Đưa lên mạng (GitHub Pages)

Mỗi lần bạn `push` code lên nhánh `main`, GitHub tự build và cập nhật trang
(nhờ file `.github/workflows/deploy.yml`). Các bước thiết lập **một lần**:

1. Tạo repository trên GitHub (tài khoản/tổ chức **Eliverse25**) và đẩy code lên `main`.
2. Vào **Settings → Pages**, mục **Build and deployment → Source** chọn **GitHub Actions**.
3. Vào tab **Actions** xem tiến trình deploy (vài phút là xong).
4. **Tên miền riêng** (`dannyxs.com`): đã có sẵn file `public/CNAME`. Vào nhà cung cấp
   tên miền, trỏ DNS về GitHub Pages:
   - 4 bản ghi `A` cho `@` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - 1 bản ghi `CNAME` cho `www` → `eliverse25.github.io`
   Rồi vào **Settings → Pages → Custom domain**, nhập `dannyxs.com` và bật **Enforce HTTPS**.

> Nếu deploy KHÔNG dùng tên miền riêng (dạng `eliverse25.github.io/ten-repo`):
> build bằng lệnh `NEXT_PUBLIC_BASE_PATH=/ten-repo npm run build` và xoá file `public/CNAME`.

---

## 🗂️ Cấu trúc nhanh

```
src/content/site.ts        ← NỘI DUNG (sửa ở đây)
src/app/page.tsx           ← trang chủ (hero, work, process, about, contact)
src/app/work/[slug]/       ← trang chi tiết từng dự án
src/components/            ← các khối giao diện dùng lại (nav, footer, card...)
public/work/               ← ảnh các dự án
.github/workflows/deploy.yml ← tự động deploy
```
