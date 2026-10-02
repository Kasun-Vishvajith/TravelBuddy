"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, Check, Compass, Eye, EyeOff, MapPinned, Store, UserRound } from 'lucide-react';
import { Brand } from './AppShell';
import { Photo } from './Photo';
import { experiences } from '@/lib/catalog';
import { predefined, registerAccount, roleHome, roleNames, signIn, type Role } from '@/lib/demo';
export function DemoLogin() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);
    const [success, setSuccess] = useState(false);
    async function submit(e: FormEvent) { e.preventDefault(); setError(''); setBusy(true); try {
        const account = signIn(email, password);
        setSuccess(true);
        await new Promise(resolve => setTimeout(resolve, 250));
        router.push(account.role === 'traveler' ? '/' : roleHome[account.role]);
    }
    catch (err) {
        setError(err instanceof Error ? err.message : 'Allow browser storage and try again.');
        setBusy(false);
    } }
    return <div className="demo-auth"><div className="demo-auth-image"><Photo src={experiences[1].image} alt="Sigiriya in Sri Lanka" priority/><div><Brand /><h2>Your journey<br />begins here.</h2><p>Discover unforgettable experiences, connect with local experts, and plan your next adventure.</p></div></div><div className="demo-auth-main"><div className="demo-auth-form"><Brand /><h1>Welcome back</h1><p>Sign in to continue your journey.</p><form onSubmit={submit}><div className="field"><label htmlFor="login-email">Email address</label><input id="login-email" disabled={!mounted} type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@travelbuddy.demo"/></div><div className="field"><label htmlFor="login-password">Demo password</label><div className="password-field"><input id="login-password" disabled={!mounted} type={visible ? 'text' : 'password'} autoComplete="off" required value={password} onChange={e => setPassword(e.target.value)}/><button type="button" aria-label={visible ? 'Hide password' : 'Show password'} onClick={() => setVisible(!visible)}>{visible ? <EyeOff size={19}/> : <Eye size={19}/>}</button></div></div>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary button-wide" disabled={busy || !mounted}>{success ? <Check size={17}/> : <ArrowRight size={17}/>} {success ? 'Signed in' : busy ? 'Signing in…' : 'Sign in'}</button></form><details className="demo-account-picker"><summary>Explore demo accounts</summary><p>All four profiles use <strong>demo123</strong>.</p>{predefined.map(a => <div key={a.id}><span><strong>{roleNames[a.role]}</strong><small>{a.role === 'traveler' ? 'Discover and plan your next adventure.' : a.role === 'provider' ? 'Manage experiences and bookings.' : a.role === 'guide' ? 'Organize requests and local sessions.' : 'Oversee the sample marketplace.'}</small></span><button className="text-link" onClick={() => { setEmail(a.email); setPassword('demo123'); setError(''); }}>Use demo account</button></div>)}</details><p className="auth-links">New to TravelBuddy? <Link href="/register">Create account</Link></p><p className="demo-disclosure">Frontend demo only. Shared password; no secure authentication or server account. Use fictional details.</p></div></div></div>;
}
const roles: {
    role: Role;
    title: string;
    description: string;
    action: string;
    icon: typeof Compass;
}[] = [{ role: 'traveler', title: 'Explore the world', description: 'Discover destinations and organize journeys.', action: 'Join as traveler', icon: Compass }, { role: 'provider', title: 'Offer experiences', description: 'List tours, activities, and travel services.', action: 'Become a provider', icon: Store }, { role: 'guide', title: 'Share your local knowledge', description: 'Help travelers discover your city.', action: 'Become a local guide', icon: MapPinned }];
export function RegistrationChoice() { return <div className="registration-choice content-width"><Brand /><h1>How will you use TravelBuddy?</h1><p>Choose a space for your next chapter.</p><div className="registration-options">{roles.map(({ role, title, description, action, icon: Icon }) => <Link key={role} href={`/register/${role}`}><Icon size={30}/><span>{roleNames[role]}</span><h2>{title}</h2><p>{description}</p><strong>{action} <ArrowRight size={17}/></strong></Link>)}</div><p>Already have a demo account? <Link className="text-link" href="/login">Sign in</Link></p><p className="demo-disclosure">Only local demo profiles are created. Administrator access uses the predefined demo account.</p></div>; }
const categories = ['Tours', 'Outdoor adventures', 'Transportation', 'Cultural experiences', 'Food experiences', 'Wildlife experiences', 'Other'];
export function DemoRegistration({ role }: {
    role: 'traveler' | 'provider' | 'guide';
}) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [fields, setFields] = useState<Record<string, string>>({});
    const [terms, setTerms] = useState(false);
    const [error, setError] = useState('');
    const [completed, setCompleted] = useState(false);
    const [busy, setBusy] = useState(false);
    const [preview, setPreview] = useState('');
    useEffect(() => () => { if (preview)
        URL.revokeObjectURL(preview); }, [preview]);
    const update = (key: string, value: string) => setFields(f => ({ ...f, [key]: value }));
    function field(key: string, label: string, required = true, type = 'text') { return <div className="field" key={key}><label htmlFor={`reg-${key}`}>{label}{!required ? ' (optional)' : ''}</label>{type === 'textarea' ? <textarea id={`reg-${key}`} required={required} maxLength={700} value={fields[key] || ''} onChange={e => update(key, e.target.value)}/> : <input id={`reg-${key}`} type={type} required={required} maxLength={150} value={fields[key] || ''} onChange={e => update(key, e.target.value)}/>}</div>; }
    function submit(e: FormEvent) { e.preventDefault(); setError(''); if (role !== 'traveler' && step === 1) {
        setStep(2);
        return;
    } if (!terms) {
        setError('Accept the demonstration terms to continue.');
        return;
    } setBusy(true); try {
        registerAccount(role, fields.name, fields.email, fields);
        setCompleted(true);
    }
    catch (err) {
        setError(err instanceof Error ? err.message : 'Your local profile could not be saved.');
    }
    finally {
        setBusy(false);
    } }
    function enter() { try {
        const a = signIn(fields.email, 'demo123');
        router.push(a.role === 'traveler' ? '/' : roleHome[a.role]);
    }
    catch {
        setError('Allow browser storage and try again.');
    } }
    return <div className="registration-form-page"><div className="registration-form-inner"><Link className="back-link" href="/register">← Account types</Link><Brand />{completed ? <div className="registration-welcome"><Check size={36}/><h1>{role === 'provider' ? 'Welcome to TravelBuddy Partners' : role === 'guide' ? 'Your local guide journey starts here.' : `Welcome, ${fields.name.split(' ')[0]}.`}</h1><p>Your demo {roleNames[role].toLowerCase()} profile has been created locally. No real verification has occurred.</p><p>Sign in next time with <strong>{fields.email}</strong> and the shared demo password <strong>demo123</strong>.</p><button className="button button-primary" onClick={enter}>{role === 'provider' ? 'Open provider workspace' : role === 'guide' ? 'Open guide dashboard' : 'Continue to TravelBuddy'}</button>{error && <p role="alert">{error}</p>}</div> : <><h1>{role === 'traveler' ? 'Make room for discovery.' : role === 'provider' ? 'Bring your experiences to life.' : 'A local perspective starts with you.'}</h1><p>{roleNames[role]} registration{role !== 'traveler' ? ` · Step ${step} of 2` : ''}</p><div className="notice">Use fictional details. Stored only in this browser; all accounts use demo123. Do not enter sensitive information.</div><form onSubmit={submit}>{step === 1 ? <>{field('name', role === 'provider' ? 'Business or provider name' : 'Full name')}{role === 'provider' && field('contact', "Contact person's name")}{field('email', role === 'provider' ? 'Business email' : 'Email address', true, 'email')}{field('country', 'Country', role !== 'traveler')}{role === 'traveler' ? field('interests', 'Preferred travel interests', false) : field('location', role === 'guide' ? 'City or operating zone' : 'Main service location')}{role === 'guide' && field('languages', 'Languages spoken')}</> : role === 'provider' ? <><div className="field"><label htmlFor="reg-category">Experience category</label><select id="reg-category" required value={fields.category || ''} onChange={e => update('category', e.target.value)}><option value="">Choose a category</option>{categories.map(c => <option key={c}>{c}</option>)}</select></div>{field('description', 'Short business description', true, 'textarea')}{field('phone', 'Demo contact phone', false, 'tel')}{field('destination', 'Main operating destination')}</> : <>{field('specialties', 'Guiding specialties')}{field('biography', 'Short biography', true, 'textarea')}{field('duration', 'Session duration preferences')}{field('meeting', 'Preferred meeting areas')}<div className="field"><label htmlFor="reg-photo">Profile photograph (optional local preview)</label><input id="reg-photo" type="file" accept="image/*" onChange={e => { const file = e.target.files?.[0]; if (file)
        setPreview(URL.createObjectURL(file)); }}/>{preview && <img className="registration-preview" src={preview} alt="Your local preview"/>}<small>The preview is not uploaded or persisted.</small></div></>}{(role === 'traveler' || step === 2) && <label className="demo-terms"><input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)} required/><span>I understand these demonstration terms: this is a local simulation, with a shared password and no real service or verification.</span></label>}{error && <p className="form-error" role="alert">{error}</p>}<div className="form-navigation">{step === 2 && <button type="button" className="button button-secondary" onClick={() => setStep(1)}>Back</button>}<button disabled={busy} className="button button-primary">{busy ? 'Saving…' : role !== 'traveler' && step === 1 ? 'Continue' : 'Create demo account'}<ArrowRight size={17}/></button></div></form></>}</div></div>;
}
