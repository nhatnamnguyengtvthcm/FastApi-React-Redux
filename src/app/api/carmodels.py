from fastapi.logger import logger

from . import crud
from src.app.api.schemas import CarCreate, CarBase, Car, CarModelCreate, CarModel
from fastapi import APIRouter, HTTPException, Path, UploadFile, File
from typing import List
from datetime import datetime as dt
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from .database import SessionLocal, engine
router = APIRouter()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=CarModel, status_code=201)
def create_car_model(payload:CarCreate, db: Session = Depends(get_db)):
    car_model = crud.post_car_model(payload,db)
    return car_model

@router.get("/", response_model=List[CarModel])
def get_all_car_model(*, db: Session = Depends(get_db), skip:int=0, limit:int=100):
    car_models = crud.get_all_car_model(db, skip, limit)
    return car_models

@router.get("/{id}", response_model=Car, description="get car model detail by ID")
def get_car_model(*,id:int, db: Session = Depends(get_db)):
    cars = crud.get_car_model(id, db)
    return cars

@router.post("/upload_image/{id}", response_model=Car, status_code=201)
async def upload_image(id:int, file: UploadFile=File(), db: Session = Depends(get_db)):
    car = await crud.upload_image(id, file, db)
    # print(car)
    # response_object = {
    #     "id": car.id,
    #     "brand_name": car.brand_name,
    #     "logo": car.logo,
    #     "description": car.description,
    #     "car_model_items": car.car_model_items,
    #
    # }
    return car

@router.put("/{id}", response_model=Car, status_code=201)
def create_car_model(id, payload:CarCreate, db: Session = Depends(get_db)):
    car = crud.put_car_model(id, payload,db)
    return car

@router.delete("/{id}",status_code=201)
def create_car_model(id, db: Session = Depends(get_db)):
    return crud.delete_car_model(id, db)