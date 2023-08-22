import { Meteor } from 'meteor/meteor'
import { loadInitialData } from './initial-data'
import './register-apis'

Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData()

  // YOU CAN DO WHATEVER YOU WANT HERE
})
