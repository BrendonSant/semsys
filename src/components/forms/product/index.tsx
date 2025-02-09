'use client'

import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Input } from '../input'
import {api} from '@/lib/api'
import {useRouter} from 'next/navigation'

const schema = z.object({
    name: z.string().min(1,"O campo nome é obrigatorio!"),
    price: z.string().min(1,"O campo preço é obrigatorio!"),
    description: z.string(),
    

})

type FormData = z.infer<typeof schema>

export function ProductForm ({userId,onClose}: {userId: string; onClose: () => void}){

    const{register, handleSubmit, formState: {errors}}= useForm<FormData>({
            resolver: zodResolver(schema)
        })
    
        const router = useRouter()
    
        async function handleRegisterSupplier(data: FormData){
           await api.post('/api/product', {
            name: data.name,
            price: data.price,
            description: data.description,
            userId: userId
           })
    
           router.refresh();
           router.replace('/products')
           onClose();
        }
    
        return(
            <form className='flex flex-col w-full' onSubmit={handleSubmit(handleRegisterSupplier)}>
                <label className='mt-3'>Nome do produto:</label>
                <Input type='text'
                 name='name' 
                 placeholder='Digite o nome do produto.'
                 error={errors.name?.message}
                 register={register}
                 />
                  <label className='mt-3'>Valor</label>
                <Input type='money'
                 name='price' 
                 placeholder='Digite o valor do produto.'
                 error={errors.price?.message}
                 register={register}
                 />
                   <label className='mt-3'>Descrição</label>
                <Input type='text'
                 name='description' 
                 placeholder='Digite a descrição do produto.'
                 error={errors.description?.message}
                 register={register}
                 />
                 
    
                 <button className='bg-mdblue-500 my-4 px-2 h-11 rounded-sm text-white font-montserrat font-bold hover:bg-mblue-500 transition-all duration-500'
                 type='submit'>
                    Salvar
                 </button>
            </form>
        )
    }