function solution(nums) {
  const treeSize = new Set(nums).size
  return Math.min(nums.length / 2, treeSize)
}

// solution([3, 1, 2, 3]) // 2
solution([3, 3, 3, 2, 2, 4]) // 3
// solution([3, 3, 3, 2, 2, 2]) //	2
