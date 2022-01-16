const generateYearRange = (startYear, endYear, sortBy = 'desc') => {
  const years = []
  for (let year = startYear; year <= endYear; year++) {
    years.push({ year })
  }
  return sortBy === 'desc' ? years.reverse() : years
}

export default generateYearRange
