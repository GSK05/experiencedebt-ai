from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, JSON, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class ExperienceDebtScore(Base):
    __tablename__ = "experience_debt_scores"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False, index=True)
    score = Column(Float, nullable=False)
    context_loss_index = Column(Float, default=0.0, nullable=False)
    journey_effort_score = Column(Float, default=0.0, nullable=False)
    recovery_probability_score = Column(Float, default=0.0, nullable=False)
    friction_free_journey_rate = Column(Float, default=0.0, nullable=False)
    risk_level = Column(String, nullable=True)
    score_metadata = Column(JSON, nullable=True)
    calculated_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    customer = relationship("Customer", back_populates="experience_debt_scores")
