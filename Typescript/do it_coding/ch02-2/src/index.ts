import IPerson from './person/IPerson'
import Person , {makePerson} from './person/Person'
// Person => export default로 불러왔기에 중괄호 필요 없음
// makePerson => export로 불러옴
import Chance from 'chance'
import * as R from 'ramda'

const chance = new Chance()
let persons: IPerson[] = R.range(0,2).map((n:number) => new Person(chance.name(), chance.age()))
console.log(persons)

const testMakePerson = () : void =>{
    let jane: IPerson = makePerson('Jane')
    let jack: IPerson = new Person('Jack')
    console.log(jane,jack)
}

testMakePerson()
