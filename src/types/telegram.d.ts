declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string
        initDataUnsafe?: {
          query_id?: string
          user?: {
            id: number
            first_name: string
            last_name?: string
            username?: string
            language_code?: string
            is_premium?: boolean
          }
          auth_date: string
          hash: string
          start_param?: string
          chat_instance?: string
          chat_type?: string
          chat?: {
            id: number
            type: string
            title?: string
            username?: string
          }
          can_send_after?: number
          receiver?: {
            id: number
            is_bot: boolean
          }
          start_param?: string
        }
        version: string
        headerColor: string
        backgroundColor: string
        BackButton: {
          isVisible: boolean
          onClick: (callback: () => void) => void
          offClick: (callback: () => void) => void
          show: () => void
          hide: () => void
        }
        MainButton: {
          text: string
          color: string
          textColor: string
          isVisible: boolean
          isActive: boolean
          isProgressVisible: boolean
          setText: (text: string) => void
          onClick: (callback: () => void) => void
          offClick: (callback: () => void) => void
          show: () => void
          hide: () => void
          enable: () => void
          disable: () => void
          showProgress: (leaveActive: boolean) => void
          hideProgress: () => void
        }
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void
          selectionChanged: () => void
        }
        isVersionAtLeast: (version: string) => boolean
        setHeaderColor: (color: string) => void
        setBackgroundColor: (color: string) => void
        openLink: (url: string) => void
        openTelegramLink: (url: string) => void
        openInvoice: (url: string) => void
        showPopup: (
          params: {
            title?: string
            message: string
            buttons?: Array<{
              type: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'
              text: string
              id?: string
            }>
          },
          callback?: (buttonId: string) => void,
        ) => void
        showAlert: (message: string, callback?: () => void) => void
        showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void
        ready: () => void
        expand: () => void
        close: () => void
      }
    }
  }
}

export {}
