import { Meteor } from 'meteor/meteor'
import { Communities } from '../../../../collections/communities'

Meteor.publish('communities.all', function () {
  return Communities.find({})
})
