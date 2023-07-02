import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  QueryObserver,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query'
import { Provider } from 'jotai'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { State } from './components/State'
import { commentKeys } from './constants/key'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { AtomWithQuery } from './components/AtomWithQuery'
const queryClient = new QueryClient()
// const observer = new QueryObserver(queryClient, { queryKey: commentKeys.lists() })
// const unsubscribe = observer.subscribe(result => {
//   // console.log(result)
// })
function App() {
  const { reset } = useQueryErrorResetBoundary()
  return (
    // Provide the client to your App
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          There was an error!
          <button onClick={() => resetErrorBoundary()}>Try again</button>
        </div>
      )}
    >
      <QueryClientProvider client={queryClient}>
        <Provider >
          <Suspense fallback={'loading...'}>
            {/* <State /> */}
            <AtomWithQuery />
          </Suspense>
          <ReactQueryDevtools initialIsOpen={false} />
        </Provider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
