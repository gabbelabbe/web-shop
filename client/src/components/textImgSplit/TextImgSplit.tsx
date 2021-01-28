import useWindowSize from '../../hooks/useWindowResize'
import { iSplitViewProps } from '../../shared/interface/props'
import './TextImgSplit.css'

export const TextImgSplit = ({ img, text, title, reverse }: iSplitViewProps) => {
  const {width, height} = useWindowSize()

  return (
    <div className='textImgSplit' style={{flexDirection: (width > 700 ? (reverse ? 'row-reverse' : 'row') : 'column')}}>
      <div>
        {title ? <h2>{title}</h2> : null}
        {text ? <p>{text}</p> : null}
      </div>
      <img src={img} alt="img"></img>
    </div>
  )
}