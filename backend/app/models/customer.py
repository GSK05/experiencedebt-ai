from sqlalchemy import Column, DateTime, Integer, JSON, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    segment = Column(String, nullable=True)
    email = Column(String, unique=True, index=True, nullable=True)
    company = Column(String, nullable=True)
    plan = Column(String, nullable=True)
    region = Column(String, nullable=True)
    demographics = Column(JSON, nullable=True)
    status = Column(String, default="active", nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), nullable=True)

    journeys = relationship(
        "Journey",
        back_populates="customer",
        cascade="all, delete-orphan",
    )
    experience_debt_scores = relationship(
        "ExperienceDebtScore",
        back_populates="customer",
        cascade="all, delete-orphan",
    )
    recommendations = relationship(
        "Recommendation",
        back_populates="customer",
        cascade="all, delete-orphan",
    )
