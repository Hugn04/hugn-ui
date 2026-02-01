export default function getPaginationItems(
  currentPage: number,
  totalPages: number,
  maxVisible = 9
) {
  const pages = [];

  if (totalPages <= maxVisible) {
    // Trường hợp ít trang, hiển thị hết
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, 5, 6, "...", totalPages - 1, totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(
        1,
        2,
        "...",
        totalPages - 5,
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        "...",
        totalPages
      );
    }
  }

  return pages;
}
