import React, { useContext } from 'react'
import styled from 'styled-components'
import EventsContext from './events-context'

const logger = require('debug')('app:event-selector')

const StyledEventSelector = styled.div``

interface EventSelectorProps {}

const EventSelector: React.FC<EventSelectorProps> = ({}) => {
  const { setSelectedCommunity, communities } = useContext(EventsContext)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    logger(event.target.value)
    setSelectedCommunity?.(event.target.value)
  }

  return (
    <StyledEventSelector>
      <select onChange={handleChange}>
        <option>Select an event</option>
        {communities?.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
    </StyledEventSelector>
  )
}

export default EventSelector
