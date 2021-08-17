import { Fragment } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Link from 'next/link';
import Error from 'next/error'

type Props = {
    statusCode: any;
};

const Page = ({ statusCode }: Props) => {
    return (
        <Fragment>
            <div style={{ background: 'white' }}>
                <Link href='/'>
                    <a><ArrowBackIcon /></a>
                </Link>
            </div>
            <Error statusCode={statusCode} />
        </Fragment>
    )
}

export default Page