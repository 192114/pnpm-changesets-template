import { useNavigate } from 'react-router-dom'

export default function Login(): JSX.Element {
  const navigate = useNavigate()
  return (
    <div>
      <button type="button" onClick={() => navigate('/about')}>
        登录
      </button>
    </div>
  )
}
