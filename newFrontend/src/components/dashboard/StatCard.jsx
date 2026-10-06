export default function StatCard({ icon: Icon, label, value, change }) {
  return (
    <article className="stat">
      {Icon && (
        <div className="stat-icon">
          <Icon size={19} />
        </div>
      )}
      <small>{label}</small>
      <h2>{value}</h2>
      {change && <span className="positive">{change}</span>}
    </article>
  );
}
