from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy_imageattach.entity import image_attachment
from src.app.api.database import Base
from datetime import datetime as dt
from pytz import timezone as tz


class CarBrand(Base):
    __tablename__ = 'carbrands'
    id = Column(Integer, primary_key = True, index = True)
    logo = Column(String)
    descriptions = Column(String, index=True)
    brand_name = Column(String, unique=True, index=True)
    # is_active = Column(Boolean, default = True)
    car_model_items = relationship("CarModel", back_populates = "owner")
    created_at = Column(String(50), default=dt.now(tz("Asia/Ho_Chi_Minh")).strftime("%Y-%m-%d %H:%M"))



class CarModel(Base):
    __tablename__ = 'carmodels'
    id = Column(Integer, primary_key = True, index = True)
    car_brand_id = Column(Integer, ForeignKey("carbrands.id"))
    model_name =  Column(String, unique=True, index=True)
    model_code = Column(String, unique=True, index=True)
    year = Column(Integer)
    # quantity = Column(Integer)
    # date = Date(default=dt.now(tz("Asia/Ho_Chi_Minh")).strftime("%Y-%m-%d %H:%M"))
    owner = relationship("CarBrand", back_populates = "car_model_items")
    image = Column(String)
    created_at = Column(String(50), default = dt.now(tz("Asia/Ho_Chi_Minh")).strftime("%Y-%m-%d %H:%M"))
