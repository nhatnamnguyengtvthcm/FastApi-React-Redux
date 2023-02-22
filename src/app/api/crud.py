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

def post_car(payload:CarCreate, db: Session):
    created_at = dt.now().strftime("%Y-%m-%d %H:%M")
    car =  Car( brand_name=payload.brand_name,  descriptions = payload.descriptions, created_at = created_at)
    db.add(car)
    db.commit()
    db.refresh(car)
    # query = Car.insert().values( brand_name=payload.brand_name,  description = payload.descriptions, created_at = created_at)
    return db

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
    if os.path.exists(car.logo):
        os.remove(car.logo)
    db.query(Car).filter(Car.id==id).update({Car.logo:path_to_img})
    logger = logging.getLogger('foo-logger')
    logger.debug(path_to_img)
    db.commit()
    db.refresh(car)
    return car


def get_car(id: int, db: Session):
    return db.query(Car).filter(Car.id == id).first()


def get_all_car(db: Session, skip: int = 0, limit: int = 100):

    return db.query(Car).offset(skip).limit(limit).all()


async def put_car(id:int, payload=CarCreate):
    created_at = dt.now().strftime("%Y-%m-%d %H:%M")
    query = (
        Car.update().where(id == Car.c.id).values(brand_name=payload.brand_name,
        description=payload.descriptions, created_at=created_at)
        .returning(Car.c.id)
    )
    return await database.execute(query=query)

async def delete_car(id:int):
    query = Car.delete().where(id == Car.c.id)
    return await database.execute(query=query)

async def post_car_model(payload: CarModelCreate):
    created_at = dt.now().strftime("%Y-%m-%d %H:%M")
    query = CarModel.insert().values(car_id=payload.car_id, model_name=payload.model_name,
    model_code = payload.model_code, created_at=created_at)
    return await database.execute(query=query)

async def get_car_model(id: int):
    query = CarModel.select().where(id == Car.c.id)
    return await database.fetch_one(query=query)

async def get_all_car_model():
    query = CarModel.select()
    return await database.fetch_all(query=query)

async def put_car_model(id:int, payload=CarCreate):
    created_at = dt.now().strftime("%Y-%m-%d %H:%M")
    query = (
        CarModel.update().where(id == CarModel.c.id).values(car_id=payload.car_id, model_name=payload.model_name,
    model_code = payload.model_code, created_at=created_at)
        .returning(CarModel.c.id)
    )
    return await database.execute(query=query)

async def delete_car_model(id:int):
    query = CarModel.delete().where(id == CarModel.c.id)
    return await database.execute(query=query)