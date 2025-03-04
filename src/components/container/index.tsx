import {ReactNode} from 'react'

export function Container({children}:{children:ReactNode}){
    return(
        <div className='w-full max-w-[1680px] mx-auto px-4  '>
            {children}
        </div>
    )
}