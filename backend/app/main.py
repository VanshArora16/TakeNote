from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from .db import Base, engine, get_session
from . import crud, schemas, models

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.get('/api/notes', response_model=list[schemas.NoteOut])
async def list_notes(session: AsyncSession = Depends(get_session)):
    return await crud.get_notes(session)

@app.post('/api/notes', response_model=schemas.NoteOut, status_code=201)
async def create_note(payload: schemas.NoteCreate, session: AsyncSession = Depends(get_session)):
    return await crud.create_note(session, payload.dict())

@app.get('/api/notes/{note_id}', response_model=schemas.NoteOut)
async def read_note(note_id: int, session: AsyncSession = Depends(get_session)):
    note = await crud.get_note(session, note_id)
    if not note:
        raise HTTPException(status_code=404, detail='Note not found')
    return note

@app.put('/api/notes/{note_id}', response_model=schemas.NoteOut)
async def edit_note(note_id: int, payload: schemas.NoteUpdate, session: AsyncSession = Depends(get_session)):
    note = await crud.update_note(session, note_id, payload.dict())
    if not note:
        raise HTTPException(status_code=404, detail='Note not found')
    return note

@app.delete('/api/notes/{note_id}', status_code=204)
async def remove_note(note_id: int, session: AsyncSession = Depends(get_session)):
    ok = await crud.delete_note(session, note_id)
    if not ok:
        raise HTTPException(status_code=404, detail='Note not found')
    return None