import { RouteComponentProps } from "react-router-dom"

interface MatchParams {
  id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
  params: MatchParams
}

export const Product = ({ match }: {match: MatchProps }) => {

  return (
    <div>
      {
        
      }
    </div>
  )
}