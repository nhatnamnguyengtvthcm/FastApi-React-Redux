import uuid

import aiofiles as aiofiles
from fastapi import File, UploadFile, HTTPException
from watchgod.watcher import logger

from src.app.api.models import Car, CarModel
from src.app.api.schemas import CarCreate, CarModelCreate
from datetime import datetime as dt
from src.app.api.database import database
from sqlalchemy.orm import Session
import os
import logging
BASEDIR = os.path.dirname(os.path.realpath(__file__))

def post_car(payload:CarCreate, db):
    created_at = dt.now().strftime("%Y-%m-%d %H:%M")
    car =  Car( brand_name=payload.brand_name,  descriptions = payload.descriptions, created_at = created_at)
    db.add(car)
    db.commit()
    db.refresh(car)
    # query = Car.insert().values( brand_name=payload.brand_name,  description = payload.descriptions, created_at = created_at)
    return car

async def upload_logo(id: int, file: File(), db:Session):

    _, ext = os.path.splitext(file.filename)

    IMG_DIR = os.path.join(BASEDIR, 'static/car_logo')
    if not os.path.exists(IMG_DIR):
        os.makedirs(IMG_DIR)
    content = await file.read()
    if file.content_type not in ['image/jpeg', 'image/png']:
        raise HTTPException(status_code = 406, detail = "Only .jpeg or .png  files allowed")
    file_name = f'{uuid.uuid4().hex}{ext}'
    async with aiofiles.open(os.path.join(IMG_DIR, file_name), mode = 'wb') as f:
        await f.write(content)
    path_to_img = os.path.abspath(os.path.join(IMG_DIR, file_name))
    # xoa file cu
    car = db.query(Car).filter(Car.id == id).first()
    if car.logo:
        if os.path.exists(car.logo):
            os.remove(car.logo)
    db.query(Car).filter(Car.id==id).update({Car.logo:path_to_img})
    db.commit()
    db.refresh(car)
    return car


def get_car(id: int, db: Session):
    return db.query(Car).filter(Car.id == id).first()


def get_all_car(db: Session, skip: int = 0, limit: int = 100):

    return db.query(Car).offset(skip).limit(limit).all()


def put_car(id:int, payload:CarCreate, db):
    # created_at = dt.now().strftime("%Y-%m-%d %H:%M")
    db.query(Car).filter(Car.id == id).update({ Car.brand_name:payload.brand_name,
        Car.descriptions:payload.descriptions })
    db.commit()
    car = db.query(Car).filter(Car.id == id).first()
    return car

def delete_car(id:int, db):

    car = db.query(Car).filter(Car.id == id).first()
    if car.logo:
        if os.path.exists(car.logo):
            os.remove(car.logo)
    db.query(Car).filter(Car.id == id).delete()
    db.commit()
    return 1

def post_car_model(payload, db):
    created_at = dt.now().strftime("%Y-%m-%d %H:%M")
    car_model = CarModel(car_id=payload.car_id, model_name=payload.model_name,
    model_code = payload.model_code, created_at=created_at)
    db.commit()
    db.refresh(car_model)
    # query = Car.insert().values( brand_name=payload.brand_name,  description = payload.descriptions, created_at = created_at)
    return car_model

def get_car_model(id, db):
    return db.query(CarModel).filter(CarModel.id == id).first()

def get_all_car_model(db, skip: int = 0, limit: int = 100):
    return db.query(CarModel).offset(skip).limit(limit).all()

def put_car_model(id:int, payload, db):
    db.query(CarModel).filter(CarModel.id == id).update({ CarModel.car_id: payload.car_id,
                                                CarModel.model_name: payload.model_name,
                                                CarModel.model_code: payload.model_code})
    db.commit()
    car_model = db.query(CarModel).filter(CarModel.id == id).first()
    return car_model

def delete_car_model(id:int, db):
    if CarModel.image:
        if os.path.exists(CarModel.image):
            os.remove(CarModel.image)
    db.query(CarModel).filter(CarModel.id == id).delete()
    db.commit()
    return 1

async def upload_image(id: int, file: File(), db:Session):

    _, ext = os.path.splitext(file.filename)

    IMG_DIR = os.path.join(BASEDIR, 'static/car_model_img')
    if not os.path.exists(IMG_DIR):
        os.makedirs(IMG_DIR)
    content = await file.read()
    if file.content_type not in ['image/jpeg', 'image/png']:
        raise HTTPException(status_code = 406, detail = "Only .jpeg or .png  files allowed")
    file_name = f'{uuid.uuid4().hex}{ext}'
    async with aiofiles.open(os.path.join(IMG_DIR, file_name), mode = 'wb') as f:
        await f.write(content)
    path_to_img = os.path.abspath(os.path.join(IMG_DIR, file_name))
    # xoa file cu
    car_model = db.query(Car).filter(CarModel.id == id).first()
    if CarModel.image:
        if os.path.exists(CarModel.image):
            os.remove(CarModel.image)
    db.query(CarModel).filter(CarModel.id==id).update({CarModel.logo:path_to_img})
    db.commit()
    db.refresh(CarModel)
    return CarModel