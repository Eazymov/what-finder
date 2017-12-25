const getAvg = (items: number[]): number => {
  const sum: number = items.reduce((prev: number, cur: number) => {
    return prev + cur
  }, 0)

  return sum / items.length
}

export default getAvg
