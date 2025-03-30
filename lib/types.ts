export interface IProduct {
  id: number
  name: string
  price: number
  image: string
}

export type ProductCategory = 'Pastéis' | 'Salgados' | 'Bebidas' | 'Doces'

export interface IProductWithCategory extends IProduct {
  category: ProductCategory
}
