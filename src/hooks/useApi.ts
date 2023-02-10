import { useEffect, useRef, useState } from 'react'
import { Nullable } from 'option-t/lib/Nullable'

export default function useApi<T, E = any>(callback: () => Promise<T>) {
  const [data, setData] = useState<Nullable<T>>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Nullable<E>>(null)

  const isDone = useRef(false)

  useEffect(() => {
    ;(async () => {
      if (isDone.current) return

      try {
        setData(await callback())
        isDone.current = true
      } catch (e) {
        setError(e as E)
      }

      setIsLoading(false)
    })()
  })

  return { data, isLoading, error }
}
