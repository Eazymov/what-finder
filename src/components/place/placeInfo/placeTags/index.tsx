import './style'

import React from 'react'

interface Props {
  tags: string[]
}

const PlaceTags = ({ tags }: Props): JSX.Element => (
  <div className="tags">
    {
      tags.map((tag: string, index: number) => (
        <a
          key={index}
          href=""
          className="tags__tag"
        >
          {tag.replace(/_/g, ' ')}
        </a>
      ))
    }
  </div>
)

export default PlaceTags
