import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'
import EventsContext from './events-context'

const logger = require('debug')('app:summary')

const StyledSummary = styled.div``

interface SummaryProps {}

const Summary: React.FC<SummaryProps> = ({}) => {
  const { selectedCommunity, people } = useContext(EventsContext)

  const { inTheEventNow, byCompany, notCheckedIn } = useMemo(() => {
    let inTheEventNow = 0
    const byCompany: { [key: string]: number } = {}
    let notCheckedIn = 0
    people?.map((p) => {
      if (p.checkInDate && !p.checkOutDate) {
        inTheEventNow += 1
        if (p.companyName) {
          if (!byCompany[p.companyName]) {
            byCompany[p.companyName] = 1
          } else {
            byCompany[p.companyName] += 1
          }
        }
      }
      if (!p.checkInDate) {
        notCheckedIn += 1
      }
    })
    return {
      inTheEventNow,
      byCompany,
      notCheckedIn
    }
  }, [people])

  if (!selectedCommunity) {
    return null
  }

  const renderCompanies = () => {
    const data = Object.keys(byCompany).map((c) => {
      return `${c} (${byCompany[c]})`
    })
    return data.join(', ')
  }

  return (
    <StyledSummary>
      <div>People in the event right now: {inTheEventNow}</div>
      <div>People by company in the event right now: {renderCompanies()}</div>
      <div>People not checked-in: {notCheckedIn}</div>
    </StyledSummary>
  )
}

export default Summary
