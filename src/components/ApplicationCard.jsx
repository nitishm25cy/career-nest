import StatusBadge from "./StatusBadge";

function ApplicationCard({
  application,
  onWithdraw
}) {
  return (
    <div className="application-card">

      <div>

        <span className="application-company">
          {application.job?.company}
        </span>

        <h3>
          {application.job?.title}
        </h3>

        <p>
          {application.job?.location}
        </p>

        <p>
          Applied on: {application.appliedAt}
        </p>

      </div>

      <div className="application-card-status">

        <StatusBadge
          status={application.status}
        />

        {onWithdraw && (
          <button
            className="withdraw-button"
            onClick={() =>
              onWithdraw(application.id)
            }
          >
            Withdraw
          </button>
        )}

      </div>

    </div>
  );
}

export default ApplicationCard;