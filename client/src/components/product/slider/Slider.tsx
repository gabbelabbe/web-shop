import { iSlider } from "../../../shared/interface/props"
import { useState } from "react"
import { Slide } from './slide/Slide'

export const Slider = ({imgs}: iSlider) => {
  const [translateValue, setTranslateValue] = useState(0)

  return (
    <div className='sliderContainer' style={{transform: `translateX(${translateValue}px)`}}>
      {
        imgs.map(img => <Slide />)
      }
    </div>
  )
}