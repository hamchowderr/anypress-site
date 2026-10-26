import { Tick } from "@/components/Tick";
import { ELSEWHERE, PRICES_CHECKED, type OtherPlan } from "@/lib/prices";
import { SITE_TYPES } from "@/lib/site";

function Other({ p }: { p: OtherPlan }) {
  return (
    <li>
      <a href={p.url} target="_blank" rel="noopener nofollow">
        {p.who} {p.plan}
      </a>{" "}
      <span className="no">
        ${p.price}
        {p.yearly ? "/mo, paid yearly" : "/mo"}
      </span>
      {p.note && <small>{p.note}</small>}
    </li>
  );
}

/** Each kind of AnyPress site next to the nearest plans on other platforms, smallest sizes, per month. */
export function PriceCompare() {
  return (
    <>
      <div className="compare">
        <div className="tablewrap" tabIndex={0} role="region" aria-label="AnyPress prices next to other platforms">
          <table className="price-compare">
            <thead>
              <tr>
                <th scope="col">You&apos;re building</th>
                <th scope="col">Elsewhere</th>
                <th scope="col">AnyPress</th>
              </tr>
            </thead>
            <tbody>
              {SITE_TYPES.map((t) => (
                <tr key={t.id}>
                  <th scope="row">{t.name}</th>
                  <td>
                    <ul className="elsewhere">
                      {ELSEWHERE[t.id].map((p) => (
                        <Other key={p.who + p.plan} p={p} />
                      ))}
                    </ul>
                  </td>
                  <td>
                    <span className="yes">
                      <Tick />${t.from}/mo
                    </span>
                    <small>No cut of your sales</small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="compare-note">
        Starting prices per site, billed monthly unless marked, from each company&apos;s own pricing page on {PRICES_CHECKED}. Prices
        change, so follow the links for today&apos;s. Each platform has features the others don&apos;t, and the card company&apos;s fee
        applies everywhere. With AnyPress, paying yearly gets you two months free.
      </p>
    </>
  );
}
