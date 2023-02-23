from fastapi.logger import logger

from . import crud
from src.app.api.schemas import CarBrandCreate, CarBrand
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

@router.post("/", response_model=CarBrand, status_code=201)
def create_car_branch(payload:CarBrandCreate, db: Session = Depends(get_db)):
    car_branch = crud.post_car_brand(payload,db)
    created_at = dt.now().strftime("%Y-%m-%d %H:%M")
    return car_branch

@router.get("/", response_model=List[CarBrand], description="get all carmaker ")
def get_car_branch(*, db: Session = Depends(get_db), skip:int=0, limit:int=100):
    car_brands = crud.get_all_car_brand(db, skip, limit)
    return car_brands

@router.get("/{id}", response_model=CarBrand, description="get carmaker detail by ID")
def get_car_brand(*,id:int, db: Session = Depends(get_db), skip:int=0, limit:int=100):
    cars = crud.get_car_brand(id, db)
    return cars

@router.post("/upload_logo/{id}", response_model=CarBrand, status_code=201)
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

@router.put("/{id}", response_model=CarBrand, status_code=201)
def create_car_brand(id, payload:CarBrandCreate, db: Session = Depends(get_db)):
    car_brand = crud.put_car_brand(id, payload,db)
    return car_brand

@router.delete("/{id}",status_code=201)
def delete_car_brand(id, db: Session = Depends(get_db)):
    return crud.delete_car_brand(id, db)

