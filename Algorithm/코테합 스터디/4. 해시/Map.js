let hashTable = new Map()

hashTable.set('1', '010-1111-1111')
hashTable.set('2', '010-2222-2222')

hashTable.entries((hash) => {
  console.log(hash, hashTable.get(hash))
})

console.log(hashTable.get('2'))
// 010-2222-2222

for ([key, value] of hashTable) {
  console.log(`${key}: ${value}`)
}
// 1: 010-1111-1111
// 2: 010-2222-2222

hashTable.forEach((value, key, hashTable) => {
  console.log(`${key}: ${value}`)
})

// 1: 010-1111-1111
// 2: 010-2222-2222
