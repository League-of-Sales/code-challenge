import React from 'react'
import { createRoot } from 'react-dom/client'
import { Meteor } from 'meteor/meteor'
import { App } from '../ui/App'

function getRootNode(rootId) {
  const rootNode = document.getElementById(rootId)

  if (rootNode) return rootNode

  const rootNodeHtml = `<div id="${rootId}"></div>`
  const body = document.getElementsByTagName('body')[0]
  body.insertAdjacentHTML('beforeend', rootNodeHtml)

  return document.getElementById(rootId)
}

Meteor.startup(() => {
  const root = createRoot(getRootNode('app'))
  root.render(<App />)
})
