"use client";

import { useEffect, useRef } from "react";
import { Drawing, type DrawingName } from "@/components/Drawing";

// Made-up businesses, one per tile, to show many separate sites coming out of one storefront.
const TILES: [DrawingName, string, string][] = [
  ["website", "junipersbakery.com", "Website"],
  ["bookings", "fadeandfold.com", "Bookings"],
  ["store", "ridgeroast.shop", "Store"],
  ["courses", "learnpottery.co", "Courses"],
  ["everything", "eastsidegym.com", "Everything"],
  ["website", "harbourdental.com", "Website"],
  ["store", "kitandcaboodle.store", "Store"],
  ["bookings", "bloomyoga.studio", "Bookings"],
];

const CARE: [DrawingName, string][] = [
  ["backup", "A copy saved every night"],
  ["tools", "Security fixes applied for you"],
  ["lock", "Kept safe, walled off from the others"],
  ["email", "Email from each site's own address"],
  ["domain", "Domains and the padlock"],
];

/**
 * The system behind AnyPress in one picture: one storefront takes the orders, AnyPress builds each one as its own site
 * from a starting template, and then looks after all of them. Tiles appear one by one once the diagram scrolls into view.
 */
export function SystemDiagram({
  storefront = "Your storefront",
  storefrontSub = "On your own domain, at your prices, paid into your own account.",
  template = "Your starting site",
}: {
  storefront?: string;
  storefrontSub?: string;
  template?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("on");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("on");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={ref} className="sys" aria-label="One storefront, many websites">
      <div className="sys-flow">
        <div className="sys-node">
          <span className="sys-step">1</span>
          <Drawing name="sell" />
          <h3>{storefront}</h3>
          <p>{storefrontSub}</p>
          <ul className="sys-orders" aria-label="Orders coming in">
            <li>A bakery buys a Website</li>
            <li>A salon buys Bookings</li>
            <li>A roaster buys a Store</li>
          </ul>
        </div>

        <div className="sys-arrow" aria-hidden>
          <span className="line" />
          <em>each order</em>
        </div>

        <div className="sys-node engine">
          <span className="sys-step">2</span>
          <Drawing name="tools" />
          <h3>AnyPress builds it</h3>
          <p>
            A fresh copy of <b>{template.toLowerCase()}</b>, with the right tools switched on, the owner&apos;s details filled in and
            email ready to send.
          </p>
          <span className="sys-note">ready in minutes, no one lifts a finger</span>
        </div>

        <div className="sys-arrow" aria-hidden>
          <span className="line" />
          <em>a new site</em>
        </div>

        <div className="sys-sites">
          <span className="sys-step">3</span>
          <h3>Many separate sites</h3>
          <p>Each one is its own WordPress with its own database, so a busy site never slows the others down.</p>
          <ul>
            {TILES.map(([d, domain, kind], i) => (
              <li key={domain} style={{ animationDelay: `${0.5 + i * 0.22}s` }}>
                <Drawing name={d} still />
                <b>{domain}</b>
                <small>{kind}</small>
              </li>
            ))}
            <li className="more" style={{ animationDelay: `${0.5 + TILES.length * 0.22}s` }}>
              + as many as you sell
            </li>
          </ul>
        </div>
      </div>

      <div className="sys-care">
        <span className="sys-step">4</span>
        <h3>Then we look after every one of them, every day.</h3>
        <ul>
          {CARE.map(([d, label]) => (
            <li key={label}>
              <Drawing name={d} still />
              {label}
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="sr-only">
        Orders from one storefront go to AnyPress, which builds each one as its own website from a starting site, then keeps
        every site backed up, patched and safe.
      </figcaption>
    </figure>
  );
}
