from datetime import datetime, timedelta, timezone
import random

from app.database import Base, SessionLocal, engine
from app.models import (
    Customer,
    Event,
    ExperienceDebtScore,
    Journey,
    Recommendation,
)


SEED = 42
CUSTOMER_COUNT = 100

FIRST_NAMES = [
    "Aarav",
    "Aisha",
    "Alex",
    "Ananya",
    "Arjun",
    "Camila",
    "Daniel",
    "Diya",
    "Elena",
    "Fatima",
    "Ishaan",
    "Jordan",
    "Kabir",
    "Leah",
    "Meera",
    "Mia",
    "Noah",
    "Priya",
    "Rohan",
    "Sara",
]

LAST_NAMES = [
    "Banerjee",
    "Chen",
    "Fernandez",
    "Gupta",
    "Iyer",
    "Johnson",
    "Kapoor",
    "Khan",
    "Lee",
    "Mehta",
    "Nair",
    "Patel",
    "Rao",
    "Shah",
    "Singh",
    "Thomas",
]

COMPANIES = [
    "Acme Retail",
    "BluePeak Finance",
    "CloudCart",
    "EduSpark",
    "Finoryx",
    "GreenGrid",
    "HealthBridge",
    "MetroMart",
    "NovaTravel",
    "QuickServe",
    "UrbanNest",
    "Workly",
]

SEGMENTS = ["SMB", "Mid-Market", "Enterprise", "Consumer", "Startup"]
PLANS = ["Free", "Starter", "Growth", "Pro", "Enterprise"]
REGIONS = ["North America", "Europe", "India", "Southeast Asia", "Middle East"]
PERSONAS = [
    "healthy",
    "onboarding_friction",
    "support_delay",
    "context_loss",
    "email_disengaged",
    "high_risk",
]


def choose_persona(index):
    if index < 18:
        return "healthy"
    if index < 36:
        return "onboarding_friction"
    if index < 54:
        return "support_delay"
    if index < 72:
        return "context_loss"
    if index < 88:
        return "email_disengaged"
    return "high_risk"


def bounded(value, minimum=0, maximum=100):
    return max(minimum, min(maximum, value))


def friction_event(channel, event_type, title, description, friction_type, score, when, metadata=None):
    return Event(
        channel=channel,
        event_type=event_type,
        title=title,
        description=description,
        friction_type=friction_type,
        friction_score=score,
        occurred_at=when,
        event_metadata=metadata or {},
    )


def normal_event(channel, event_type, title, description, when, metadata=None):
    return friction_event(
        channel,
        event_type,
        title,
        description,
        None,
        0,
        when,
        metadata,
    )


def build_onboarding_journey(persona, start):
    journey = Journey(
        name="Onboarding",
        stage="activation",
        status="completed" if persona not in {"onboarding_friction", "high_risk"} else "at_risk",
        started_at=start,
        ended_at=start + timedelta(days=10),
    )

    journey.events.append(
        normal_event(
            "web",
            "signup",
            "Account created",
            "Customer created an account and started onboarding.",
            start,
            {"activity": "onboarding", "step": "signup"},
        )
    )
    journey.events.append(
        normal_event(
            "product",
            "profile_setup",
            "Profile setup started",
            "Customer entered profile and preference details.",
            start + timedelta(days=1),
            {"activity": "onboarding", "completion_percent": 35},
        )
    )

    if persona in {"onboarding_friction", "high_risk"}:
        journey.events.append(
            friction_event(
                "product",
                "verification_retry",
                "Identity verification repeated",
                "Customer had to repeat verification after a failed handoff.",
                "repeat_information",
                18,
                start + timedelta(days=2),
                {"activity": "onboarding", "attempts": 3},
            )
        )
        journey.events.append(
            friction_event(
                "product",
                "setup_abandoned",
                "Setup checklist abandoned",
                "Customer dropped from onboarding after a complex setup flow.",
                "journey_complexity",
                20,
                start + timedelta(days=4),
                {"activity": "onboarding", "completion_percent": 58},
            )
        )
    else:
        journey.events.append(
            normal_event(
                "product",
                "first_value",
                "First value reached",
                "Customer completed the key activation milestone.",
                start + timedelta(days=3),
                {"activity": "onboarding", "completion_percent": 100},
            )
        )

    return journey


