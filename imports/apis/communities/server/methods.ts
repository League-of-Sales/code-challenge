import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Communities } from '../../../../collections/communities'
import { People } from '../../../../collections/people'

const logger = require('debug')('app:people-methods')

interface GetCommunitySummary {
  communityId: string
}

Meteor.methods({
  async 'communities.getSummary'({ communityId }: GetCommunitySummary) {
    check(communityId, String)
    logger('communities.getSummary', { communityId })

    const community = await Communities.findOneAsync({ _id: communityId })
    if (!community) {
      throw new Meteor.Error('Community was not found')
    }

    // select people in the event
    const allPeople = await People.find(
      { communityId },
      {
        fields: {
          checkInDate: 1,
          checkOutDate: 1,
          companyName: 1
        }
      }
    ).fetchAsync()

    let inTheEventNow = 0
    const byCompany: { [key: string]: number } = {}
    let notCheckedIn = 0
    allPeople.map((p) => {
      if (p.checkInDate && !p.checkOutDate) {
        inTheEventNow += 1
        if (p.companyName) {
          if (!byCompany[p.companyName]) {
            byCompany[p.companyName] = 1
          } else {
            byCompany[p.companyName] += 1
          }
        }
      } else {
        notCheckedIn += 1
      }
    })

    return {
      inTheEventNow,
      byCompany,
      notCheckedIn
    }
  }
})
