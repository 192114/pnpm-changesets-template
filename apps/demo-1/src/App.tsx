import { useOutlet } from 'react-router-dom'

function App(): JSX.Element {
  const outlet = useOutlet()

  return <div>{outlet}</div>
}

export default App