def build_support_journey(persona, start):
    journey = Journey(
        name="Support Interaction",
        stage="support",
        status="open" if persona in {"support_delay", "context_loss", "high_risk"} else "resolved",
        started_at=start,
        ended_at=None if persona in {"support_delay", "high_risk"} else start + timedelta(days=3),
    )

    journey.events.append(
        normal_event(
            "chat",
            "support_started",
            "Support conversation started",
            "Customer contacted support about a product issue.",
            start,
            {"activity": "support", "topic": random.choice(["billing", "setup", "feature", "account access"])},
        )
    )

    if persona in {"context_loss", "high_risk"}:
        journey.events.append(
            friction_event(
                "chat",
                "context_lost",
                "Context lost during channel switch",
                "Customer repeated the same issue after moving from chat to email.",
                "context_loss",
                22,
                start + timedelta(hours=6),
                {"activity": "support", "channels_crossed": ["chat", "email"]},
            )
        )

    if persona in {"support_delay", "high_risk"}:
        journey.events.append(
            friction_event(
                "email",
                "delayed_response",
                "Delayed support response",
                "Customer waited more than 24 hours for a useful response.",
                "support_delay",
                24,
                start + timedelta(days=1),
                {"activity": "support", "response_time_hours": random.randint(26, 72)},
            )
        )
    else:
        journey.events.append(
            normal_event(
                "chat",
                "issue_resolved",
                "Issue resolved",
                "Support resolved the request in the first interaction.",
                start + timedelta(hours=random.randint(1, 5)),
                {"activity": "support", "response_time_hours": random.randint(1, 5)},
            )
        )

    return journey


def build_email_journey(persona, start):
    journey = Journey(
        name="Email Engagement",
        stage="engagement",
        status="active" if persona not in {"email_disengaged", "high_risk"} else "declining",
        started_at=start,
        ended_at=start + timedelta(days=20),
    )

    open_rate = random.randint(55, 85)
    click_rate = random.randint(18, 35)

    if persona in {"email_disengaged", "high_risk"}:
        open_rate = random.randint(5, 22)
        click_rate = random.randint(0, 8)
        journey.events.append(
            friction_event(
                "email",
                "irrelevant_campaign",
                "Irrelevant campaign sent",
                "Customer received recommendations unrelated to recent behavior.",
                "irrelevant_recommendation",
                15,
                start + timedelta(days=1),
                {"activity": "email", "open_rate": open_rate, "click_rate": click_rate},
            )
        )
    else:
        journey.events.append(
            normal_event(
                "email",
                "campaign_opened",
                "Lifecycle email opened",
                "Customer opened a relevant lifecycle message.",
                start + timedelta(days=1),
                {"activity": "email", "open_rate": open_rate, "click_rate": click_rate},
            )
        )

    journey.events.append(
        normal_event(
            "email",
            "engagement_summary",
            "Email engagement measured",
            "Email engagement metrics were recorded for the customer.",
            start + timedelta(days=14),
            {"activity": "email", "open_rate": open_rate, "click_rate": click_rate},
        )
    )

    return journey


def score_customer(persona, journeys):
    friction_scores = [
        event.friction_score
        for journey in journeys
        for event in journey.events
        if event.friction_score > 0
    ]
    total_friction = sum(friction_scores)
    event_count = sum(len(journey.events) for journey in journeys)
    friction_event_count = len(friction_scores)
    context_losses = sum(
        1
        for journey in journeys
        for event in journey.events
        if event.friction_type == "context_loss"
    )

    eds = bounded(total_friction + friction_event_count * 4 + random.randint(-4, 6))
    cli = bounded((context_losses / max(1, event_count)) * 100 + random.randint(0, 8))
    jes = bounded((total_friction / max(1, event_count)) * 4 + random.randint(5, 18))
    rps = bounded(92 - eds * 0.65 - jes * 0.15 + random.randint(-5, 5))
    ffjr = bounded(100 - friction_event_count * 18 - random.randint(0, 12))

    if persona == "healthy":
        eds = bounded(random.randint(5, 24))
        rps = bounded(random.randint(75, 95))
        ffjr = bounded(random.randint(78, 98))

    if eds >= 70:
        risk_level = "high"
    elif eds >= 40:
        risk_level = "medium"
    else:
        risk_level = "low"

    return ExperienceDebtScore(
        score=round(eds, 2),
        context_loss_index=round(cli, 2),
        journey_effort_score=round(jes, 2),
        recovery_probability_score=round(rps, 2),
        friction_free_journey_rate=round(ffjr, 2),
        risk_level=risk_level,
        score_metadata={
            "persona": persona,
            "friction_event_count": friction_event_count,
            "total_events": event_count,
        },
        calculated_at=datetime.now(timezone.utc),
    )


