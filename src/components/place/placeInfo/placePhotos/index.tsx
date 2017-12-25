import './style'

import React, { Component } from 'react'

import { PlacePhoto } from 'Types'

interface Props {
  photos: PlacePhoto[]
}

interface State {
  expanded: boolean
}

class PlacePhotos extends Component<Props, State> {
  public state = {
    expanded: false
  }

  render (): JSX.Element {
    const photos: PlacePhoto[] = this.props.photos
    const expanded: boolean = this.state.expanded
    const className: string = expanded ? 'expanded' : ''
    const actionButton = (
      <button className="toggle-btn" onClick={this.toggle}>
        {expanded ? 'Hide' : 'Show more'}
      </button>
    )

    return (
      <div className="photos">
        <div
          onClick={() => this.setState({ expanded: true })}
          className={`photos__list ${className}`}
        >
          { photos.map((photo: PlacePhoto, index: number) => {
              const photoOptions = { maxWidth: 150, maxHeight: 100 }

              return (
                <span key={index} className="photos__list__photo">
                  <img src={photo.getUrl(photoOptions)} alt="Photo" />
                </span>
              )
          } )}
        </div>
        <div className="photos__actions">
          {photos.length > 3 && actionButton}
        </div>
      </div>
    )
  }
  
  private toggle = (): void => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }))
  }
}

export default PlacePhotos