import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { People } from '../../../../collections/people'

const logger = require('debug')('app:people-methods')

interface PeopleCheckIn {
  personId: string
}
interface PeopleCheckOut {
  personId: string
}

Meteor.methods({
  async 'people.checkIn'({ personId }: PeopleCheckIn) {
    check(personId, String)
    logger('people.checkIn', { personId })

    const person = await People.findOneAsync({ _id: personId })
    if (!person) {
      throw new Meteor.Error('Person was not found')
    }

    if (person.checkInDate) {
      return
    }

    await People.updateAsync(
      {
        _id: personId
      },
      {
        $set: {
          checkInDate: new Date()
        }
      }
    )
  },
  async 'people.checkOut'({ personId }: PeopleCheckOut) {
    check(personId, String)

    logger('people.checkOut', { personId })

    const person = await People.findOneAsync({ _id: personId })
    if (!person) {
      throw new Meteor.Error('Person was not found')
    }

    if (!person.checkInDate) {
      throw new Meteor.Error('Person must be checked in before check out')
    }

    if (person.checkOutDate) {
      return
    }

    await People.updateAsync(
      {
        _id: personId
      },
      {
        $set: {
          checkOutDate: new Date()
        }
      }
    )
  }
})
