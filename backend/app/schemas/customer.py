from pydantic import BaseModel


class CustomerBase(BaseModel):
    name: str
    segment: str | None = None


class CustomerRead(CustomerBase):
    id: int

    class Config:
        from_attributes = True

