from fastapi.testclient import TestClient

from .main import app

client = TestClient(app)

def test_get_car_brand():
    res = client.get("/carbrands/")
    assert res.status_code == 200