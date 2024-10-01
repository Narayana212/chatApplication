import { cn } from "@/lib/utils"

```
/**
 * A React component that renders a skeleton loading placeholder.
 * @param {Object} props - The props object.
 * @param {string} [props.className] - Additional CSS classes to apply to the skeleton div.
 * @param {...React.HTMLAttributes<HTMLDivElement>} props - Any other HTML div attributes.
 * @returns {JSX.Element} A div element with animated pulse effect and rounded corners.
 */
```
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
