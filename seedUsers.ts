import fs from 'fs'
import { faker } from '@faker-js/faker'
import type { User } from './src/entities/user/model/types'

const NUM_USERS = 10000

const interestsPool = [
  'music',
  'react',
  'hiking',
  'travel',
  'gaming',
  'reading',
  'sports',
  'cooking',
  'art',
  'photography',
]

const users: User[] = Array.from({ length: NUM_USERS }).map(() => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  lat: faker.location.latitude(),
  lon: faker.location.longitude(),
  interests: faker.helpers.arrayElements(
    interestsPool,
    faker.number.int({ min: 1, max: 4 })
  ),
}))

fs.writeFileSync('src/data/users.json', JSON.stringify(users, null, 2))
console.log('Seed users.json created ✅')
