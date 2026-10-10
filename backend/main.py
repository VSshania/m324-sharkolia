from backend.routes.questionRoute import router as question_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title='Personify API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['GET'],
    allow_headers=['*'],
)

app.include_router(question_router)


@app.get('/')
def health_check() -> dict[str, str]:
    return {'status': 'ok'}


@app.get('/up')
def up() -> dict[str, str]:
    return {'status': 'ok'}
