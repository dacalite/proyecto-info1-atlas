
import CustomContextProvider from '@/context/CustomContextProvider'
import './globals.css'

export const metadata = {
  title: 'Proyecto INFO1',
  description: 'Hecho por Sergio Dacal Rodríguez',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CustomContextProvider>{children}</CustomContextProvider>
      </body>
    </html>
  )
}
