export interface iSplitViewProps {
  img?: string,
  text?: string,
  title?: string,
  reverse?: boolean
}

export interface iProvider {
  children: React.ReactChild
}

export interface iProduct {
  id: string,
  imgs: string[], 
  title: string,
  type: string, 
  text: string
}

export interface iSlider {
  imgs: string[]
}