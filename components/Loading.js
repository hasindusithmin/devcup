
import Image from 'next/image';

export default function Loading() {
    return (
        <div className='w3-center w3-padding-64'>
            <Image src="/loading.gif" alt='Loading...' width={50} height={50} />
        </div>
    )
}