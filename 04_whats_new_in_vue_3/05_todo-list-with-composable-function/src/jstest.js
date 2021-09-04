const person = { name: 'Natsumi' }

const { name: personName } = person
console.log(personName)

const { person: newPerson } = { person }
console.log(newPerson.name)
