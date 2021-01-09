// css module
import style from './style.module.scss'

// css file
import '@/style.less'

// style component
import styled from '@emotion/styled'
const Button = styled.button`
  color: red;
`

// jsx
export default (): JSX.Element => (
  <Button className={style.module}>content</Button>
)
