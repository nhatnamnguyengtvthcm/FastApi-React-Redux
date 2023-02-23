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

@router.post("/", response_model=Car, status_code=201)
def create_car(payload:CarCreate, db: Session = Depends(get_db)):
    car = crud.post_car(payload,db)
    created_at = dt.now().strftime("%Y-%m-%d %H:%M")
    return car

@router.get("/", response_model=List[Car], description="get all carmaker ")
def get_car(*, db: Session = Depends(get_db), skip:int=0, limit:int=100):
    cars = crud.get_all_car(db, skip, limit)
    return cars

@router.get("/{id}", response_model=Car, description="get carmaker detail by ID")
def get_car(*,id:int, db: Session = Depends(get_db), skip:int=0, limit:int=100):
    cars = crud.get_car(id, db)
    return cars

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

@router.put("/{id}", response_model=Car, status_code=201)
def create_car(id, payload:CarCreate, db: Session = Depends(get_db)):
    car = crud.put_car(id, payload,db)
    return car

@router.delete("/{id}",status_code=201)
def create_car(id, db: Session = Depends(get_db)):
    return crud.delete_car(id, db)

