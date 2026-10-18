import type { NextPage } from 'next'
import ErrorPage from '../components/errorPage'

const Custom404: NextPage = () => {
    return <ErrorPage errorMsg="We couldn't find the page you were looking for." />
}

export default Custom404
