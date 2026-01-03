function getDateDetail(dateString: Date | string) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return { year, month, day };
}

function getDateWithSeparator(date: Date | string, separator: string = '') {
  const { year, month, day } = getDateDetail(date);
  return [year, String(month).padStart(2, '0'), String(day).padStart(2, '0')].join(separator);
}

export { getDateDetail, getDateWithSeparator };
