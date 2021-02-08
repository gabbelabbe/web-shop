import { useState } from "react";
import { iSlider } from "../../../shared/interface/props"
import './Slider.css'
import RightSVG from '../../../shared/images/keyboard_arrow_right-white-18dp.svg'
import LeftSVG from '../../../shared/images/keyboard_arrow_left-white-18dp.svg'

export const Slider = ({imgs}: iSlider) => {
  const [index, setIndex] = useState(0)

  const slideRight = () => {
    setIndex((index + 1) % imgs.length);
  }

  const slideLeft = () => {
    const nextIndex = index - 1
    if (nextIndex < 0) {
      setIndex(imgs.length - 1)
    } else {
      setIndex(nextIndex)
    }
  }

  return (
    imgs.length > 0 ? (
      <div className='sliderContainer'>
        <img src={LeftSVG} alt='left' onClick={slideLeft} className='arrow left' />
        <img src={imgs[index]} alt='epic pic of product' className='slideImg' />
        <img src={RightSVG} alt='right' onClick={slideRight} className='arrow right' />
      </div>
    ) : (
      <div>
        <h1>Finns inga bilder här</h1>
      </div>
    )
  )
}