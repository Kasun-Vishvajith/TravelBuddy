import Link from "next/link";
import { LockKeyhole } from "lucide-react";

export default function StandardLoginPage() {
  return (
    <div className="account-page">
      <div className="checkout-card" style={{ maxWidth: 430, margin: "25px auto", padding: 30 }}>
        <div className="brand" style={{ justifyContent: "center", marginBottom: 25 }}><span className="brand-mark">✦</span><span>travel<span>buddy</span></span></div>
        <div className="eyebrow" style={{ textAlign: "center" }}>Welcome back</div>
        <h1 style={{ fontSize: 34, textAlign: "center", margin: "7px 0 20px" }}>Log in to your trips.</h1>
        <div className="portal-form"><div className="field"><label>Email address</label><input defaultValue="maya.chen@example.com" type="email" /></div><div className="field"><label>Password</label><input defaultValue="travelbuddy" type="password" /></div><button className="button button-primary button-wide"><LockKeyhole size={15} /> Log in</button></div>
        <p style={{ textAlign: "center", fontSize: 11, margin: "17px 0" }}><Link className="section-link" href="#">Forgot password?</Link></p>
        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 17, textAlign: "center", fontSize: 12 }}><span className="muted">New to Travel Buddy?</span> <Link className="section-link" href="/register">Create an account</Link></div>
        <p className="standard-login-demo-link"><Link href="/login">← Back to demo access</Link></p>
      </div>
    </div>
  );
}
