import React from 'react'
import { TEXTS } from '../shared/constants'
import { EventsProvider } from './components/events-context'
import EventSelector from './components/event-selector'
import PeopleListing from './components/people'
import Summary from './components/summary'

export const App = () => (
  <div>
    <h1>{TEXTS.HOME_TITLE}</h1>
    <EventsProvider>
      <EventSelector />
      <Summary />
      <PeopleListing />
    </EventsProvider>
  </div>
)
