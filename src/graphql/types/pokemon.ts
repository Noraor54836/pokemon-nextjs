export interface Weight {
  minimum: string;
  maximum: string;
}

export interface Height {
  minimum: string;
  maximum: string;
}

export interface Attack {
  name: string;
  type: string;
  damage: number;
}

export interface Attacks {
  fast: Attack[];
  special: Attack[];
}

export interface Evolution {
  name: string;
  number: string;
  types: string[];
}

export interface Pokemon {
  id: string;
  number: string;
  name: string;
  image: string;
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  classification: string;
  types: string[];
  resistant: string[];
  attacks: {
    fast: Attack[];
    special: Attack[];
  };
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  evolutions: Evolution[];
}
