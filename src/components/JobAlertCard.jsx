function JobAlertCard({ alert }) {
  return (
    <div className="alert-card">

      <div>

        <span className="application-company">
          JOB ALERT
        </span>

        <h3>
          {alert.keyword || "All Jobs"}
        </h3>

        <p>
          Location: {alert.location || "Any location"}
        </p>

        <p>
          Frequency: {alert.frequency || "Daily"}
        </p>

      </div>

    </div>
  );
}

export default JobAlertCard;