import { createFileRoute } from '@tanstack/react-router'

import { FeedWrapper } from '@/components/feed-wrapper'
import { Promo } from '@/components/promo'
import { StickyWrapper } from '@/components/sticky-wrapper'
import { UserProgress } from '@/components/user-progress'
import { Header } from '@/features/learn/components/header'

export const Route = createFileRoute('/(site)/learn/')({
  component: RouteComponent,
})

function RouteComponent() {
  const isPro = false

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{ id: 1, title: 'German', imageSrc: '/de.svg' }}
        />
        {!isPro && <Promo />}
      </StickyWrapper>
      <FeedWrapper>
        <Header title="Title" />
      </FeedWrapper>
    </div>
  )
}
