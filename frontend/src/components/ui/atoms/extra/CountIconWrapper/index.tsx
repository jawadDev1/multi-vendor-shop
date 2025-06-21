import type { BaseProps } from '@/types/common'
import cn from '@/utils/cn'


interface CountIconWrapperProps extends BaseProps {
    count: number
}

const CountIconWrapper = ({children, className, count, ...props}: CountIconWrapperProps) => {
  return (
    <div className={cn("relative cursor-pointer", className)} {...props} >
        {children}
        <span className=' p-0 m-0 size-3 lg:size-4 text-center text-[10px]  md:text-[12px] text-white bg-green-400 rounded-full absolute -right-1 -top-1'>
            {count}
        </span>
    </div>
  )
}

export default CountIconWrapper