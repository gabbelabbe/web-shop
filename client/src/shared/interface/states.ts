export interface iloginCredentials {
  username?: string,
  email?: string,
  password?: string,
  _id?: string,
  address?: string,
  userType?: string
}

export interface iuseWindowReszie {
  width: number,
  height: number,
}

export interface iStarWarsCharacters {
  name: string, 
  birth_year: string, 
  homeworld: any, 
  films: any[], 
  height: string,
  id: number
}

export interface iProduct {
  name?: string,
  types?: string[],
  price?: number,
  quantity?: number,
  _id?: string
}