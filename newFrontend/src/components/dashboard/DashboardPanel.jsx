export default function DashboardPanel({ eyebrow, title, action, children }) {
  return (
    <section className="dashboard-panel">
      <div className="panel-head">
        <div>
          {eyebrow && <small>{eyebrow}</small>}
          <h2>{title}</h2>
        </div>
        {action && <span>{action}</span>}
      </div>
      {children}
    </section>
  );
}
