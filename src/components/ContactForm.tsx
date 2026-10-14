import { useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import RollButton from './RollButton'
import {
  CONTACT_EMAIL,
  FORM_ENDPOINT,
  budgetOptions,
  isRetainerId,
  isServiceId,
  retainerOptions,
  serviceOptions,
  type RetainerId,
  type ServiceId,
} from '../data/inquiry'

interface Values {
  name: string
  email: string
  company: string
  website: string
  service: ServiceId | ''
  plan: RetainerId | ''
  budget: string
  timeline: string
  message: string
}
type Errors = Partial<Record<keyof Values, string>>
type Status = 'idle' | 'submitting' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v: Values): Errors {
  const e: Errors = {}
  if (!v.name.trim()) e.name = 'Please enter your full name.'
  if (!v.email.trim()) e.email = 'Please enter your work email.'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address, like name@company.com.'
  if (!v.company.trim()) e.company = 'Please enter your company name.'
  if (!v.service) e.service = 'Please choose what you need.'
  if (v.service === 'retainer' && !v.plan) e.plan = 'Please choose a retainer plan, or pick “Not sure yet” below.'
  if (!v.message.trim()) e.message = 'Please tell us a little about your project.'
  return e
}

const field =
  'w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-gray-900 placeholder:text-gray-400 transition-colors duration-300 focus:border-gray-900 focus:outline-none'

