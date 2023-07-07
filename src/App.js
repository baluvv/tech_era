import {Switch, Route} from 'react-router-dom'

import NotFound from './components/NotFound'

import CourseItemDetails from './components/CourseItemDetails'

import Home from './components/Home'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseItemDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
