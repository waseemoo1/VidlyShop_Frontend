import _ from "lodash";

export function paginateFunc(pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;

  return item => _(item).slice(startIndex).take(pageSize).value();
}