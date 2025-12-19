import { Button } from '@/components/ui/button'

const languages = [
  { src: '/es.svg', label: 'Spanish' },
  { src: '/de.svg', label: 'German' },
  { src: '/it.svg', label: 'Italian' },
  { src: '/jp.svg', label: 'Japanese' },
]

export function MarketingFooter() {
  return (
    <footer className="hidden h-20 w-full border-slate-200 border-t-2 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        {languages.map(({ src, label }) => (
          <Button key={label} size="lg" variant="ghost">
            <img
              src={src}
              alt={label}
              height={32}
              width={40}
              className="mr-4 rounded-md"
            />
            {label}
          </Button>
        ))}
      </div>
    </footer>
  )
}
