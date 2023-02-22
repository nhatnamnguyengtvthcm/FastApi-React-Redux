from pydantic import BaseModel, Field, NonNegativeInt
from typing import List, Union


class CarModelBase(BaseModel):
    model_name: Union[str, None]
    model_code:  Union[str, None]
    car_id: Union[int, None]
    year: int
    image: Union[str, None]


class CarModelCreate(CarModelBase):
    pass


class CarModel(CarModelBase):
    id: int
    car_id: int

class CarBase(BaseModel):

    descriptions: Union[str,None]
    brand_name:  Union[str, None]
    # logo: Union[str, None]


class CarCreate(CarBase):
    pass


class Car(CarBase):
    id: int
    car_model_items: List[CarModel]= []
    logo: str
    class Config:
        orm_mode = True


