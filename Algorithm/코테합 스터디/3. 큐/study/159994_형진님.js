function solution(cards1, cards2, goal) {
  for (let i = 0; i < goal.length; i++) {
    for (let j = 0; j < goal.length; j++) {
      if (cards1[j] === goal[i]) cards1.shift()
      else if (cards2[j] === goal[i]) cards2.shift()
    }
  }

  const result = [...cards1, ...cards2]

  if (result.length)
    return !goal.some((str) => result.includes(str)) ? 'Yes' : 'No'
  else return 'Yes'
}

console.log(
  solution(
    ['i', 'drink', 'water'],
    ['want', 'to'],
    ['i', 'want', 'to', 'drink', 'water']
  )
) // "Yes"

console.log(
  solution(
    ['i', 'water', 'drink'],
    ['want', 'to'],
    ['i', 'want', 'to', 'drink', 'water']
  )
) // "No"
