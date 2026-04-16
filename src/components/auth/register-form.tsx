'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

type RegisterFormProps = {
  submitClassName: string
  inputClassName: string
}

export function RegisterForm({ submitClassName, inputClassName }: RegisterFormProps) {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [intent, setIntent] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password) {
      toast({
        title: 'Missing fields',
        description: 'Add your name, email, and password to create an account.',
      })
      return
    }
    await signup(name.trim(), email.trim(), password)
    toast({
      title: 'Account ready',
      description: intent ? 'Preferences noted. You are signed in on this device.' : 'You are signed in on this device.',
    })
    router.push('/articles')
    router.refresh()
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <input
        className={cn('h-12 rounded-xl border px-4 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#a855f7]/40', inputClassName)}
        placeholder="Full name"
        autoComplete="name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <input
        className={cn('h-12 rounded-xl border px-4 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#a855f7]/40', inputClassName)}
        placeholder="Email address"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <input
        className={cn('h-12 rounded-xl border px-4 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#a855f7]/40', inputClassName)}
        placeholder="Password"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <input
        className={cn('h-12 rounded-xl border px-4 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#a855f7]/40', inputClassName)}
        placeholder="What would you like to read or publish?"
        value={intent}
        onChange={(ev) => setIntent(ev.target.value)}
      />
      <button type="submit" disabled={isLoading} className={cn('inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition disabled:opacity-60', submitClassName)}>
        {isLoading ? 'Creating…' : 'Create account'}
      </button>
    </form>
  )
}
