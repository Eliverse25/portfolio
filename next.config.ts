import type { NextConfig } from "next";

// ⚙️  CẤU HÌNH BUILD — bạn (Danny) gần như không cần sửa file này.
//
// Trang được "export tĩnh" (static HTML) để chạy miễn phí trên GitHub Pages.
// - output: "export"      → xuất ra thư mục /out gồm HTML thuần.
// - images.unoptimized    → bắt buộc khi export tĩnh (không có server tối ưu ảnh).
// - trailingSlash         → mỗi trang thành 1 thư mục (vd /work/stormbit/) cho host tĩnh.
//
// basePath: chỉ cần khi deploy dạng  username.github.io/ten-repo .
// Vì bạn dùng tên miền riêng dannyxs.com nên để TRỐNG ("").
// Nếu deploy KHÔNG có tên miền riêng, đặt biến môi trường khi build:
//   NEXT_PUBLIC_BASE_PATH=/ten-repo
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
};

export default nextConfig;
