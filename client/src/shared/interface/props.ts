export interface iSplitViewProps {
  img?: string,
  text?: string,
  title?: string,
  reverse?: boolean
}

export interface iProvider {
  children: React.ReactChild
}

export interface iSlider {
  imgs: string[]
}