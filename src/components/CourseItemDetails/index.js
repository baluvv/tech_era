import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class CourseItemDetails extends Component {
  state = {courseDetails: {}, apiStatus: 'INITIAL'}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiConstants.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        courseDetails: updatedData,
        apiStatus: apiConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderCourseDetailsSuccessView = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails
    return (
      <div className="course-details-card">
        <img src={imageUrl} alt={name} className="course-detail-img" />
        <div>
          <h1 className="course-detail-heading">{name}</h1>
          <p className="course-detail-description">{description}</p>
        </div>
      </div>
    )
  }

  renderCourseDetailsFailureView = () => (
    <div className="course-detail-fail-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-line">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getCourseDetails}
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
        return this.renderCourseDetailsSuccessView()
      case apiConstants.failure:
        return this.renderCourseDetailsFailureView()
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
        <div className="course-details-container">
          {this.renderResultView()}
        </div>
      </>
    )
  }
}

export default CourseItemDetails
