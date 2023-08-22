import React, { ReactNode, useState } from 'react'
import debug from 'debug'
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import { People } from '/collections/people'
import { Communities } from '/collections/communities'
import { Community } from '/imports/types/community'
import { Person } from '/imports/types/person'

const logger = debug('app:event-context')

interface CheckIn {
  personId: string
}
interface CheckOut {
  personId: string
}

type EventsContextType = {
  selectedCommunity?: string
  setSelectedCommunity: React.Dispatch<React.SetStateAction<string | undefined>>
  loadingCommunities: boolean
  communities?: Community[]
  loadingPeople: boolean
  people?: Person[]
  checkIn: ({ personId }: CheckIn) => Promise<void>
  checkOut: ({ personId }: CheckOut) => Promise<void>
}

const EventsContext = React.createContext<Partial<EventsContextType>>({})

interface EventsProviderPropsType {
  children: ReactNode | ReactNode[]
}

export const EventsProvider = ({ children }: EventsProviderPropsType) => {
  const [selectedCommunity, setSelectedCommunity] = useState<string>()

  const { loading: loadingCommunities, communities } = useTracker(() => {
    const sub = Meteor.subscribe('communities.all', {})
    return {
      loading: !sub.ready(),
      communities: Communities.find({}).fetch()
    }
  }, [])

  const { loading: loadingPeople, people } = useTracker(() => {
    logger(selectedCommunity)
    const sub = Meteor.subscribe('people.byCommunityId', {
      communityId: selectedCommunity
    })
    return {
      loading: !sub.ready(),
      people: People.find({ communityId: selectedCommunity }).fetch()
    }
  }, [selectedCommunity])

  const checkIn = async ({ personId }: CheckIn) => {
    logger('check in')
    try {
      await Meteor.callAsync('people.checkIn', { personId })
    } catch (err) {
      // TODO: show error
    }
  }

  const checkOut = async ({ personId }: CheckOut) => {
    try {
      await Meteor.callAsync('people.checkOut', { personId })
    } catch (err) {
      // TODO: show error
    }
  }

  return (
    <EventsContext.Provider
      value={{
        selectedCommunity,
        setSelectedCommunity,
        loadingCommunities,
        communities,
        loadingPeople,
        people,
        checkIn,
        checkOut
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}

export const EventsConsumer = EventsContext.Consumer

export default EventsContext
