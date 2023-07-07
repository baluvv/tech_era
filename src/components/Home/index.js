import {Component} from 'react'

import Loader from 'react-loader-spinner'

import CourseItem from '../CourseItem'

import Header from '../Header'

import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class Home extends Component {
  state = {coursesList: [], apiStatus: 'INITIAL'}

  componentDidMount() {
    this.getCoursesList()
  }

  getCoursesList = async () => {
    this.setState({apiStatus: apiConstants.inprogress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {method: 'GET'}
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const {courses} = data
      const updatedData = courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))
      this.setState({coursesList: updatedData, apiStatus: apiConstants.success})
    }
    if (response.status === 401 || response.status === 404) {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderHomeSuccessView = () => {
    const {coursesList} = this.state
    return (
      <div className="home-success-container">
        <h1 className="home-heading">Courses</h1>
        <ul className="courses-list-container">
          {coursesList.map(eachCourse => (
            <CourseItem courseDetails={eachCourse} key={eachCourse.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderHomeFailureView = () => (
    <div className="home-fail-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-line">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getCoursesList}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderHomeSuccessView()
      case apiConstants.failure:
        return this.renderHomeFailureView()
      case apiConstants.inprogress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">{this.renderResultView()}</div>
      </>
    )
  }
}

export default Home
