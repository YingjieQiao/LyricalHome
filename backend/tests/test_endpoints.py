from fastapi.testclient import TestClient
import json

from app.main import app as application

client = TestClient(application)

# pytest tests/test_get.py::test_get_student_all -s

def test_post_count():
    response = client.post("/poets/10")
    print(response.text)
    assert response.status_code == 200
