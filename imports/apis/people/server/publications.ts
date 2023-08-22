import { Meteor } from 'meteor/meteor'
import { People } from '../../../../collections/people'

interface PeopleByCommunityId {
  communityId: string
}
Meteor.publish(
  'people.byCommunityId',
  function ({ communityId }: PeopleByCommunityId) {
    if (!communityId) {
      return this.ready()
    }
    return People.find({
      communityId
    })
  }
)
