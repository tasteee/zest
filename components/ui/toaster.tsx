'use client'

import { useToast } from '@/hooks/use-toast'
import { Toast } from '@/components/ui/toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <Toast.Provider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <Toast.Title>{title}</Toast.Title>}
              {description && (
                <Toast.Description>{description}</Toast.Description>
              )}
            </div>
            {action}
            <Toast.Close />
          </Toast>
        )
      })}
      <Toast.Viewport />
    </Toast.Provider>
  )
}
