from fastapi.logger import logger

from . import crud
from src.app.api.schemas import CarCreate, CarBase, Car, CarModelCreate
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
@router.post("/", response_model=Car, status_code=201)
def create_car(payload:CarCreate, db: Session = Depends(get_db)):
    car = crud.post_car(payload,db)
    created_at = dt.now().strftime("%Y-%m-%d %H:%M")
    response_object = {
        "id": car.id,
        "brand_name": payload.brand_name,
        "logo": payload.logo,
        "description": payload.description,
        "car_model_items": payload.car_model_items,
        "created_at": created_at,
    }
    return response_object

@router.get("/", response_model=List[Car])
def get_car(*, db: Session = Depends(get_db), skip:int=0, limit:int=100):
    cars = crud.get_all_car(db, skip, limit)

@router.post("/upload_logo/{id}", response_model=Car, status_code=201)
async def upload_logo(id:int, file: UploadFile=File(), db: Session = Depends(get_db)):
    car = await crud.upload_logo(id, file, db)
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
