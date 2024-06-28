import React from 'react'

const HeadingWrapper = ({val}) => {
  return (
    <div className="flex items-center justify-center">
    <div className="border-secondary border-b-4  text-2xl font-semibold text-blue mt-8">
      {val}
    </div>
  </div>
  )
}

export default HeadingWrapper