export default function ContactForm() {
  const [params, setParams] = useSearchParams()

  const initialService = params.get('service')
  const initialPlan = params.get('plan')
  const inquiryType = params.get('type') === 'one-time' ? 'one-time' : 'general'

  const [values, setValues] = useState<Values>({
    name: '',
    email: '',
    company: '',
    website: '',
    // One-time project inquiries land on "Something else" unless a service was given
    service: isServiceId(initialService)
      ? initialService
      : inquiryType === 'one-time'
        ? 'other'
        : '',
    plan: isRetainerId(initialPlan) ? initialPlan : '',
    budget: '',
    timeline: '',
    message: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const submitting = useRef(false) // hard guard against double submits
  const honeypot = useRef<HTMLInputElement>(null)

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    setValues((v) => ({ ...v, [k]: val }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
    // keep the URL in sync so the selection survives reloads / sharing
    if (k === 'service' || k === 'plan') {
      const next = new URLSearchParams(params)
      const value = String(val)
      if (value) next.set(k, value)
      else next.delete(k)
      if (k === 'service' && value !== 'retainer') next.delete('plan')
      setParams(next, { replace: true })
    }
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (submitting.current || status === 'success') return

    // Spam trap: real people never see or fill this field. Bots get no response.
    if (honeypot.current?.value) return

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0]
      document.getElementById(`f-${first}`)?.focus()
      return
    }

    submitting.current = true
    setStatus('submitting')
    try {
      const serviceLabel = serviceOptions.find((s) => s.id === values.service)?.label ?? ''
      const planLabel = retainerOptions.find((r) => r.id === values.plan)?.label ?? ''
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New project inquiry — ${values.company.trim()}`,
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          website: values.website.trim(),
          service: serviceLabel,
          retainer_plan: planLabel,
          inquiry_type: inquiryType === 'one-time' ? 'One-time project inquiry' : 'General project inquiry',
          budget: values.budget,
          timeline: values.timeline.trim(),
          message: values.message.trim(),
        }),
      })
      // Success is shown ONLY when the endpoint confirms with a 2xx response.
      if (!res.ok) throw new Error(`Endpoint responded ${res.status}`)
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error') // values stay in state, so nothing the visitor typed is lost
    } finally {
      submitting.current = false
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-10">
        <p className="text-[20px] sm:text-[24px] font-medium leading-snug text-gray-900">
          Thanks for reaching out. Your project inquiry has been received, and we'll be in touch soon.
        </p>
      </div>
    )
  }

  const err = (k: keyof Values) =>
    errors[k] ? (
      <p id={`e-${k}`} className="mt-1.5 text-[13px] text-red-600">
        {errors[k]}
      </p>
    ) : null
  const aria = (k: keyof Values) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `e-${k}` : undefined,
  })
  const border = (k: keyof Values) => (errors[k] ? 'border-red-500' : 'border-gray-300')
  const label = 'mb-1.5 block text-[13px] font-medium text-gray-900'

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {inquiryType === 'one-time' && (
        <p className="rounded-xl bg-gray-100 px-4 py-3 text-[13px] text-gray-700">
          Inquiry type: <strong>One-time project</strong>
        </p>
      )}

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input ref={honeypot} type="text" name="website_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className={label}>Full name</label>
          <input id="f-name" name="name" autoComplete="name" value={values.name}
            onChange={(e) => set('name', e.target.value)} className={`${field} ${border('name')}`}
            required {...aria('name')} />
          {err('name')}
        </div>
        <div>
          <label htmlFor="f-email" className={label}>Work email</label>
          <input id="f-email" name="email" type="email" autoComplete="email" value={values.email}
            onChange={(e) => set('email', e.target.value)} className={`${field} ${border('email')}`}
            required {...aria('email')} />
          {err('email')}
        </div>
        <div>
          <label htmlFor="f-company" className={label}>Company name</label>
          <input id="f-company" name="company" autoComplete="organization" value={values.company}
            onChange={(e) => set('company', e.target.value)} className={`${field} ${border('company')}`}
            required {...aria('company')} />
          {err('company')}
        </div>
        <div>
          <label htmlFor="f-website" className={label}>
            Website or product link <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <input id="f-website" name="website" type="url" inputMode="url" placeholder="https://"
            value={values.website} onChange={(e) => set('website', e.target.value)}
            className={`${field} border-gray-300`} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-service" className={label}>What do you need?</label>
          <select id="f-service" name="service" value={values.service}
            onChange={(e) => set('service', e.target.value as ServiceId | '')}
            className={`${field} ${border('service')}`} required {...aria('service')}>
            <option value="">Select a service…</option>
            {serviceOptions.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
          {err('service')}
        </div>

        {values.service === 'retainer' ? (
          <div>
            <label htmlFor="f-plan" className={label}>Retainer plan</label>
            <select id="f-plan" name="plan" value={values.plan}
              onChange={(e) => set('plan', e.target.value as RetainerId | '')}
              className={`${field} ${border('plan')}`} {...aria('plan')}>
              <option value="">Not sure yet</option>
              {retainerOptions.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
            {err('plan')}
          </div>
        ) : (
          <div>
            <label htmlFor="f-budget" className={label}>
              Estimated budget <span className="font-normal text-gray-500">(optional)</span>
            </label>
            <select id="f-budget" name="budget" value={values.budget}
              onChange={(e) => set('budget', e.target.value)} className={`${field} border-gray-300`}>
              <option value="">Select a range…</option>
              {budgetOptions.map((b) => (<option key={b} value={b}>{b}</option>))}
            </select>
          </div>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {values.service === 'retainer' && (
          <div>
            <label htmlFor="f-budget" className={label}>
              Estimated budget <span className="font-normal text-gray-500">(optional)</span>
            </label>
            <select id="f-budget" name="budget" value={values.budget}
              onChange={(e) => set('budget', e.target.value)} className={`${field} border-gray-300`}>
              <option value="">Select a range…</option>
              {budgetOptions.map((b) => (<option key={b} value={b}>{b}</option>))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="f-timeline" className={label}>
            Preferred timeline <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <input id="f-timeline" name="timeline" value={values.timeline}
            onChange={(e) => set('timeline', e.target.value)}
            placeholder="e.g. Launch in 6 weeks" className={`${field} border-gray-300`} />
        </div>
      </div>

      <div>
        <label htmlFor="f-message" className={label}>Tell us about your project</label>
        <textarea id="f-message" name="message" rows={6} value={values.message}
          onChange={(e) => set('message', e.target.value)}
          className={`${field} ${border('message')}`} required {...aria('message')} />
        {err('message')}
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
          We couldn't send your inquiry. Please try again
          {CONTACT_EMAIL ? (
            <>
              {' '}or email us directly at{' '}
              <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </>
          ) : null}
          .
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <RollButton type="submit" variant="orange" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send Project Inquiry'}
        </RollButton>
        {status === 'submitting' && (
          <Loader2 size={18} className="animate-spin text-gray-500" aria-label="Sending" />
        )}
        <p className="text-[13px] text-gray-500">
          We'll use your information to respond to your project inquiry.
        </p>
      </div>
    </form>
  )
}
