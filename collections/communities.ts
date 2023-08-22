import { Mongo } from 'meteor/mongo'

import { Community } from '../imports/types/community'

export const Communities = new Mongo.Collection<Community>('communities')
