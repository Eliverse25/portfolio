# dannyxs.com

Bản **mirror tĩnh** (sao y giao diện) của trang portfolio https://www.dannyxs.com
— Dinh Phan Nhat Nam (Danny), UI/UX & Product Designer.

Đây là site HTML/CSS/font/ảnh thuần, **không cần build**, deploy thẳng lên GitHub Pages.
Giao diện giữ **giống hệt** trang gốc (gồm cả font tiêu đề Season Mix).

---

## 🗂️ Cấu trúc

```
index.html                ← trang chủ
cv/index.html             ← trang /cv
_components/v2/*.css       ← CSS của trang
_user_fonts/, _woff/       ← font (Season Mix, Familjen Grotesk, ...)
_assets/v11/*              ← ảnh
CNAME                      ← tên miền riêng (dannyxs.com)
.nojekyll                  ← BẮT BUỘC: để GitHub Pages phục vụ các thư mục bắt đầu bằng "_"
.github/workflows/deploy.yml ← tự động deploy khi push lên main
```

---

## ✏️ Sửa nội dung

Vì đây là bản mirror do website builder sinh ra, **chữ và bố cục nằm rải trong `index.html`**
(file lớn, style nội tuyến). Cách sửa:

- **Đổi chữ:** mở `index.html`, dùng tìm-kiếm (Ctrl/Cmd+F) theo đoạn text cần đổi rồi sửa trực tiếp.
- **Đổi ảnh:** thay file trong `_assets/v11/` (giữ nguyên tên), hoặc đổi đường dẫn ảnh trong HTML.
- **Link dự án / mạng xã hội:** tìm trong `index.html` (vd `stormbit.finance`, `apps.apple.com`...).

> Lưu ý: sửa file builder sinh ra hơi khó. Nếu cần một bản code sạch dễ sửa hơn,
> có thể dựng lại bằng React/Next.js (đánh đổi: không pixel-perfect 100%).

---

## 🔍 Xem thử trên máy

Mở terminal trong thư mục này rồi chạy một server tĩnh bất kỳ, ví dụ:

```bash
python3 -m http.server 8000
# rồi mở http://localhost:8000
```

(Lần đầu tải hơi chậm vì ảnh gốc dung lượng lớn — trên GitHub Pages sẽ nhanh hơn nhiều.)

---

## 🚀 Deploy lên GitHub Pages

Thiết lập **một lần**:

1. Tạo repository trên GitHub (tổ chức **Eliverse25**), push nhánh `main`.
2. **Settings → Pages → Build and deployment → Source** chọn **GitHub Actions**.
3. Tab **Actions** xem tiến trình (workflow `deploy.yml` tự chạy, vài phút là xong).
4. **Tên miền riêng `dannyxs.com`** (đã có sẵn `CNAME`): trỏ DNS về GitHub Pages:
   - 4 bản ghi `A` cho `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 bản ghi `CNAME` cho `www` → `eliverse25.github.io`
   Rồi vào **Settings → Pages → Custom domain**, nhập `dannyxs.com`, bật **Enforce HTTPS**.

> Nếu deploy KHÔNG dùng tên miền riêng, xoá file `CNAME`. Site sẽ chạy ở
> `https://eliverse25.github.io/<ten-repo>/` — nhưng vì các đường dẫn ảnh là tuyệt đối
> (`/_assets/...`), bản mirror hoạt động chuẩn nhất khi đặt ở **gốc tên miền** (dannyxs.com).

---

## ⚠️ Ghi chú

- **Ảnh dung lượng lớn:** trang gốc nén ảnh "on-the-fly" qua tham số `?w=...`. Host tĩnh bỏ qua
  tham số này nên phục vụ ảnh gốc (nặng hơn). Nhìn vẫn y hệt, chỉ tải nặng hơn. Có thể tối ưu sau.
- **Font Season Mix** là bản dùng thử (trial) — giữ nguyên theo yêu cầu. Cân nhắc mua license
  nếu dùng lâu dài cho mục đích thương mại.
- Mã nguồn React/Next.js (bản redesign trước đó) vẫn còn trong lịch sử git nếu cần xem lại.
```
