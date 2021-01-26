import { iSplitViewProps } from '../../shared/interface/props'
import './TextImgSplit.css'

export const TextImgSplit = ({ img, text, title, reverse }: iSplitViewProps) => {
  return (
    <div className='textImgSplit' style={{flexDirection: (reverse ? 'row-reverse' : 'row')}}>
      <div>
        {title ? <h2>{title}</h2> : null}
        {text ? <p>{text}</p> : null}
      </div>
      <img src={img} alt="img"></img>
    </div>
  )
}