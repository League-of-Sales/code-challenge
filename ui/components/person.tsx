import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { format, subSeconds } from 'date-fns'
import { Person } from '../../imports/types/person'
import EventsContext from './events-context'

const logger = require('debug')('app:person')

const StyledPersonRow = styled.tr`
  td {
    border-bottom: 1px solid #ccc;
  }
`

interface PersonRowProps {
  person: Person
}

const PersonRow: React.FC<PersonRowProps> = ({ person }: PersonRowProps) => {
  const abortController = useRef(new AbortController())
  useEffect(() => {
    return () => {
      logger('unmounted')
      abortController.current.abort()
    }
  }, [])

  const { checkIn, checkOut } = useContext(EventsContext)

  const [loading, setLoading] = useState(false)
  const [, rerender] = useState<number>()

  const renderAction = () => {
    if (!person.checkInDate) {
      return (
        <button
          onClick={async () => {
            logger('check in', person)
            setLoading(true)
            await checkIn?.({ personId: person._id })
            if (!abortController.current.signal.aborted) {
              setLoading(false)
            }
          }}
          disabled={loading}
        >
          Check-in {`${person.firstName} ${person.lastName}`}
        </button>
      )
    }
    if (!person.checkOutDate) {
      if (subSeconds(new Date(), 5) > person.checkInDate) {
        return (
          <button
            onClick={async () => {
              logger('check out', person)
              setLoading(true)
              await checkOut?.({ personId: person._id })
              if (!abortController.current.signal.aborted) {
                setLoading(false)
              }
            }}
            disabled={loading}
          >
            Check-out {`${person.firstName} ${person.lastName}`}
          </button>
        )
      } else {
        setTimeout(
          () => {
            logger('call rerender')
            if (!abortController.current.signal.aborted) {
              rerender(Math.random)
            }
          },
          5000 - new Date().getTime() + person.checkInDate.getTime()
        )
      }
    }
    return null
  }

  return (
    <StyledPersonRow>
      <td>{`${person.firstName} ${person.lastName}`}</td>
      <td>{person.companyName}</td>
      <td>{person.title}</td>
      <td>
        {person.checkInDate
          ? format(person.checkInDate, 'MM/dd/yyyy, HH:mm')
          : 'N/A'}
      </td>
      <td>
        {person.checkOutDate
          ? format(person.checkOutDate, 'MM/dd/yyyy, HH:mm')
          : 'N/A'}
      </td>
      <td>{renderAction()}</td>
    </StyledPersonRow>
  )
}

export default PersonRow
