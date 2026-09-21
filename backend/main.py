from fastapi import FastAPI

app = FastAPI(title='Personify API')


@app.get('/')
def health_check() -> dict[str, str]:
    return {'status': 'ok'}
