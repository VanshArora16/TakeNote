from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from . import models
from datetime import datetime

async def get_notes(session: AsyncSession):
    result = await session.execute(select(models.Note).order_by(models.Note.updated_at.desc()))
    return result.scalars().all()

async def get_note(session: AsyncSession, note_id: int):
    return await session.get(models.Note, note_id)

async def create_note(session: AsyncSession, data: dict):
    note = models.Note(**data)
    session.add(note)
    await session.commit()
    await session.refresh(note)
    return note

async def update_note(session: AsyncSession, note_id: int, data: dict):
    note = await get_note(session, note_id)
    if not note:
        return None
    for key, value in data.items():
        setattr(note, key, value)
    note.updated_at = datetime.utcnow()
    await session.commit()
    await session.refresh(note)
    return note

async def delete_note(session: AsyncSession, note_id: int):
    note = await get_note(session, note_id)
    if not note:
        return False
    await session.delete(note)
    await session.commit()
    return True