from fastapi import FastAPI

# from api.models import Car
app = FastAPI()


# @app.get("/")
async def root():
    return { "message": "Hello World" }


@app.get("/hello/{name}")
async def say_hello(name: str):
    return { "message": f"Hello {name}" }

@app.get("/items/{item_id}")
async def read_item(item_id:int):
    return {"item_id": item_id}

fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]


@app.get("/items/")
async def read_item(skip: int = 1, limit: int = 10):
    return fake_items_db[skip : skip + limit]

from typing import Union

from fastapi import FastAPI, Query, Path, Body
from pydantic import BaseModel


class Item(BaseModel):
    name: str
    description: Union[str, None] = None
    price: float
    tax: Union[float, None] = None


app = FastAPI()


@app.post("/items/")
async def create_item(item: Item):
    return item


# query
@app.get("/items/")
async def read_items(q: Union[str, None] = None):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results


# vadiation query
@app.get("/items/")
async def read_items(q: Union[str, None] = Query(default=None, max_length=50)):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results

@app.get("/items/{item_id}")
async def read_items(
        item_id: int = Path(title = "The ID of the item to get"),
        q: Union[str, None] = Query(default = None, alias = "item-query"),
):
    results = { "items": [{ "item_id": "Foo" }, { "item_id": "Bar" }] }
    results = { "item_id": item_id }
    if q:
        results.update({ "q": q })
    return results


# pass q without query
@app.get("/items/{item_id}")
async def read_items(*, item_id: int = Path(title="The ID of the item to get"), q: str):
    results = {"item_id": item_id}
    return results




@app.put("/items/{item_id}")
async def update_item(
    *,
    item_id: int = Path(title="The ID of the item to get", ge=0, le=1000),
    q: Union[str, None] = None,
    item: Union[Item, None] = None,
):
    results = {"item_id": item_id}
    if q:
        results.update({"q": q})
    if item:
        results.update({"item": item})
    return results


# multiple body param and query

class User(BaseModel):
    username: str
    full_name: Union[str, None] = None


class Item(BaseModel):
    name: str
    description: Union[str, None] = None
    price: float
    tax: Union[float, None] = None


@app.put("/items/{item_id}")
async def update_item(
    *,
    item_id: int,
    item: Item,
    user: User,
    importance: int = Body(gt=0),
    q: Union[str, None] = None
):
    results = {"item_id": item_id, "item": item, "user": user, "importance": importance}
    if q:
        results.update({"q": q})
    return results
# origins = [
#     "http://localhost",
#     "http://localhost:8080",
#     "http://localhost:5173",
#     "*"
# ]
#
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["DELETE", "GET", "POST", "PUT"],
#     allow_headers=["*"],
# )
#
# @app.on_event("startup")
# async def startup():
#     await database.connect()
#
#
# @app.on_event("shutdown")
# async def shutdown():
#     await database.disconnect()


# app.include_router(ping.router)
# app.include_router(car.router, prefix="/notes", tags=["notes"])