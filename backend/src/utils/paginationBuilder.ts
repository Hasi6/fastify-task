export function paginationBuilder(
  items: object,
  total: number,
  page: number,
  limit: number
) {
  return {
    data: items,
    meta: {
      limit,
      page,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
