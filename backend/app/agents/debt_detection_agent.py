from collections.abc import Iterable
from typing import Any

from app.agents.base_agent import BaseAgent


class DebtDetectionAgent(BaseAgent):
    """Calculates customer Experience Debt from journey event friction signals."""

    name = "debt_detection_agent"
    FACTOR_NORMALIZATION_MULTIPLIER = 2.5

    FACTORS = {
        "context_loss": {
            "weight": 0.40,
            "label": "Context Loss",
            "friction_types": {"context_loss"},
            "keywords": {"context", "repeat", "repeated", "handoff", "channel switch"},
        },
        "support_delay": {
            "weight": 0.30,
            "label": "Support Delay",
            "friction_types": {"support_delay"},
            "keywords": {"delay", "delayed", "wait", "response time", "sla"},
        },
        "ignored_communications": {
            "weight": 0.20,
            "label": "Ignored Communications",
            "friction_types": {"ignored_communication", "irrelevant_recommendation"},
            "keywords": {"ignored", "unopened", "unsubscribe", "irrelevant", "campaign"},
        },
        "journey_complexity": {
            "weight": 0.10,
            "label": "Journey Complexity",
            "friction_types": {"journey_complexity", "repeat_information"},
            "keywords": {"complex", "abandoned", "retry", "verification", "checklist"},
        },
    }

    def run(self, customer_events: Iterable[Any] | None) -> dict[str, Any]:
        return self.calculate_score(customer_events)

    def calculate_score(self, customer_events: Iterable[Any] | None) -> dict[str, Any]:
        events = list(customer_events or [])
        factor_summaries = {
            factor: {
                "factor": config["label"],
                "weight": config["weight"],
                "raw_points": 0.0,
                "normalized_score": 0.0,
                "weighted_score": 0.0,
                "event_count": 0,
                "examples": [],
            }
            for factor, config in self.FACTORS.items()
        }

        for event in events:
            factor = self._classify_event(event)
            if factor is None:
                continue

            points = self._event_points(event)
            summary = factor_summaries[factor]
            summary["raw_points"] += points
            summary["event_count"] += 1

            if len(summary["examples"]) < 3:
                summary["examples"].append(
                    {
                        "event_type": self._get_value(event, "event_type"),
                        "title": self._get_value(event, "title"),
                        "friction_type": self._get_value(event, "friction_type"),
                        "friction_score": self._get_value(event, "friction_score", 0),
                    }
                )

        contributors = []
        total_score = 0.0

        for factor, summary in factor_summaries.items():
            normalized_score = min(
                summary["raw_points"] * self.FACTOR_NORMALIZATION_MULTIPLIER,
                100.0,
            )
            weighted_score = normalized_score * self.FACTORS[factor]["weight"]

            summary["raw_points"] = round(summary["raw_points"], 2)
            summary["normalized_score"] = round(normalized_score, 2)
            summary["weighted_score"] = round(weighted_score, 2)

            total_score += weighted_score

            if summary["event_count"] > 0:
                contributors.append(summary)

        contributors.sort(key=lambda item: item["weighted_score"], reverse=True)
        score = round(min(total_score, 100.0), 2)

        return {
            "score": score,
            "risk_level": self._risk_level(score),
            "contributors": contributors,
        }

    def _classify_event(self, event: Any) -> str | None:
        friction_type = self._normalize_text(self._get_value(event, "friction_type"))
        searchable_text = " ".join(
            self._normalize_text(value)
            for value in (
                self._get_value(event, "event_type"),
                self._get_value(event, "title"),
                self._get_value(event, "description"),
            )
            if value
        )

        metadata = self._get_value(event, "event_metadata", {}) or {}
        if isinstance(metadata, dict):
            metadata_text = " ".join(str(value) for value in metadata.values())
            searchable_text = f"{searchable_text} {self._normalize_text(metadata_text)}"

        for factor, config in self.FACTORS.items():
            if friction_type in config["friction_types"]:
                return factor

        for factor, config in self.FACTORS.items():
            if any(keyword in searchable_text for keyword in config["keywords"]):
                return factor

        return None

    def _event_points(self, event: Any) -> float:
        points = self._safe_float(self._get_value(event, "friction_score", 0))

        metadata = self._get_value(event, "event_metadata", {}) or {}
        if isinstance(metadata, dict):
            response_time = self._safe_float(metadata.get("response_time_hours"))
            points += max(0.0, min((response_time - 24.0) / 2.0, 20.0))

            attempts = self._safe_float(metadata.get("attempts"))
            points += max(0.0, min((attempts - 1.0) * 5.0, 20.0))

            open_rate = self._safe_float(metadata.get("open_rate"))
            if metadata.get("open_rate") is not None:
                points += max(0.0, min((25.0 - open_rate) / 2.0, 15.0))

            completion_percent = self._safe_float(metadata.get("completion_percent"))
            if metadata.get("completion_percent") is not None:
                points += max(0.0, min((100.0 - completion_percent) / 5.0, 20.0))

        return max(points, 1.0)

    def _risk_level(self, score: float) -> str:
        if score >= 70:
            return "high"
        if score >= 40:
            return "medium"
        return "low"

    def _get_value(self, event: Any, key: str, default: Any = None) -> Any:
        if isinstance(event, dict):
            return event.get(key, default)

        return getattr(event, key, default)

    def _normalize_text(self, value: Any) -> str:
        return str(value or "").strip().lower()

    def _safe_float(self, value: Any) -> float:
        try:
            return float(value or 0)
        except (TypeError, ValueError):
            return 0.0
