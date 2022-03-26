import React from 'react'

interface ImageProps {
  src: string
}

const Image: React.FC<ImageProps> = ({
  src
})=>{
  return <div className={`h-screen w-img-size relative bg-cover bg-no-repeat duration-150 hidden xl:w-extra-img-size lg:w-img-size lg:block md:block`} style={{backgroundImage: `url(${src})`}}>
    <div className={`overlay absolute w-full h-full`} style={{backgroundColor: `rgba(0,0,0,0.2)`}}>
    </div>
  </div>
}

export default Image

