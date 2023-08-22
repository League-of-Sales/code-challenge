import { Mongo } from 'meteor/mongo'

import { Person } from '../imports/types/person'

export const People = new Mongo.Collection<Person>('people')
