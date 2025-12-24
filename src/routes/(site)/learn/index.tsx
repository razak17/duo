import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

import { FeedWrapper } from '@/components/feed-wrapper'
import { Promo } from '@/components/promo'
import { StickyWrapper } from '@/components/sticky-wrapper'
import { UserProgress } from '@/components/user-progress'
import { getUserProgressQueryOptions } from '@/features/courses/server/queries'
import { Header } from '@/features/learn/components/header'
import { getUserSubscriptionQueryOptions } from '@/features/learn/server/queries'

export const Route = createFileRoute('/(site)/learn/')({
  component: RouteComponent,
  pendingComponent: PendingComponent,
  beforeLoad: async ({ context: { queryClient, userId } }) => {
    const userProgress = await queryClient.fetchQuery(
      getUserProgressQueryOptions(userId),
    )
    if (!userProgress || !userProgress.activeCourse) {
      throw redirect({ to: '/courses' })
    }
  },
  loader: async ({ context: { queryClient, userId } }) => {
    const [userSubscription, userProgress] = await Promise.all([
      queryClient.ensureQueryData(getUserSubscriptionQueryOptions(userId)),
      queryClient.ensureQueryData(getUserProgressQueryOptions(userId)),
    ])
    return {
      userSubscription,
      userProgress,
    }
  },
})

function RouteComponent() {
  const { userId } = Route.useRouteContext()
  const { data: userSubscription } = useSuspenseQuery(
    getUserSubscriptionQueryOptions(userId),
  )
  const { data: userProgress } = useSuspenseQuery(
    getUserProgressQueryOptions(userId),
  )

  const isPro = !!userSubscription?.isActive

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        {userProgress?.activeCourse && (
          <UserProgress
            // activeCourse={{ id: 1, title: 'German', imageSrc: '/de.svg' }}
            activeCourse={userProgress?.activeCourse}
          />
        )}
        {!isPro && <Promo />}
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress?.activeCourse?.title} />
      </FeedWrapper>
    </div>
  )
}

function PendingComponent() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  )
}
