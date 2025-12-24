import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/tanstack-react-start'
import { Link } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function MarketingHeader() {
  return (
    <header className="h-20 w-full border-slate-200 border-b-2 px-4">
      <div className="mx-auto flex h-full items-center justify-between lg:max-w-screen-lg">
        <Link to="/" className="flex items-center gap-x-3 pt-8 pb-7 pl-4">
          <img src="/mascot.svg" height={40} width={40} alt="Mascot" />
          <h1 className="font-extrabold text-2xl text-green-600 tracking-wide">
            Lingozeit
          </h1>
        </Link>
        <ClerkLoading>
          <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="lg" variant="ghost">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  )
}
