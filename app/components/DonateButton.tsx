const TIP_URL = "https://streamlabs.com/andersaucy/tip";

export function DonateButton() {
  return (
    <a
      className="donate-fab"
      href={TIP_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Even the smallest amount keeps the dream alive. · 連最小的抖內能為我夢想加火。"
      aria-label="Support Pokélingua — leave a tip"
    >
      <span className="donate-fab-mark" aria-hidden="true">♥</span>
      <span className="donate-fab-label">Support</span>
      <span className="donate-fab-sub" aria-hidden="true">Tip ↗</span>
    </a>
  );
}
