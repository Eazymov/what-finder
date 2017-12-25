const decorateName = (component: any): string => {
  const { displayName, name } = component

  return displayName || name || 'Component'
}

export default decorateName
