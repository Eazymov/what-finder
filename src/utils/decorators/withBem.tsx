import React from 'react'

import getDisplayName from './getDisplayName'
import { Bem } from 'Utils'

interface BemProps {
  bem: Bem
}

function withBem<OwnProps>(blockName: string) {
  const bem: Bem = new Bem(blockName)

  type Props = OwnProps & BemProps;

  return function(
    Comp: React.SFC<Props> | React.ComponentClass<Props>
  ) {
    const WithBem: React.SFC<OwnProps> = (props: OwnProps) => (
      <Comp {...props} bem={bem} />
    )
    
    WithBem.displayName = `WithBem(${getDisplayName(Comp)})`

    return WithBem
  }
}

export {
  BemProps,
}

export default withBem
