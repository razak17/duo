import { Link } from '@tanstack/react-router'

type LogoProps = {
  href?: string
}

export function Logo({ href }: LogoProps) {
  const content = (
    <div className="flex items-center gap-x-3">
      <img src="/mascot.svg" height={40} width={40} alt="Mascot" />
      <h1 className="font-extrabold text-2xl text-green-600 tracking-wide">
        Lingozeit
      </h1>
    </div>
  )

  if (!href) return content

  return <Link to={href}>{content}</Link>
}
