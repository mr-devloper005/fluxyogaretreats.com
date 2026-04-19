'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

type LoginFormProps = {
  submitClassName: string
  inputClassName: string
}

export function LoginForm({ submitClassName, inputClassName }: LoginFormProps) {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast({
        title: 'Missing fields',
        description: 'Enter your email and password to continue.',
      })
      return
    }
    await login(email.trim(), password)
    toast({
      title: 'Signed in',
      description: 'Your session is saved on this device.',
    })
    router.push('/articles')
    router.refresh()
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
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
        autoComplete="current-password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button type="submit" disabled={isLoading} className={cn('inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition disabled:opacity-60', submitClassName)}>
        {isLoading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
