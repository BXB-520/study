import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Route, Switch } from 'react-router-dom'
import './AnimatedSwitch.less'
 
const AnimatedSwitch = (props: { type?: any; duration?: any; children?: any }) => {
  const { children } = props
  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames={props.type || 'fade'} 
            timeout={props.duration || 300}
          >
            <Switch location={location}>{children}</Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  )
}
 
export default AnimatedSwitch