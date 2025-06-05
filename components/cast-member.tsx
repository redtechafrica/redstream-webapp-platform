import Image from "next/image"
import Link from "next/link"

interface CastMemberProps {
  id: string
  name: string
  role?: string
  image: string
}

export function CastMember({ id, name, role, image }: CastMemberProps) {
  return (
    <Link href={`/cast/${id}`} className="flex flex-col items-center group">
      <div className="relative w-full aspect-square rounded-md overflow-hidden mb-2 group-hover:ring-2 group-hover:ring-brand transition-all">
        <Image src={image || "/placeholder.svg?height=300&width=300"} alt={name} fill className="object-cover" />
      </div>
      <h3 className="text-sm font-medium text-center line-clamp-1 group-hover:text-brand transition-colors">{name}</h3>
      {role && <p className="text-xs text-muted-foreground text-center line-clamp-1">{role}</p>}
    </Link>
  )
}
