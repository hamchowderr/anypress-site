import { Tick } from "@/components/Tick";

/** A three-column comparison: the need, the other way, and AnyPress (ticked). */
export function CompareTable({ head, rows }: { head: [string, string, string]; rows: [string, string, string][] }) {
  return (
    <div className="compare">
      <div className="tablewrap">
        <table>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([need, other, ours]) => (
              <tr key={need}>
                <th scope="row">{need}</th>
                <td className="no">{other}</td>
                <td>
                  <span className="yes">
                    <Tick />
                    {ours}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
