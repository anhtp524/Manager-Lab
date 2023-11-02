import { useSearchParams } from 'react-router-dom'

const useGetQueryParams = ({ param }: { param: string }) => {
  const [params] = useSearchParams()
  return params.get(param)
}

export default useGetQueryParams
