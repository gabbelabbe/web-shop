import { SplitViewProps } from '../shared/interface/props'

export const TextLeftImgRight = ({ img, text, title }: SplitViewProps) => {
  return (
    <div className='textImgSplit'>
      <div>
        {title ? <h2>{title}</h2> : null}
        {text ? <p>{text}</p> : null}
      </div>
      <img src={img}></img>
    </div>
  )
}