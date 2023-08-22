import React, { useContext } from 'react'
import styled from 'styled-components'
import EventsContext from './events-context'
import PersonRow from './person'

const logger = require('debug')('app:people')

const StyledPeopleListing = styled.div`
  table {
    width: 100%;
    thead {
      td {
        border-bottom: 1px solid #ccc;
        font-weight: bold;
      }
    }
  }
`

interface PeopleListingProps {}

const PeopleListing: React.FC<PeopleListingProps> = ({}) => {
  const { selectedCommunity, people } = useContext(EventsContext)

  if (!selectedCommunity) {
    return null
  }

  return (
    <StyledPeopleListing>
      <table>
        <thead>
          <tr>
            <td>Full name</td>
            <td>Company name</td>
            <td>Title</td>
            <td>Check-in</td>
            <td>Check-out</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {people?.map((p) => <PersonRow key={p._id} person={p} />)}
        </tbody>
      </table>
    </StyledPeopleListing>
  )
}

export default PeopleListing
