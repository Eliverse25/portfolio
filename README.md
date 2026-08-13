# dannyxs.com

Portfolio của Danny — layout kiểu "productivity app": sidebar bên trái là danh sách project (mỗi project một tab), cuộn chuột để lật qua từng trang, panel bên phải mô tả chi tiết. Lấy cảm hứng từ yanhladchenko.com.

Site tĩnh 100% (HTML/CSS/JS thuần), deploy tự động lên GitHub Pages tại **https://dannyxs.com** mỗi khi push lên nhánh `main`.

## Sửa nội dung ở đâu?

| Muốn sửa | Mở file | Tìm |
| --- | --- | --- |
| Chữ trên trang (tên project, mô tả, năm, link…) | `index.html` | Mỗi project là một `<section id="...">`, có chú thích `<!-- TÊN PROJECT -->` |
| Thư "Dear visitor" (mục About) | `assets/main.js` | Biến `LETTER` ở đầu file |
| Email nhận liên hệ | `assets/main.js` | Biến `EMAIL` |
| Câu chào ("Good evening, I'm Danny!") | `assets/main.js` | Mục "typed greeting" |
| Màu sắc, cỡ chữ, bo góc | `assets/styles.css` | Các biến trong `:root` ở đầu file |
| CV | Thay file `assets/CV-2026.pdf` (giữ nguyên tên) | |
| Ảnh project | `assets/wall/` (t01–t48) — đổi ảnh nào thì giữ nguyên tên file đó | |
| Icon project trong sidebar | `assets/icons/*.svg` | |
| Mạng xã hội (LinkedIn / X / Telegram) | `index.html` | Tìm `href="#"` trong phần `homelinks` — thay `#` bằng link thật |

## Cấu trúc

- `index.html` — toàn bộ nội dung trang (desktop + mobile)
- `assets/styles.css` — giao diện
- `assets/main.js` — hành vi: đồng hồ, gõ chữ, tìm kiếm (⌘K), lật trang, video, carousel ảnh, About, mobile
- `assets/wall/`, `assets/work/` — ảnh dự án; `assets/reel.mp4` — video reel
- `.github/workflows/deploy.yml` — tự deploy lên GitHub Pages

Phiên bản cũ (tường ảnh + hire chat, và bản mirror Figma Sites) vẫn nằm trong lịch sử git.
