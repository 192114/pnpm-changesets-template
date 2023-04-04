import { useNavigate } from 'react-router-dom'

import { Button } from '@infras/ui'

export default function Login(): JSX.Element {
  const navigate = useNavigate()

  function onNavigate() {
    window.alert(navigate)
    try {
      navigate('/about')
    } catch (error) {
      window.alert(error)
    }
  }

  return (
    <div>
      <a href="tel:15542698626">tel</a>
      <Button />
      <button type="button" onClick={onNavigate}>
        登录1
      </button>
    </div>
  )
}