def recommendations_for(persona, score):
    recommendation_map = {
        "healthy": [
            ("Maintain proactive check-in", "Send a success milestone message.", "success_checkin"),
        ],
        "onboarding_friction": [
            ("Simplify onboarding checklist", "Remove optional setup steps and guide the next action.", "onboarding_simplification"),
            ("Offer assisted setup", "Trigger a guided onboarding session for the customer.", "human_assist"),
        ],
        "support_delay": [
            ("Prioritize support queue", "Route the customer to expedited support.", "priority_support"),
            ("Send resolution ETA", "Set expectations with a clear response timeline.", "support_followup"),
        ],
        "context_loss": [
            ("Preserve cross-channel context", "Attach chat summary to the email support thread.", "context_recovery"),
            ("Assign continuity owner", "Route follow-ups to the same support owner.", "owner_assignment"),
        ],
        "email_disengaged": [
            ("Suppress irrelevant campaigns", "Pause generic campaigns and use behavior-based messaging.", "campaign_suppression"),
            ("Send personalized win-back", "Offer content aligned to the customer journey stage.", "personalized_recovery"),
        ],
        "high_risk": [
            ("Launch recovery playbook", "Combine priority support, context recovery, and onboarding assistance.", "recovery_playbook"),
            ("Escalate to customer success", "Create a high-touch intervention for the account.", "cs_escalation"),
        ],
    }

    priority = "high" if score.score >= 70 else "medium" if score.score >= 40 else "low"
    recommendations = []

    for title, description, action_type in recommendation_map[persona]:
        recommendations.append(
            Recommendation(
                title=title,
                description=description,
                action_type=action_type,
                priority=priority,
                status="pending",
                expected_eds_reduction=round(random.uniform(8, 24), 2),
                expected_rps_lift=round(random.uniform(5, 18), 2),
                created_at=datetime.now(timezone.utc),
            )
        )

    return recommendations


def build_customer(index):
    persona = choose_persona(index)
    first_name = random.choice(FIRST_NAMES)
    last_name = random.choice(LAST_NAMES)
    name = f"{first_name} {last_name}"
    email = f"{first_name.lower()}.{last_name.lower()}{index + 1}@example.com"
    created_at = datetime.now(timezone.utc) - timedelta(days=random.randint(20, 180))

    customer = Customer(
        name=name,
        email=email,
        segment=random.choice(SEGMENTS),
        company=random.choice(COMPANIES),
        plan=random.choice(PLANS),
        region=random.choice(REGIONS),
        status="at_risk" if persona == "high_risk" else "active",
        created_at=created_at,
        demographics={
            "age_range": random.choice(["18-24", "25-34", "35-44", "45-54", "55+"]),
            "role": random.choice(["Founder", "Operations Lead", "Support Manager", "Marketing Lead", "Individual User"]),
            "industry": random.choice(["Retail", "SaaS", "Finance", "Healthcare", "Education", "Travel"]),
            "company_size": random.choice(["1-10", "11-50", "51-200", "201-1000", "1000+"]),
            "persona": persona,
        },
    )

    onboarding_start = created_at + timedelta(days=1)
    support_start = created_at + timedelta(days=random.randint(7, 45))
    email_start = created_at + timedelta(days=random.randint(3, 20))

    journeys = [
        build_onboarding_journey(persona, onboarding_start),
        build_support_journey(persona, support_start),
        build_email_journey(persona, email_start),
    ]

    if persona in {"context_loss", "high_risk", "healthy"}:
        journeys.append(
            Journey(
                name="Product Discovery",
                stage="adoption",
                status="active",
                started_at=created_at + timedelta(days=random.randint(12, 50)),
                events=[
                    normal_event(
                        "web",
                        "feature_viewed",
                        "Feature page viewed",
                        "Customer explored a product capability.",
                        created_at + timedelta(days=random.randint(13, 52)),
                        {"activity": "product", "feature": random.choice(["automation", "analytics", "billing", "integrations"])},
                    )
                ],
            )
        )

    score = score_customer(persona, journeys)
    customer.journeys.extend(journeys)
    customer.experience_debt_scores.append(score)
    customer.recommendations.extend(recommendations_for(persona, score))

    return customer


def seed_database():
    random.seed(SEED)
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        customers = [build_customer(index) for index in range(CUSTOMER_COUNT)]
        db.add_all(customers)
        db.commit()
        print(f"Seeded {CUSTOMER_COUNT} customers into SQLite.")
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
