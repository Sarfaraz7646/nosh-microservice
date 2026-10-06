export default function TableRow({ children, columns }) {
  return (
    <div
      className="table-row"
      style={columns ? { gridTemplateColumns: columns } : undefined}
    >
      {children}
    </div>
  );
}
