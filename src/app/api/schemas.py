from pydantic import BaseModel, Field, NonNegativeInt
from typing import List, Union
from .models import CarBrand

class CarModelBase(BaseModel):
    model_name: Union[str, None]
    model_code:  Union[str, None]
    year:  Union[int, None]


class CarModelCreate(CarModelBase):
    pass


class CarModel(CarModelBase):
    id: int
    car_brand_id: int
    image: Union[str, None]

    class Config:
        orm_mode = True

class CarBrandBase(BaseModel):

    descriptions: Union[str,None]
    brand_name:  Union[str, None]
    # logo: Union[str, None]


class CarBrandCreate(CarBrandBase):
    pass


class CarBrand(CarBrandBase):
    id: int
    car_model_items: List[CarModel]= []
    logo: Union[str, None]
    class Config:
        orm_mode = True


