from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    action_type = Column(String, nullable=False)
    priority = Column(String, default="medium", nullable=False)
    status = Column(String, default="pending", nullable=False)
    expected_eds_reduction = Column(Float, default=0.0, nullable=False)
    expected_rps_lift = Column(Float, default=0.0, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    applied_at = Column(DateTime(timezone=True), nullable=True)

    customer = relationship("Customer", back_populates="recommendations")
