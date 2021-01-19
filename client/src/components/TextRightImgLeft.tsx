import { SplitViewProps } from '../shared/interface/props'

export const TextRightImgLeft = ({ img, text, title }: SplitViewProps) => {
  return (
    <div className='textImgSplit'>
      <img src={img}></img>
      <div>
        {title ? <h2>{title}</h2> : null}
        {text ? <p>{text}</p> : null}
      </div>
    </div>
  )
}