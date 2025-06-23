export interface CategoryModel{
  id?: string;
  name: string;
  url: string;
}

export const initialCategory: CategoryModel = {
  name: "",
  url: ""
}