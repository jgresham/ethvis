// pass latest block and see if difficulty is 0?
export const isMergeCompleted = (latestBlock) => {
  return latestBlock.difficulty === '0'
}
