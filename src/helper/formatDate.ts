export function formatDate(isoString: string): string {
  const date = new Date(isoString);

  // Lấy ngày, tháng, năm
  const day = String(date.getDate()).padStart(2, "0"); // Thêm số 0 phía trước nếu < 10
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
