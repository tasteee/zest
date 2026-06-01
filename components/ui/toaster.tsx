'use client'

import { useToast } from '@/hooks/use-toast'
import { Toast } from '@/components/ui/toast'

const Toaster = () => {
	const toastState = useToast()

	return (
		<Toast.Provider>
			{toastState.toasts.map((toastItem) => {
				const hasTitle = Boolean(toastItem.title)
				const hasDescription = Boolean(toastItem.description)

				return (
					<Toast key={toastItem.id} {...toastItem}>
						<div className='zToastContent'>
							{hasTitle && <Toast.Title>{toastItem.title}</Toast.Title>}
							{hasDescription && <Toast.Description>{toastItem.description}</Toast.Description>}
						</div>
						{toastItem.action}
						<Toast.Close />
					</Toast>
				)
			})}
			<Toast.Viewport />
		</Toast.Provider>
	)
}

export { Toaster }
