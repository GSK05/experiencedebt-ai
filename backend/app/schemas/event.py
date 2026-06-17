from pydantic import BaseModel


class EventBase(BaseModel):
    customer_id: int
    channel: str
    event_type: str


class EventRead(EventBase):
    id: int

    class Config:
        from_attributes = True

