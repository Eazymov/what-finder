import './style'

import React from 'react'

import { withBem } from 'Utils/decorators'
import { BemProps } from 'Types'

interface Props {
  activePage: string
  changePage: () => void
}

const PlaceControls = (props: Props & BemProps): JSX.Element => {
  const activePage: string = props.activePage
  const changePage: () => void = props.changePage
  const { block, element } = props.bem

  return (
    <div className={block()} onClick={changePage}>
      <button
        className={`material-icons ${element('show-reviews-btn', {
          active: activePage === 'info'
        })}`}
      >
        comment
      </button> 
      <button
        className={`material-icons ${element('show-info-btn', {
          active: activePage === 'reviews'
        })}`}
      >
        info_outline
      </button> 
    </div>
  )
}

export default withBem<Props>('controls')(PlaceControls)
