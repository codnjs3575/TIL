// ch02-2/src/utils/makeRandomNumber.ts
let MAX_AGE = 100

export function makeRandomNumber(max: number = MAX_AGE) : number{
    return Math.ceil((Math.random() * max))
}